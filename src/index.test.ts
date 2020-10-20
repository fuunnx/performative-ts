import { withHandler, perform, EffectName } from './index'

const CTX: EffectName<() => number> = Symbol('test-ctx')

test('provides context 1 level deep', () => {
  const handlerFunc = () => 1
  const App = () => {
    const resolved = perform(CTX)
    expect(resolved).toEqual(handlerFunc())
    return {}
  }
  withHandler({ [CTX as symbol]: handlerFunc }, App)()
  withHandler([CTX, handlerFunc], App)()
})

test('cleans up after execution', () => {
  const handlerFunc = () => 1
  withHandler([CTX, handlerFunc], () => {})()
  expect(() => perform(CTX)).toThrow()
})

test('context can be overridden', () => {
  const handlerFunc1 = () => 1
  const handlerFunc2 = () => 2
  const App = () => {
    const resolved = perform<number>(CTX)
    expect(resolved).toEqual(handlerFunc1())
    withHandler({ [CTX as symbol]: handlerFunc2 }, Component)()
  }
  const Component = () => {
    const resolved = perform(CTX)
    expect(resolved).toEqual(handlerFunc2())
    return {}
  }

  withHandler({ [CTX as symbol]: handlerFunc1 }, App)()
})

test('context is preserved for handler execution', () => {
  const App = () => {
    withHandler({ [CTX as symbol]: () => perform(CTX) + 1 }, Component)()
  }
  const Component = () => {
    expect(perform(CTX)).toEqual(2)
    return {}
  }

  withHandler({ [CTX as symbol]: () => 1 }, App)()
})
