import { perform, withHandler } from '../src'

// --- library

const logEff = Symbol('logEff')

export function log(...infos) {
  perform(logEff, ...infos)
}

export function withLogger(logFunction, computation) {
  return withHandler({ [logEff]: logFunction }, computation)
}

export function withLogPrefix(prefix, computation) {
  return withHandler(
    { [logEff]: (...infos) => log(`[${prefix}]`, ...infos) },
    computation,
  )
}

// --- userland

export default function App() {
  log('rendering App')

  return withLogPrefix('App', () => Button({ label: 'Hello' }))
}

function Button({ label }) {
  log('rendering Button')

  return `
    <button>
      ${label}
    </button>
  `
}
