import { withFrame, captureFrame } from './frame'
import type { Handler, HandlerFunction, HandlerTuple } from './types'

type AnyFunction<R, Args extends unknown[] = []> = (...args: Args) => R

export function withHandler<R, Args extends unknown[] = []>(
  handlerObj: Handler,
  func: AnyFunction<R, Args>,
): (...args: Args) => R

export function withHandler<
  A extends HandlerFunction,
  R,
  Args extends unknown[] = []
>(
  handlerTuple: HandlerTuple<A>,
  func: AnyFunction<R, Args>,
): (...args: Args) => R

export function withHandler<
  A extends HandlerFunction,
  B extends HandlerFunction,
  R,
  Args extends unknown[] = []
>(
  handlerTupleA: HandlerTuple<A>,
  handlerTupleB: HandlerTuple<B>,
  func: AnyFunction<R, Args>,
): (...args: Args) => R

export function withHandler<
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

export function withHandler<
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

export function withHandler<
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

export function withHandler<
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

export function withHandler<
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
export function withHandler(...args: any[]): any {
  // an object is passed as first argument
  if (args.length === 2 && !Array.isArray(args[0])) {
    const [handlerObj, func] = args
    return withFrame(captureFrame().withHandler(handlerObj), func)
  }

  // multiple tuples are passed
  const func: AnyFunction<unknown, unknown[]> = args.pop()
  const tuples: HandlerTuple<HandlerFunction>[] = args
  const handlerObj = tuples.reduce<Handler>((acc, [name, handlerFunc]) => {
    acc[name as string] = handlerFunc
    return acc
  }, {})

  return withFrame(captureFrame().withHandler(handlerObj), func)
}
