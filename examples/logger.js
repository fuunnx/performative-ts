import { perform, withHandler } from '../src'

// --- library

const logEff = Symbol('logEff')

export function log(...infos) {
  perform(logEff, ...infos)
}

export function withLogger(logFunction, wrappedFunc) {
  return withHandler({ [logEff]: logFunction }, wrappedFunc)
}

export function withLogPrefix(prefix, wrappedFunc) {
  return withHandler(
    { [logEff]: (...infos) => log(`[${prefix}]`, ...infos) },
    wrappedFunc,
  )
}

// --- userland

export default function App() {
  log('rendering App')
  const ButtonElement = withLogPrefix('App', Button)

  return ButtonElement({ label: 'Hello' })
}

function Button({ label }) {
  log('rendering Button')

  return `
    <button>
      ${label}
    </button>
  `
}
