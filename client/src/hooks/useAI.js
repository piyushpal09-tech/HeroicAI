import { useRef, useState } from 'react'
import { useAuth } from '@/hooks/useAuth.js'

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const parseSseChunk = (chunk) => {
  const events = []
  const segments = chunk.split('\n\n')

  for (const segment of segments) {
    const dataLine = segment
      .split('\n')
      .find((line) => line.startsWith('data:'))

    if (!dataLine) {
      continue
    }

    try {
      events.push(JSON.parse(dataLine.replace(/^data:\s*/, '')))
    } catch (error) {
      error?.message
    }
  }

  return events
}

export const useAI = () => {
  const { token, refreshUser } = useAuth()
  const [output, setOutput] = useState('')
  const [metadata, setMetadata] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const controllerRef = useRef(null)

  const reset = () => {
    setOutput('')
    setMetadata(null)
    setError('')
    setIsLoading(false)
  }

  const cancel = () => {
    controllerRef.current?.abort()
    setIsLoading(false)
  }

  const runTool = async (toolName, payload) => {
    const controller = new AbortController()
    controllerRef.current = controller
    setOutput('')
    setMetadata(null)
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch(`${baseURL}/api/ai/${toolName}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      })

      if (!response.ok || !response.body) {
        const body = await response.json().catch(() => null)
        throw new Error(body?.message || 'Unable to run tool right now.')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let completionPayload = null

      while (true) {
        const { done, value } = await reader.read()

        if (done) {
          break
        }

        buffer += decoder.decode(value, { stream: true })
        const chunks = buffer.split('\n\n')
        buffer = chunks.pop() || ''

        for (const chunk of chunks) {
          const events = parseSseChunk(chunk)

          for (const event of events) {
            if (event.type === 'chunk') {
              setOutput((current) => current + event.chunk)
            }

            if (event.type === 'complete') {
              completionPayload = event
              setMetadata(event.metadata || null)
            }

            if (event.type === 'error') {
              throw new Error(event.message)
            }
          }
        }
      }

      await refreshUser()
      return completionPayload
    } catch (runError) {
      setError(runError.message)
      throw runError
    } finally {
      setIsLoading(false)
    }
  }

  return {
    output,
    metadata,
    isLoading,
    error,
    runTool,
    reset,
    cancel,
  }
}

export default useAI
