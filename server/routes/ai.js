const express = require('express')
const Anthropic = require('@anthropic-ai/sdk')
const authMiddleware = require('../middleware/authMiddleware')
const rateLimiter = require('../middleware/rateLimiter')
const { validToolNames, getToolPrompt } = require('../utils/toolPrompts')
const { generateMockResponse } = require('../utils/mockAi')
const { recordToolHistory } = require('../utils/userRepo')

const router = express.Router()

const wait = (duration) => new Promise((resolve) => setTimeout(resolve, duration))

const sendEvent = (res, payload) => {
  res.write(`data: ${JSON.stringify(payload)}\n\n`)
}

const streamText = async (res, text) => {
  const chunks = text.match(/[\s\S]{1,120}/g) || [text]

  for (const chunk of chunks) {
    sendEvent(res, { type: 'chunk', chunk })
    await wait(24)
  }
}

const createAnthropicClient = () => {
  if (!process.env.ANTHROPIC_API_KEY) {
    return null
  }

  return new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  })
}

router.post('/:toolName', authMiddleware, rateLimiter, async (req, res) => {
  const { toolName } = req.params

  if (!validToolNames.includes(toolName)) {
    return res.status(404).json({ message: 'Unknown tool requested.' })
  }

  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.flushHeaders?.()

  try {
    const promptConfig = getToolPrompt(toolName)
    const anthropic = createAnthropicClient()
    let output = ''

    sendEvent(res, { type: 'start', toolName })

    if (anthropic) {
      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2048,
        system: promptConfig.system,
        messages: [
          {
            role: 'user',
            content: promptConfig.buildUserPrompt(req.body),
          },
        ],
      })

      output = response.content
        .filter((block) => block.type === 'text')
        .map((block) => block.text)
        .join('\n\n')
    } else {
      output = generateMockResponse(toolName, req.body)
    }

    await streamText(res, output)
    await recordToolHistory(req.userId, {
      tool: toolName,
      input: req.body,
      output,
    })

    sendEvent(res, {
      type: 'complete',
      metadata: {
        toolName,
        generatedAt: new Date().toISOString(),
      },
    })
    res.end()
  } catch (error) {
    sendEvent(res, {
      type: 'error',
      message: error.message || 'Unable to run AI tool.',
    })
    res.end()
  }
})

module.exports = router
