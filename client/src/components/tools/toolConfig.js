export const getInitialToolState = (toolName) => {
  const defaults = {
    'code-reviewer': {
      language: 'TypeScript',
      code: '',
      reviewFor: ['bugs', 'security', 'performance', 'best-practices'],
    },
    'resume-optimizer': {
      resume: '',
      jobDescription: '',
    },
    'api-docs': {
      routeDefinitions: '',
      framework: 'Express',
    },
    'db-schema': {
      requirements: '',
      database: 'Both',
    },
    'proposal-writer': {
      clientName: '',
      projectTitle: '',
      scope: '',
      timeline: '',
      budget: '',
    },
    'content-planner': {
      brandName: '',
      niche: '',
      audience: '',
      platforms: ['LinkedIn'],
    },
    'support-bot': {
      sourceContent: '',
    },
    'idea-validator': {
      idea: '',
    },
  }

  return defaults[toolName] || {}
}

export const validateToolState = (toolName, state) => {
  const errors = {}

  switch (toolName) {
    case 'code-reviewer':
      if (!state.code?.trim()) errors.code = 'Paste the code you want reviewed.'
      break
    case 'resume-optimizer':
      if (!state.resume?.trim()) errors.resume = 'Resume content is required.'
      if (!state.jobDescription?.trim()) errors.jobDescription = 'Job description is required.'
      break
    case 'api-docs':
      if (!state.routeDefinitions?.trim()) errors.routeDefinitions = 'Describe routes or endpoints first.'
      break
    case 'db-schema':
      if (!state.requirements?.trim()) errors.requirements = 'Describe the product data model needs.'
      break
    case 'proposal-writer':
      if (!state.clientName?.trim()) errors.clientName = 'Client name is required.'
      if (!state.projectTitle?.trim()) errors.projectTitle = 'Project title is required.'
      if (!state.scope?.trim()) errors.scope = 'Scope description is required.'
      break
    case 'content-planner':
      if (!state.brandName?.trim()) errors.brandName = 'Brand name is required.'
      if (!state.niche?.trim()) errors.niche = 'Industry or niche is required.'
      if (!state.audience?.trim()) errors.audience = 'Target audience is required.'
      if (!state.platforms?.length) errors.platforms = 'Choose at least one platform.'
      break
    case 'support-bot':
      if (!state.sourceContent?.trim()) errors.sourceContent = 'FAQ or docs content is required.'
      break
    case 'idea-validator':
      if (!state.idea?.trim()) errors.idea = 'Describe the startup idea first.'
      break
    default:
      break
  }

  return errors
}
