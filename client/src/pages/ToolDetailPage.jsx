import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FiCopy, FiDownload, FiRotateCcw, FiZap } from 'react-icons/fi'
import PageShell from '@/components/layout/PageShell.jsx'
import SEO from '@/components/layout/SEO.jsx'
import Badge from '@/components/ui/Badge.jsx'
import GlassCard from '@/components/ui/GlassCard.jsx'
import GlowButton from '@/components/ui/GlowButton.jsx'
import Skeleton from '@/components/ui/Skeleton.jsx'
import ToolFields from '@/components/tools/ToolFields.jsx'
import ToolOutputRenderer from '@/components/tools/ToolOutputRenderer.jsx'
import { toolDefinitions } from '@/data/site.js'
import { useAI } from '@/hooks/useAI.js'
import { useToast } from '@/hooks/useToast.js'
import { getInitialToolState, validateToolState } from '@/components/tools/toolConfig.js'

const ToolDetailView = ({ toolName }) => {
  const tool = useMemo(() => toolDefinitions.find((item) => item.slug === toolName), [toolName])
  const [formState, setFormState] = useState(() => getInitialToolState(toolName))
  const [errors, setErrors] = useState({})
  const { output, isLoading, runTool, reset } = useAI()
  const { showToast } = useToast()

  if (!tool) {
    return null
  }

const setFieldValue = (field, value) => {
    setFormState((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
  }

  const toggleListValue = (field, value) => {
    setFormState((current) => {
      const currentValues = current[field]
      const nextValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value]

      return { ...current, [field]: nextValues }
    })
  }

  const handleRunTool = async () => {
    const nextErrors = validateToolState(toolName, formState)

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      showToast({
        title: 'Missing input',
        description: 'Complete the required fields before running the tool.',
        variant: 'error',
      })
      return
    }

    try {
      await runTool(toolName, formState)
      showToast({
        title: 'Tool completed',
        description: `${tool.name} finished streaming its response.`,
        variant: 'success',
      })
    } catch (error) {
      showToast({
        title: 'Tool failed',
        description: error.message,
        variant: 'error',
      })
    }
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output)
    showToast({
      title: 'Copied to clipboard',
      description: 'The AI output is ready to paste wherever you need it.',
      variant: 'success',
    })
  }

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `${tool.slug}-output.txt`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  const handleClear = () => {
    setFormState(getInitialToolState(toolName))
    setErrors({})
    reset()
  }

  return (
    <PageShell>
      <SEO
        title={tool.name}
        description={`Run the ${tool.name} tool inside HeroicAI and stream the result live.`}
        path={`/tools/${tool.slug}`}
      />

      <div className="space-y-8">
        <GlassCard className="space-y-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <Badge variant="cyan">{tool.eyebrow}</Badge>
              <div>
                <h1 className="text-4xl font-semibold tracking-[-0.04em] text-foreground">{tool.name}</h1>
                <p className="mt-3 max-w-3xl text-lg leading-8 text-muted">{tool.description}</p>
              </div>
            </div>
            <Badge variant="gray">{tool.usageCount.toLocaleString()} lifetime runs</Badge>
          </div>
        </GlassCard>

        <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
          <GlassCard className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.24em] text-muted">Input</p>
              <h2 className="text-2xl font-semibold text-foreground">Tell HeroicAI what you need</h2>
            </div>

            <ToolFields
              toolName={toolName}
              formState={formState}
              errors={errors}
              setFieldValue={setFieldValue}
              toggleListValue={toggleListValue}
            />

            <div className="flex flex-col gap-3 sm:flex-row">
              <GlowButton onClick={handleRunTool} fullWidth disabled={isLoading}>
                <FiZap /> {isLoading ? 'Running Tool...' : 'Run Tool'}
              </GlowButton>
              <GlowButton onClick={handleClear} variant="ghost" fullWidth>
                <FiRotateCcw /> Clear
              </GlowButton>
            </div>
          </GlassCard>

          <GlassCard className="space-y-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.24em] text-muted">Output</p>
                <h2 className="text-2xl font-semibold text-foreground">Streamed AI response</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <GlowButton onClick={handleCopy} variant="secondary" disabled={!output}>
                  <FiCopy /> Copy
                </GlowButton>
                <GlowButton onClick={handleDownload} variant="secondary" disabled={!output}>
                  <FiDownload /> Download
                </GlowButton>
              </div>
            </div>

            {isLoading && !output ? (
              <div className="space-y-4">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-40 w-full" />
              </div>
            ) : (
              <ToolOutputRenderer toolName={toolName} output={output} />
            )}
          </GlassCard>
        </div>
      </div>
    </PageShell>
  )
}

const ToolDetailPage = () => {
  const { toolName = '' } = useParams()

  return <ToolDetailView key={toolName} toolName={toolName} />
}

export default ToolDetailPage
