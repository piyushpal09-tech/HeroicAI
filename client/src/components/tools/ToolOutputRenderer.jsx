import { motion } from 'framer-motion'
import Badge from '@/components/ui/Badge.jsx'
import ProgressBar from '@/components/ui/ProgressBar.jsx'

const MotionCircle = motion.circle

const extractMarker = (text, marker) => {
  const match = text.match(new RegExp(`${marker}:\\s*(\\d+)`, 'i'))
  return match ? Number(match[1]) : null
}

const parseMarkdownTable = (text) => {
  const lines = text
    .split('\n')
    .filter((line) => line.trim().startsWith('|'))
    .filter((line) => !line.includes('---'))

  if (lines.length < 2) {
    return null
  }

  const rows = lines.map((line) =>
    line
      .split('|')
      .map((cell) => cell.trim())
      .filter(Boolean),
  )

  return {
    headers: rows[0],
    rows: rows.slice(1),
  }
}

const parseSections = (text) =>
  text
    .split(/^##\s+/gm)
    .map((section) => section.trim())
    .filter(Boolean)
    .map((section) => {
      const [title, ...rest] = section.split('\n')
      return { title, body: rest.join('\n').trim() }
    })

const ScoreRing = ({ score, label }) => {
  const circumference = 2 * Math.PI * 44
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-4 rounded-[28px] border border-white/10 bg-background/40 p-6">
      <svg width="120" height="120" viewBox="0 0 120 120" className="-rotate-90">
        <circle cx="60" cy="60" r="44" stroke="rgba(255,255,255,0.08)" strokeWidth="10" fill="none" />
        <MotionCircle
          cx="60"
          cy="60"
          r="44"
          stroke="url(#heroicaiScoreGradient)"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        />
        <defs>
          <linearGradient id="heroicaiScoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00f5ff" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
      </svg>
      <div className="-mt-24 text-center">
        <p className="text-3xl font-semibold text-foreground">{score}</p>
        <p className="text-xs uppercase tracking-[0.28em] text-muted">{label}</p>
      </div>
    </div>
  )
}

const ToolOutputRenderer = ({ toolName, output }) => {
  if (!output) {
    return (
      <div className="rounded-[28px] border border-dashed border-white/10 bg-background/40 p-8 text-sm leading-7 text-muted">
        Your streamed AI response will appear here as soon as you run the tool.
      </div>
    )
  }

  const atsScore = extractMarker(output, 'ATS_MATCH_SCORE')
  const viabilityScore = extractMarker(output, 'VIABILITY_SCORE')
  const table = parseMarkdownTable(output)
  const sections = toolName === 'code-reviewer' ? parseSections(output) : []

  return (
    <div className="space-y-6">
      {atsScore !== null ? <ProgressBar value={atsScore} max={100} label="ATS match score" /> : null}
      {viabilityScore !== null ? <ScoreRing score={viabilityScore} label="Viability Score" /> : null}

      {sections.length ? (
        <div className="space-y-4">
          {sections.map((section) => {
            const title = section.title.toLowerCase()
            const variant =
              title.includes('critical') ? 'red' : title.includes('warning') ? 'violet' : 'cyan'

            return (
              <div key={section.title} className="rounded-[28px] border border-white/10 bg-background/35 p-5">
                <Badge variant={variant}>{section.title}</Badge>
                <pre className="mt-4 whitespace-pre-wrap text-sm leading-7 text-muted">{section.body}</pre>
              </div>
            )
          })}
        </div>
      ) : null}

      {!sections.length && table ? (
        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-background/35">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-white/5 text-foreground">
                <tr>
                  {table.headers.map((header) => (
                    <th key={header} className="px-4 py-3 font-medium">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, rowIndex) => (
                  <tr key={`${row.join('-')}-${rowIndex}`} className="border-t border-white/8">
                    {row.map((cell, cellIndex) => (
                      <td key={`${cell}-${cellIndex}`} className="px-4 py-3 text-muted">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      <pre className="whitespace-pre-wrap rounded-[28px] border border-white/10 bg-background/35 p-6 text-sm leading-7 text-foreground">
        {output}
      </pre>
    </div>
  )
}

export default ToolOutputRenderer
