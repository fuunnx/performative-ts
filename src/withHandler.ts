import { withFrame, useFrame } from './frame'
import type { EffectName, Handler, HandlerFunction } from './types'

export function withHandler<
  T extends HandlerFunction,
  R,
  Args extends unknown[] = []
>(
  effectName: EffectName<T>,
  handlerFunction: T,
  func: (...args: Args) => R,
): (...args: Args) => R

export function withHandler<R, Args extends unknown[] = []>(
  handlerObj: Handler,
  func: (...args: Args) => R,
): (...args: Args) => R

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withHandler(...args: any[]): any {
  if (args.length === 3) {
    const [effectName, handlerFunction, func] = args
    return withFrame(
      useFrame().withHandler({ [effectName]: handlerFunction }),
      func,
    )
  }

  if (args.length === 2) {
    const [handlerObj, func] = args
    return withFrame(useFrame().withHandler(handlerObj), func)
  }

  throw new Error('Wrong number of arguments')
}
