# Performative-ts

Composable, minimalist algebraic effects inspired, side-effect management library

```sh
npm install --save performative-ts
```

```sh
yarn add performative-ts
```

## Use cases

👉 Providing a theme:

```js
import { perform, withHandler } from 'performative-ts'

const getThemeEff = 'getThemeEff'

function Button({ label }) {
  const theme = perform(getThemeEff)

  return `
    <button style="color: ${theme.primaryColor}">
      ${label}
    </button>
  `
}

function App() {
  return Button({ label: 'Hello' })
}

const ThemedApp = withHandler(
  {
    [getThemeEff]() {
      return { primaryColor: 'paleblue' }
    },
  },
  App,
)

console.log(ThemedApp())
```

👉 Add a logger:

```js
import { perform, withHandler } from 'performative-ts'

// --- library

const logEff = 'logEff'

function log(info) {
  perform(logEff, info)
}

function withLogger(logFunction, wrappedFunc) {
  return withHandler({ [logEff]: logFunction }, wrappedFunc)
}

// --- userland

function Button({ label }) {
  log('rendering Button')

  return `
    <button style="color: ${theme.primaryColor}">
      ${label}
    </button>
  `
}

function App() {
  log('rendering App')
  const ButtonElement = withLogger((info) => log(`[App]: ${info}`), Button)

  return ButtonElement({ label: 'Hello' })
}

const run = withLogger((info) => console.log(info), App)

run()
// rendering Button
// [App]: rendering App
```

## Recipes

👉 Rename your functions to add meaning:

```js
import { perform, withHandler } from 'performative-ts'

const getThemeEff = 'getThemeEff'

export function useTheme() {
  return perform(getThemeEff)
}

export function provideTheme(theme, Component) {
  return withHandler({ [getThemeEff]: () => theme }, App)
}
```

👉 Use a symbol to prevent collisions

```js
const getThemeEff = Symbol('getThemeEff')
```

👉 Capture current frame for later execution

```js
const getThemeEff = Symbol('getThemeEff')
```

👉 Use with typescript

```js
import { perform, withHandler } from 'performative-ts'
import type { EffectName } from 'performative-ts'

export type Theme = {
  primaryColor: string
}

const getThemeEff: EffectName<() => Theme> = Symbol('getThemeEff')

export function useTheme(): Theme {
  return perform(getThemeEff)
}

export function provideTheme<C extends Function>(theme: Theme, Component: C): C {
  // for better typings with typescript, the library allow to provide handlers as tuples
  return withHandler([getThemeEff, () => theme], App)
}
```
