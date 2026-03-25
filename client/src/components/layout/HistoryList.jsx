import Badge from '@/components/ui/Badge.jsx'
import GlassCard from '@/components/ui/GlassCard.jsx'

const formatDate = (date) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(date))

const HistoryList = ({ history = [], title = 'Recent History', compact = false }) => (
  <GlassCard className={compact ? 'space-y-4 p-5' : 'space-y-5'}>
    <div className="flex items-center justify-between gap-3">
      <div>
        <p className="text-sm uppercase tracking-[0.26em] text-primary/80">Saved Output</p>
        <h3 className="mt-2 text-xl font-semibold text-foreground">{title}</h3>
      </div>
      <Badge variant="cyan">{history.length} items</Badge>
    </div>

    <div className="space-y-3">
      {history.length ? (
        history.slice(0, 5).map((item, index) => (
          <div
            key={`${item.tool}-${item.createdAt}-${index}`}
            className="rounded-2xl border border-white/8 bg-background/40 p-4"
          >
            <div className="mb-2 flex items-center justify-between gap-3">
              <p className="font-semibold text-foreground">{item.tool}</p>
              <span className="text-xs uppercase tracking-[0.22em] text-muted">
                {formatDate(item.createdAt)}
              </span>
            </div>
            <p className="line-clamp-3 text-sm text-muted">{item.output}</p>
          </div>
        ))
      ) : (
        <div className="rounded-2xl border border-dashed border-white/10 bg-background/30 p-5 text-sm text-muted">
          Your AI runs will appear here after you start using the tools.
        </div>
      )}
    </div>
  </GlassCard>
)

export default HistoryList
