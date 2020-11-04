import { bindHandler, perform, EffectName, withHandler } from './index'

const CTX: EffectName<() => number> = Symbol('test-ctx')

test('provides context 1 level deep', () => {
  const handlerFunc = () => 1
  const App = () => {
    const resolved = perform(CTX)
    expect(resolved).toEqual(handlerFunc())
    return {}
  }

  bindHandler({ [CTX as symbol]: handlerFunc }, App)()
  bindHandler([CTX, handlerFunc], App)()
  withHandler([CTX, handlerFunc], App)
})

test('cleans up after execution', () => {
  const handlerFunc = () => 1
  withHandler([CTX, handlerFunc], () => {})
  expect(() => perform(CTX)).toThrow()
})

test('context can be overridden', () => {
  const handlerFunc1 = () => 1
  const handlerFunc2 = () => 2
  const App = () => {
    const resolved = perform<number>(CTX)
    expect(resolved).toEqual(handlerFunc1())
    withHandler({ [CTX as symbol]: handlerFunc2 }, Component)
  }
  const Component = () => {
    const resolved = perform(CTX)
    expect(resolved).toEqual(handlerFunc2())
    return {}
  }

  withHandler({ [CTX as symbol]: handlerFunc1 }, App)
})

test('context is preserved for handler execution', () => {
  const App = () => {
    bindHandler({ [CTX as symbol]: () => perform(CTX) + 1 }, Component)()
  }
  const Component = () => {
    expect(perform(CTX)).toEqual(2)
    return {}
  }

  withHandler({ [CTX as symbol]: () => 1 }, App)
})

test('is curried', () => {
  const main = (x: string) => {
    expect(perform(CTX)).toEqual(1)
    return x
  }

  const binder = bindHandler([CTX, () => 1])

  expect(typeof binder).toEqual('function')
  expect(typeof binder(main)).toEqual('function')
  expect(binder(main)('A')).toEqual('A')
})

test('composes (1)', () => {
  const main = (x: string) => {
    expect(perform(CTX)).toEqual(2)
    return x
  }

  const result = bindHandler(
    [CTX, () => 1],
    bindHandler([CTX, () => perform(CTX) * 2], main),
  )

  expect(result('A')).toEqual('A')
})

test('composes (2)', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const compose = (...fns: any[]) => (x: any) =>
    fns.reduceRight((v, f) => f(v), x)

  const main = (x: string) => {
    expect(perform(CTX)).toEqual(2)
    return x
  }

  const result = compose(
    bindHandler([CTX, () => 1]),
    bindHandler([CTX, () => perform(CTX) * 2]),
  )(main)

  expect(result('A')).toEqual('A')
})
