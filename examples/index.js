import { withLogger, withLogPrefix, log } from './logger'
import loggerExample from './logger'
import themeProviderExample from './themeProvider'
import stateExample from './state'

function HTMLLogger(...infos) {
  console.log(infos)

  let logEl = document.createElement('p')
  logEl.innerText = infos
    .map((x) => (x && typeof x === 'string' ? x : JSON.stringify(x)))
    .join(' ')
  document.body.appendChild(logEl)
}

withLogger(HTMLLogger, () => {
  withLogPrefix('ThemeProvider', () => log('result', themeProviderExample()))
  withLogPrefix('State', () => log('result', stateExample()))
  withLogPrefix('Logger', () => log('result', loggerExample()))
})
