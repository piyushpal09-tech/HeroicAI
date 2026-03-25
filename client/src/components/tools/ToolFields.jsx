import Input from '@/components/ui/Input.jsx'
import Textarea from '@/components/ui/Textarea.jsx'

const selectClassName =
  'min-h-11 w-full rounded-2xl border border-white/10 bg-panel/80 px-4 py-3 text-sm text-foreground transition duration-300 focus:border-primary/50 focus:ring-2 focus:ring-primary/20'

const checkboxClass =
  'flex min-h-11 items-center gap-3 rounded-2xl border border-white/10 bg-background/40 px-4 py-3 text-sm text-muted transition hover:border-primary/30 hover:text-foreground'

const ToolFields = ({ toolName, formState, errors, setFieldValue, toggleListValue }) => {
  switch (toolName) {
    case 'code-reviewer':
      return (
        <div className="space-y-5">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-foreground">Language</span>
            <select
              value={formState.language}
              onChange={(event) => setFieldValue('language', event.target.value)}
              className={selectClassName}
            >
              {['JavaScript', 'TypeScript', 'Python', 'Go', 'Rust', 'Java', 'C#'].map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </label>
          <Textarea
            id="code"
            label="Source code"
            value={formState.code}
            onChange={(event) => setFieldValue('code', event.target.value)}
            placeholder="Paste the function, component, endpoint, or full file you want reviewed."
            error={errors.code}
            textareaClassName="font-mono text-[13px] leading-6"
          />
          <div className="space-y-3">
            <p className="text-sm font-medium text-foreground">Review focus</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ['bugs', 'Review for Bugs'],
                ['security', 'Security Issues'],
                ['performance', 'Performance'],
                ['best-practices', 'Best Practices'],
              ].map(([value, label]) => (
                <label key={value} className={checkboxClass}>
                  <input
                    type="checkbox"
                    checked={formState.reviewFor.includes(value)}
                    onChange={() => toggleListValue('reviewFor', value)}
                    className="h-4 w-4 rounded border-white/20 bg-transparent text-primary focus:ring-primary/20"
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )
    case 'resume-optimizer':
      return (
        <div className="space-y-5">
          <Textarea
            id="resume"
            label="Current resume"
            value={formState.resume}
            onChange={(event) => setFieldValue('resume', event.target.value)}
            placeholder="Paste your current resume content here."
            error={errors.resume}
          />
          <Textarea
            id="jobDescription"
            label="Job description"
            value={formState.jobDescription}
            onChange={(event) => setFieldValue('jobDescription', event.target.value)}
            placeholder="Paste the target job description you want to optimize against."
            error={errors.jobDescription}
          />
        </div>
      )
    case 'api-docs':
      return (
        <div className="space-y-5">
          <Textarea
            id="routeDefinitions"
            label="Routes or endpoint notes"
            value={formState.routeDefinitions}
            onChange={(event) => setFieldValue('routeDefinitions', event.target.value)}
            placeholder="Example: GET /api/users, POST /api/projects, auth required on all write routes."
            error={errors.routeDefinitions}
          />
          <label className="block space-y-2">
            <span className="text-sm font-medium text-foreground">Framework</span>
            <select
              value={formState.framework}
              onChange={(event) => setFieldValue('framework', event.target.value)}
              className={selectClassName}
            >
              {['Express', 'Next.js', 'FastAPI'].map((framework) => (
                <option key={framework} value={framework}>
                  {framework}
                </option>
              ))}
            </select>
          </label>
        </div>
      )
    case 'db-schema':
      return (
        <div className="space-y-5">
          <Textarea
            id="requirements"
            label="Product data requirements"
            value={formState.requirements}
            onChange={(event) => setFieldValue('requirements', event.target.value)}
            placeholder="Describe users, billing, projects, permissions, analytics, or whatever the app must store."
            error={errors.requirements}
          />
          <label className="block space-y-2">
            <span className="text-sm font-medium text-foreground">Database target</span>
            <select
              value={formState.database}
              onChange={(event) => setFieldValue('database', event.target.value)}
              className={selectClassName}
            >
              {['MongoDB', 'PostgreSQL', 'Both'].map((database) => (
                <option key={database} value={database}>
                  {database}
                </option>
              ))}
            </select>
          </label>
        </div>
      )
    case 'proposal-writer':
      return (
        <div className="space-y-5">
          <Input
            id="clientName"
            label="Client name"
            value={formState.clientName}
            onChange={(event) => setFieldValue('clientName', event.target.value)}
            placeholder="Acme Labs"
            error={errors.clientName}
          />
          <Input
            id="projectTitle"
            label="Project title"
            value={formState.projectTitle}
            onChange={(event) => setFieldValue('projectTitle', event.target.value)}
            placeholder="AI-powered knowledge base revamp"
            error={errors.projectTitle}
          />
          <Textarea
            id="scope"
            label="Scope description"
            value={formState.scope}
            onChange={(event) => setFieldValue('scope', event.target.value)}
            placeholder="Outline deliverables, goals, audience, and constraints."
            error={errors.scope}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              id="timeline"
              label="Timeline"
              value={formState.timeline}
              onChange={(event) => setFieldValue('timeline', event.target.value)}
              placeholder="6 weeks"
            />
            <Input
              id="budget"
              label="Budget range"
              value={formState.budget}
              onChange={(event) => setFieldValue('budget', event.target.value)}
              placeholder="$8,000 - $12,000"
            />
          </div>
        </div>
      )
    case 'content-planner':
      return (
        <div className="space-y-5">
          <Input
            id="brandName"
            label="Brand name"
            value={formState.brandName}
            onChange={(event) => setFieldValue('brandName', event.target.value)}
            placeholder="HeroicAI"
            error={errors.brandName}
          />
          <Input
            id="niche"
            label="Industry or niche"
            value={formState.niche}
            onChange={(event) => setFieldValue('niche', event.target.value)}
            placeholder="AI SaaS for developers"
            error={errors.niche}
          />
          <Input
            id="audience"
            label="Target audience"
            value={formState.audience}
            onChange={(event) => setFieldValue('audience', event.target.value)}
            placeholder="Founders, developers, AI consultants"
            error={errors.audience}
          />
          <div className="space-y-3">
            <p className="text-sm font-medium text-foreground">Platforms</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {['Instagram', 'LinkedIn', 'Twitter', 'YouTube'].map((platform) => (
                <label key={platform} className={checkboxClass}>
                  <input
                    type="checkbox"
                    checked={formState.platforms.includes(platform)}
                    onChange={() => toggleListValue('platforms', platform)}
                    className="h-4 w-4 rounded border-white/20 bg-transparent text-primary focus:ring-primary/20"
                  />
                  <span>{platform}</span>
                </label>
              ))}
            </div>
            {errors.platforms ? <p className="text-sm text-danger">{errors.platforms}</p> : null}
          </div>
        </div>
      )
    case 'support-bot':
      return (
        <Textarea
          id="sourceContent"
          label="FAQ, docs, or product knowledge"
          value={formState.sourceContent}
          onChange={(event) => setFieldValue('sourceContent', event.target.value)}
          placeholder="Paste your help center articles, onboarding docs, or FAQ content."
          error={errors.sourceContent}
        />
      )
    case 'idea-validator':
      return (
        <Textarea
          id="idea"
          label="Startup idea"
          value={formState.idea}
          onChange={(event) => setFieldValue('idea', event.target.value)}
          placeholder="Describe the product, target customer, monetization model, and any early traction."
          error={errors.idea}
        />
      )
    default:
      return null
  }
}

export default ToolFields
