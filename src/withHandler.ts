import { captureFrame, withFrame } from './frame'
import type { Handler, HandlerFunction, HandlerTuple } from './types'

type AnyFunction<R, Args extends unknown[] = []> = (...args: Args) => R

export function bindHandler<R, Args extends unknown[] = []>(
  handlerObj: Handler,
  func: AnyFunction<R, Args>,
): (...args: Args) => R

export function bindHandler<
  A extends HandlerFunction,
  R,
  Args extends unknown[] = []
>(
  handlerTuple: HandlerTuple<A>,
  func: AnyFunction<R, Args>,
): (...args: Args) => R

export function bindHandler<
  A extends HandlerFunction,
  B extends HandlerFunction,
  R,
  Args extends unknown[] = []
>(
  handlerTupleA: HandlerTuple<A>,
  handlerTupleB: HandlerTuple<B>,
  func: AnyFunction<R, Args>,
): (...args: Args) => R

export function bindHandler<
  A extends HandlerFunction,
  B extends HandlerFunction,
  C extends HandlerFunction,
  R,
  Args extends unknown[] = []
>(
  handlerTupleA: HandlerTuple<A>,
  handlerTupleB: HandlerTuple<B>,
  handlerTupleC: HandlerTuple<C>,
  func: AnyFunction<R, Args>,
): (...args: Args) => R

export function bindHandler<
  A extends HandlerFunction,
  B extends HandlerFunction,
  C extends HandlerFunction,
  D extends HandlerFunction,
  R,
  Args extends unknown[] = []
>(
  handlerTupleA: HandlerTuple<A>,
  handlerTupleB: HandlerTuple<B>,
  handlerTupleC: HandlerTuple<C>,
  handlerTupleD: HandlerTuple<D>,
  func: AnyFunction<R, Args>,
): (...args: Args) => R

export function bindHandler<
  A extends HandlerFunction,
  B extends HandlerFunction,
  C extends HandlerFunction,
  D extends HandlerFunction,
  E extends HandlerFunction,
  R,
  Args extends unknown[] = []
>(
  handlerTupleA: HandlerTuple<A>,
  handlerTupleB: HandlerTuple<B>,
  handlerTupleC: HandlerTuple<C>,
  handlerTupleD: HandlerTuple<D>,
  handlerTupleE: HandlerTuple<E>,
  func: AnyFunction<R, Args>,
): (...args: Args) => R

export function bindHandler<
  A extends HandlerFunction,
  B extends HandlerFunction,
  C extends HandlerFunction,
  D extends HandlerFunction,
  E extends HandlerFunction,
  F extends HandlerFunction,
  R,
  Args extends unknown[] = []
>(
  handlerTupleA: HandlerTuple<A>,
  handlerTupleB: HandlerTuple<B>,
  handlerTupleC: HandlerTuple<C>,
  handlerTupleD: HandlerTuple<D>,
  handlerTupleE: HandlerTuple<E>,
  handlerTupleF: HandlerTuple<F>,
  func: AnyFunction<R, Args>,
): (...args: Args) => R

export function bindHandler<
  A extends HandlerFunction,
  B extends HandlerFunction,
  C extends HandlerFunction,
  D extends HandlerFunction,
  E extends HandlerFunction,
  F extends HandlerFunction,
  G extends HandlerFunction,
  R,
  Args extends unknown[] = []
>(
  handlerTupleA: HandlerTuple<A>,
  handlerTupleB: HandlerTuple<B>,
  handlerTupleC: HandlerTuple<C>,
  handlerTupleD: HandlerTuple<D>,
  handlerTupleE: HandlerTuple<E>,
  handlerTupleF: HandlerTuple<F>,
  handlerTupleG: HandlerTuple<G>,
  func: AnyFunction<R, Args>,
): (...args: Args) => R

export function bindHandler<R, Args extends unknown[] = []>(
  handlerObj: Handler,
): (func: AnyFunction<R, Args>) => (...args: Args) => R

export function bindHandler<A extends HandlerFunction>(
  handlerTuple: HandlerTuple<A>,
): <R, Args extends unknown[] = []>(
  func: AnyFunction<R, Args>,
) => (...args: Args) => R

export function bindHandler<
  A extends HandlerFunction,
  B extends HandlerFunction
>(
  handlerTupleA: HandlerTuple<A>,
  handlerTupleB: HandlerTuple<B>,
): <R, Args extends unknown[] = []>(
  func: AnyFunction<R, Args>,
) => (...args: Args) => R

export function bindHandler<
  A extends HandlerFunction,
  B extends HandlerFunction,
  C extends HandlerFunction
>(
  handlerTupleA: HandlerTuple<A>,
  handlerTupleB: HandlerTuple<B>,
  handlerTupleC: HandlerTuple<C>,
): <R, Args extends unknown[] = []>(
  func: AnyFunction<R, Args>,
) => (...args: Args) => R

export function bindHandler<
  A extends HandlerFunction,
  B extends HandlerFunction,
  C extends HandlerFunction,
  D extends HandlerFunction
>(
  handlerTupleA: HandlerTuple<A>,
  handlerTupleB: HandlerTuple<B>,
  handlerTupleC: HandlerTuple<C>,
  handlerTupleD: HandlerTuple<D>,
): <R, Args extends unknown[] = []>(
  func: AnyFunction<R, Args>,
) => (...args: Args) => R

export function bindHandler<
  A extends HandlerFunction,
  B extends HandlerFunction,
  C extends HandlerFunction,
  D extends HandlerFunction,
  E extends HandlerFunction
>(
  handlerTupleA: HandlerTuple<A>,
  handlerTupleB: HandlerTuple<B>,
  handlerTupleC: HandlerTuple<C>,
  handlerTupleD: HandlerTuple<D>,
  handlerTupleE: HandlerTuple<E>,
): <R, Args extends unknown[] = []>(
  func: AnyFunction<R, Args>,
) => (...args: Args) => R

export function bindHandler<
  A extends HandlerFunction,
  B extends HandlerFunction,
  C extends HandlerFunction,
  D extends HandlerFunction,
  E extends HandlerFunction,
  F extends HandlerFunction
>(
  handlerTupleA: HandlerTuple<A>,
  handlerTupleB: HandlerTuple<B>,
  handlerTupleC: HandlerTuple<C>,
  handlerTupleD: HandlerTuple<D>,
  handlerTupleE: HandlerTuple<E>,
  handlerTupleF: HandlerTuple<F>,
): <R, Args extends unknown[] = []>(
  func: AnyFunction<R, Args>,
) => (...args: Args) => R

export function bindHandler<
  A extends HandlerFunction,
  B extends HandlerFunction,
  C extends HandlerFunction,
  D extends HandlerFunction,
  E extends HandlerFunction,
  F extends HandlerFunction,
  G extends HandlerFunction
>(
  handlerTupleA: HandlerTuple<A>,
  handlerTupleB: HandlerTuple<B>,
  handlerTupleC: HandlerTuple<C>,
  handlerTupleD: HandlerTuple<D>,
  handlerTupleE: HandlerTuple<E>,
  handlerTupleF: HandlerTuple<F>,
  handlerTupleG: HandlerTuple<G>,
): <R, Args extends unknown[] = []>(
  func: AnyFunction<R, Args>,
) => (...args: Args) => R

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function bindHandler(...args: any[]): any {
  const [handlerObj, func] = guessArgs(args)

  if (!func) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return bindHandler.bind(null, handlerObj as any)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...funcArgs: any[]) =>
    withFrame(captureFrame().withHandler(handlerObj), () => func(...funcArgs))
}

export function withHandler<R>(handlerObj: Handler, func: AnyFunction<R, []>): R

export function withHandler<A extends HandlerFunction, R>(
  handlerTuple: HandlerTuple<A>,
  func: AnyFunction<R, []>,
): R

export function withHandler<
  A extends HandlerFunction,
  B extends HandlerFunction,
  R
>(
  handlerTupleA: HandlerTuple<A>,
  handlerTupleB: HandlerTuple<B>,
  func: AnyFunction<R, []>,
): R

export function withHandler<
  A extends HandlerFunction,
  B extends HandlerFunction,
  C extends HandlerFunction,
  R
>(
  handlerTupleA: HandlerTuple<A>,
  handlerTupleB: HandlerTuple<B>,
  handlerTupleC: HandlerTuple<C>,
  func: AnyFunction<R, []>,
): R

export function withHandler<
  A extends HandlerFunction,
  B extends HandlerFunction,
  C extends HandlerFunction,
  D extends HandlerFunction,
  R
>(
  handlerTupleA: HandlerTuple<A>,
  handlerTupleB: HandlerTuple<B>,
  handlerTupleC: HandlerTuple<C>,
  handlerTupleD: HandlerTuple<D>,
  func: AnyFunction<R, []>,
): R

export function withHandler<
  A extends HandlerFunction,
  B extends HandlerFunction,
  C extends HandlerFunction,
  D extends HandlerFunction,
  E extends HandlerFunction,
  R
>(
  handlerTupleA: HandlerTuple<A>,
  handlerTupleB: HandlerTuple<B>,
  handlerTupleC: HandlerTuple<C>,
  handlerTupleD: HandlerTuple<D>,
  handlerTupleE: HandlerTuple<E>,
  func: AnyFunction<R, []>,
): R

export function withHandler<
  A extends HandlerFunction,
  B extends HandlerFunction,
  C extends HandlerFunction,
  D extends HandlerFunction,
  E extends HandlerFunction,
  F extends HandlerFunction,
  R
>(
  handlerTupleA: HandlerTuple<A>,
  handlerTupleB: HandlerTuple<B>,
  handlerTupleC: HandlerTuple<C>,
  handlerTupleD: HandlerTuple<D>,
  handlerTupleE: HandlerTuple<E>,
  handlerTupleF: HandlerTuple<F>,
  func: AnyFunction<R, []>,
): R

export function withHandler<
  A extends HandlerFunction,
  B extends HandlerFunction,
  C extends HandlerFunction,
  D extends HandlerFunction,
  E extends HandlerFunction,
  F extends HandlerFunction,
  G extends HandlerFunction,
  R
>(
  handlerTupleA: HandlerTuple<A>,
  handlerTupleB: HandlerTuple<B>,
  handlerTupleC: HandlerTuple<C>,
  handlerTupleD: HandlerTuple<D>,
  handlerTupleE: HandlerTuple<E>,
  handlerTupleF: HandlerTuple<F>,
  handlerTupleG: HandlerTuple<G>,
  func: AnyFunction<R, []>,
): R

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withHandler(...args: any[]): any {
  const [handlerObj, func] = guessArgs(args)

  if (!func) {
    throw new Error('Please provide a computation as last argument')
  }

  return withFrame(captureFrame().withHandler(handlerObj), func)
}

function guessArgs(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: any[],
): [Handler, AnyFunction<unknown, unknown[]> | undefined] {
  const lastArg = args[args.length - 1]
  if (typeof lastArg !== 'function') {
    return [constructHandler(args), undefined]
  }

  const func = args.pop()
  return [constructHandler(args), func]
}

function constructHandler(
  tuples: [Handler] | HandlerTuple<HandlerFunction>[],
): Handler {
  if (!Array.isArray(tuples[0])) {
    return tuples[0]
  }

  return (tuples as HandlerTuple<HandlerFunction>[]).reduce<Handler>(
    (acc, [name, handlerFunc]) => {
      acc[name as string] = handlerFunc
      return acc
    },
    {},
  )
}
