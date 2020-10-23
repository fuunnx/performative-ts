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

console.log(
  withHandler(
    {
      [getThemeEff]() {
        return { primaryColor: 'paleblue' }
      },
    },
    () => App(),
  ),
)
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

  return withLogger(
    (info) => log(`[App]: ${info}`),
    () => Button({ label: 'Hello' }),
  )
}

withLogger((info) => console.log(info), App)
// rendering Button
// [App]: rendering App
```

See [examples](https://github.com/fuunnx/performative-ts/tree/main/examples) for more

## Best practices

👉 Rename your functions to add meaning:

```js
import { perform, withHandler } from 'performative-ts'

const getThemeEff = 'getThemeEff'

export function useTheme() {
  return perform(getThemeEff)
}

export function provideTheme(theme, Component) {
  return withHandler({ [getThemeEff]: () => theme }, Component)
}
```

👉 Use a symbol to prevent collisions

```js
const getThemeEff = Symbol('getThemeEff')
```

👉 Compose your handlers

```js
import { compose } from 'your-favorite-lib'
import { bindHandler, perform } from 'performative-ts'

function sayName(name) {
  console.log(`Hello ${name || perform('getName')}`)
}

const composed = compose(
  bindHandler(['getName', () => 'John Snow']),
  bindHandler(['getName', () => perform('getName').toUpperCase()]),
)(sayName)

composed('Arya') // Hello Arya
composed() // Hello JOHN SNOW
```

👉 Capture current frame for later execution

```js
import { captureFrame, bindFrame, withFrame } from 'performative-ts/frame'

const frame = captureFrame()

// later
const boundListener = bindFrame(frame, listener)
button.addEventListener('click', boundListener)

setTimeout(() => {
  withFrame(frame, () => computation())
}, 1000)
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
  return withHandler([getThemeEff, () => theme], Component)
}
```

## API reference

### perform

`perform(effectName, ...args): effectResult or throws`

`performSafe(effectName, ...args): effectResult | undefined`

### withHandler

`withHandler(handler, computation): computationResult`

`withHandler(...handlerTuples, computation): computationResult`

### bindHandler

`bindHandler(handler, func): func`

`bindHandler(...handlerTuples, func): func`

### curried bindHandler

`bindHandler(handler): func => func`

`bindHandler(...handlerTuples): func => func`

### frames

`captureFrame(): currentFrame`

`withFrame(frame, computation): computationResult`

`bindFrame(frame, func): func`
