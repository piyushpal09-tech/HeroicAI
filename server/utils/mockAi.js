const generateMockResponse = (toolName, payload) => {
  switch (toolName) {
    case 'code-reviewer':
      return `## Critical
- Validate user-controlled input before it reaches your data layer.

## Warning
- Consider extracting repeated logic into a shared helper to reduce maintenance overhead.
- Add tests around unhappy paths and empty-state handling.

## Info
- ${payload.language} code should include clearer naming around async flows.
- Focus areas reviewed: ${(payload.reviewFor || []).join(', ')}.`
    case 'resume-optimizer':
      return `ATS_MATCH_SCORE: 88

## Stronger Summary
- Rewrite your opening summary around measurable business outcomes and ownership.

## Experience Refresh
- Move impact-driven bullets higher and mirror language from the job description.

## Skill Alignment
- Bring the most relevant tools and AI workflows into the top third of the resume.`
    case 'api-docs':
      return `## Overview
This ${payload.framework} API exposes clean resource-oriented endpoints with authentication on write actions.

## Example Endpoints
- GET /api/resources
- POST /api/resources
- GET /api/resources/:id

## Response Notes
- Use standard status codes and include validation errors with a consistent message shape.`
    case 'db-schema':
      return `## Recommended Approach
Use ${payload.database} for the primary implementation and model permissions, ownership, and activity events explicitly.

\`\`\`js
const ProjectSchema = {
  name: String,
  ownerId: String,
  status: String,
  createdAt: Date,
}
\`\`\``
    case 'proposal-writer':
      return `# ${payload.projectTitle}

## Client
${payload.clientName}

## Scope
${payload.scope}

## Timeline
${payload.timeline || '6 weeks'}

## Budget
${payload.budget || 'Custom scoped pricing'}`
    case 'content-planner':
      return `| Day | Platform | Content Angle | CTA |
| --- | --- | --- | --- |
| 1 | LinkedIn | Founder insight on AI workflows | Book a demo |
| 2 | Twitter | Short product lesson with a sharp hook | Visit landing page |
| 3 | YouTube | Build-in-public walkthrough | Subscribe |
| 4 | Instagram | Carousel breaking down one core pain point | Save the post |`
    case 'support-bot':
      return `## Embed Snippet
\`\`\`html
<script>
  window.heroicSupportBot = {
    title: 'Support Assistant',
    welcome: 'How can we help today?'
  };
</script>
\`\`\`

## Setup Notes
- Load the widget after your product docs are available.
- Seed the bot with your most common onboarding and billing questions.`
    case 'idea-validator':
      return `VIABILITY_SCORE: 82

## Market Size
- Strong opportunity if you target operators who already pay for AI tooling.

## Competition Level
- Moderate competition with room for a sharper positioning angle.

## Risk Factors
- Distribution and retention will matter more than model access alone.

## Recommendation
- Validate with a narrow ICP and one paid offer before expanding.`
    default:
      return 'HeroicAI generated a response.'
  }
}

module.exports = {
  generateMockResponse,
}
