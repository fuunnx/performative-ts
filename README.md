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

Performs a effect and return its result. Throws if the corresponding effect handler is not declared during its execution.

`performSafe(effectName, ...args): effectResult | undefined`

Performs a effect safely and return its result. Returns `undefined` if the corresponding effect handler is not declared during its execution.

### withHandler

`withHandler(handler, computation): computationResult`

Calls a computation (a function taking no arguments) with the provided effect handler.

`withHandler(...handlerTuples, computation): computationResult`

Calls a computation (a function taking no arguments) with the provided effect handler functions.

### bindHandler

`bindHandler(handler, func): func`

Binds an effect handler to the provided function.

`bindHandler(...handlerTuples, func): func`

Binds effect handler functions to the provided function.

### curried bindHandler

`bindHandler(handler): func => func`

Returns a function that will bind the given effect handler to another function.

`bindHandler(...handlerTuples): func => func`

Returns a function that will bind the given effect handler functions to another function.

### frames

`captureFrame(): currentFrame`

Captures current execution frame

`withFrame(frame, computation): computationResult`

Calls a computation (a function taking no arguments) with the provided execution frame.

`bindFrame(frame, func): func`

Binds an execution frame to the provided function.

## Types

`EffectName`

An unique effect identifier. Can be a `string`, `number` or `symbol`.

`Handler`

An object consisting of EffectNames as keys and EffectHandlerFunctions as values.

`HandlerTuple`

A tuple consisting of EffectName as first element and EffectHandlerFunction as second element.

`Frame`

An object keeping the reference to its own effect handlers and to its parent frame.
