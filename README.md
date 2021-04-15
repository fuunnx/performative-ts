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

function Button({ label }) {
  const theme = perform('getTheme')

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
      getTheme() {
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

function log(info) {
  perform('log', info)
}

function withLogger(logFunction, wrappedFunc) {
  return withHandler({ log: logFunction }, wrappedFunc)
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

👉 Wrap you `perform`, `bindHandler` and `withHandler` calls into functions to add meaning to your code:

```js
import { perform, bindHandler } from 'performative-ts'

export function useTheme() {
  return perform('getTheme')
}

export function provideTheme(theme, Component) {
  return bindHandler({ getTheme: () => theme }, Component)
}
```

👉 Store the effect name in a variable

```js
import { perform, bindHandler } from 'performative-ts'

const getThemeEffectName = 'getTheme'

export function useTheme() {
  return perform(getThemeEffectName)
}

export function provideTheme(theme, Component) {
  return bindHandler({ [getThemeEffectName]: () => theme }, Component)
}
```

👉 Use a symbol to prevent naming collisions

```js
export const getThemeEffectName = Symbol('getThemeEffectName')
```

👉 Compose your handlers

```js
import { compose } from 'your-favorite-lib'
import { bindHandler, perform } from 'performative-ts'

const getNameEffect = Symbol('getName')

function sayName(name) {
  console.log(`Hello ${name || perform(getNameEffect)}`)
}

const bound = compose(
  bindHandler([getNameEffect, () => 'John Snow']),
  bindHandler([getNameEffect, () => perform('getName').toUpperCase()]),
)(sayName)

bound('Arya') // Hello Arya
bound() // Hello JOHN SNOW
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

```ts
import { perform, bindHandler } from 'performative-ts'
import type { EffectName } from 'performative-ts'

export type Theme = {
  primaryColor: string
}

const getThemeEffect: EffectName<() => Theme> = Symbol('getThemeEff')

export function useTheme() {
  return perform(getThemeEffect)
}

export function provideTheme<C extends Function>(theme: Theme, Component: C): C {
  // for better typings with typescript, youy can provide handlers as tuples : [EffectName, EffectHandler]
  return bindHandler([getThemeEffect, () => theme], Component)
}


// ---
type Flag = 'debug' | 'error'
type LogFunction = (flag: Flag, value: string) => void

const logEffect: EffectName<LogFunction> = Symbol('log')

export function log(flag: Flag, value: string) {
  return perform(logEffect, flag, value)
}

export function provideLogger<C extends Function>(logFunction: LogFunction, Component: C): C {
  return bindHandler([logEffect, logFunction], Component)
}
```

## API reference

### perform

`perform(effectName, ...args): effectResult or throws`

Performs a effect and return its result. Throws if the corresponding effect handler is not declared during its execution.

`performOrFailSilently(effectName, ...args): effectResult | undefined`

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

Binds effect handlers functions to the provided function.

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
