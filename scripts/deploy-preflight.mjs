const sections = [
  {
    label: 'Vercel',
    variables: ['VERCEL_TOKEN', 'VERCEL_ORG_ID', 'VERCEL_PROJECT_ID'],
  },
  {
    label: 'Railway',
    variables: ['RAILWAY_TOKEN', 'RAILWAY_SERVICE'],
  },
  {
    label: 'Server runtime',
    variables: [
      'MONGO_URI',
      'REDIS_URL',
      'POSTGRES_URL',
      'JWT_SECRET',
      'GOOGLE_CLIENT_ID',
      'GOOGLE_CLIENT_SECRET',
      'ANTHROPIC_API_KEY',
      'EMAILJS_SERVICE_ID',
      'CLIENT_URL',
    ],
  },
  {
    label: 'Client runtime',
    variables: [
      'VITE_API_URL',
      'VITE_EMAILJS_SERVICE_ID',
      'VITE_EMAILJS_TEMPLATE_ID',
      'VITE_EMAILJS_PUBLIC_KEY',
    ],
  },
]

let hasMissingValues = false

for (const section of sections) {
  console.log(`\n${section.label}`)

  for (const variable of section.variables) {
    const value = process.env[variable]
    const status = value ? 'SET' : 'MISSING'

    if (!value) {
      hasMissingValues = true
    }

    console.log(`- ${variable}: ${status}`)
  }
}

if (hasMissingValues) {
  console.log('\nDeployment preflight is incomplete. Add the missing values before linking Vercel or Railway.')
  process.exit(1)
}

console.log('\nDeployment preflight passed.')
