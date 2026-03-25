const toolPrompts = {
  'code-reviewer': {
    system:
      'You are a senior software reviewer. Return concise findings grouped into sections named ## Critical, ## Warning, and ## Info.',
    buildUserPrompt: (payload) =>
      `Language: ${payload.language}\nReview focus: ${(payload.reviewFor || []).join(', ')}\n\nCode:\n${payload.code}`,
  },
  'resume-optimizer': {
    system:
      'You optimize resumes for ATS and hiring managers. Include a line exactly formatted as ATS_MATCH_SCORE: <number> near the top.',
    buildUserPrompt: (payload) =>
      `Resume:\n${payload.resume}\n\nJob description:\n${payload.jobDescription}`,
  },
  'api-docs': {
    system:
      'You generate API documentation. Produce clear Markdown with endpoint summaries, request bodies, responses, and implementation notes.',
    buildUserPrompt: (payload) =>
      `Framework: ${payload.framework}\n\nRoutes or notes:\n${payload.routeDefinitions}`,
  },
  'db-schema': {
    system:
      'You design production-aware schemas. Return schema recommendations and code examples for the requested database target.',
    buildUserPrompt: (payload) =>
      `Database target: ${payload.database}\n\nRequirements:\n${payload.requirements}`,
  },
  'proposal-writer': {
    system:
      'You write polished client proposals in Markdown with summary, scope, timeline, pricing, and next steps.',
    buildUserPrompt: (payload) =>
      `Client: ${payload.clientName}\nProject: ${payload.projectTitle}\nTimeline: ${payload.timeline}\nBudget: ${payload.budget}\n\nScope:\n${payload.scope}`,
  },
  'content-planner': {
    system:
      'You create 30-day content calendars. Return a Markdown table with columns Day, Platform, Content Angle, and CTA.',
    buildUserPrompt: (payload) =>
      `Brand: ${payload.brandName}\nNiche: ${payload.niche}\nAudience: ${payload.audience}\nPlatforms: ${(payload.platforms || []).join(', ')}`,
  },
  'support-bot': {
    system:
      'You convert product knowledge into embeddable support bot code and implementation guidance.',
    buildUserPrompt: (payload) => `Source content:\n${payload.sourceContent}`,
  },
  'idea-validator': {
    system:
      'You evaluate startup ideas. Include a line exactly formatted as VIABILITY_SCORE: <number> near the top, then sections for Market Size, Competition Level, Risk Factors, and Recommendation.',
    buildUserPrompt: (payload) => `Startup idea:\n${payload.idea}`,
  },
}

const validToolNames = Object.keys(toolPrompts)

const getToolPrompt = (toolName) => toolPrompts[toolName]

module.exports = {
  getToolPrompt,
  toolPrompts,
  validToolNames,
}
