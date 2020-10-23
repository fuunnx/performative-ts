import { bindHandler, perform } from '../src'

// --- library code

const getThemeEff = Symbol('getThemeEff')

function useTheme() {
  return perform(getThemeEff)
}

function provideTheme(theme, Component) {
  return bindHandler({ [getThemeEff]: () => theme }, Component)
}

// --- userland code

function Button({ label }) {
  const theme = useTheme()

  return `
    <button style="color: ${theme.primaryColor}">
      ${label}
    </button>
  `
}

function App() {
  return Button({ label: 'Hello' })
}

export default provideTheme({ primaryColor: 'paleblue' }, App)
