function loadLocalEnvironmentFile() {
  try {
    process.loadEnvFile()
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code
    if (code !== 'ENOENT') {
      throw error
    }
  }
}

function requireEnvironmentVariable(name: string) {
  const value = process.env[name]?.trim()

  if (!value) {
    throw new Error(
      `Missing required environment variable ${name}. Copy .env.example to .env and provide a value.`,
    )
  }

  return value
}

function readPositiveInteger(name: string, fallback: number) {
  const rawValue = process.env[name]?.trim()
  if (!rawValue) {
    return fallback
  }

  const value = Number(rawValue)
  if (!Number.isInteger(value) || value < 1) {
    throw new Error(`${name} must be a positive integer.`)
  }

  return value
}

loadLocalEnvironmentFile()

export const environment = Object.freeze({
  baseUrl: requireEnvironmentVariable('ERP_BASE_URL'),
  username: requireEnvironmentVariable('ERP_USERNAME'),
  password: requireEnvironmentVariable('ERP_PASSWORD'),
  runMutatingTests: process.env.RUN_MUTATING_TESTS === '1',
  workers: readPositiveInteger('ERP_WORKERS', 1),
})
