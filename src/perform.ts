import { captureFrame, withFrame } from './frame'
import { EffectName, HandlerFunction } from './types'

export function perform<R, Args extends unknown[] = []>(
  name: EffectName<HandlerFunction<R, Args>>,
  ...args: Args
): R {
  const handler = resolveHandlerFunction(name)
  if (handler === NOT_FOUND) {
    throw new Error(`Unknown handler for ${name.toString()} in current frame`)
  }
  return handler(...args)
}

export function performSafe<R, Args extends unknown[] = []>(
  name: EffectName<HandlerFunction<R, Args>>,
  ...args: Args
): R | undefined {
  const handler = resolveHandlerFunction(name)
  if (handler === NOT_FOUND) {
    return undefined
  }
  return handler(...args)
}

const NOT_FOUND = Symbol('HANDLER_NOT_FOUND')
function resolveHandlerFunction<T extends HandlerFunction>(
  name: EffectName<T>,
): T | typeof NOT_FOUND
function resolveHandlerFunction<T extends HandlerFunction>(
  name: EffectName<T>,
  defaultValue: T,
): T
function resolveHandlerFunction<T extends HandlerFunction>(
  name: EffectName<T>,
  defaultValue?: T,
) {
  const origin = captureFrame()
  if ((name as string) in origin.handler) {
    return withFrame(origin.parent, origin.handler[name as string])
  }

  let current = origin.parent
  while (current) {
    const ctx = current.handler
    if ((name as string) in ctx) {
      return withFrame(current.parent, ctx[name as string])
    }
    current = current.parent
  }

  if (defaultValue !== undefined) {
    return defaultValue
  }

  return NOT_FOUND
}
