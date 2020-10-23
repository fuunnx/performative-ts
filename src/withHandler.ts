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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function bindHandler(...args: any[]): any {
  const [handlerObj, func] = guessArgs(args)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...funcArgs: any[]) =>
    withFrame(captureFrame().withHandler(handlerObj), () => func(...funcArgs))
}

export function withHandler<R>(
  handlerObj: Handler,
  func: AnyFunction<R, []>,
): () => R

export function withHandler<A extends HandlerFunction, R>(
  handlerTuple: HandlerTuple<A>,
  func: AnyFunction<R, []>,
): () => R

export function withHandler<
  A extends HandlerFunction,
  B extends HandlerFunction,
  R
>(
  handlerTupleA: HandlerTuple<A>,
  handlerTupleB: HandlerTuple<B>,
  func: AnyFunction<R, []>,
): () => R

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
): () => R

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
): () => R

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
): () => R

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
): () => R

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
): () => R

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withHandler(...args: any[]): any {
  const [handlerObj, func] = guessArgs(args)

  return withFrame(captureFrame().withHandler(handlerObj), func)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function guessArgs(args: any[]): [Handler, AnyFunction<unknown, unknown[]>] {
  if (args.length === 2 && !Array.isArray(args[0])) {
    // an handler object is given as first argument
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    return args as [Handler, AnyFunction<unknown, unknown[]>]
  } else {
    // multiple handler tuples are given as arguments
    const func = args.pop()

    const tuples: HandlerTuple<HandlerFunction>[] = args
    const handlerObj = tuples.reduce<Handler>((acc, [name, handlerFunc]) => {
      acc[name as string] = handlerFunc
      return acc
    }, {})

    return [handlerObj, func]
  }
}
