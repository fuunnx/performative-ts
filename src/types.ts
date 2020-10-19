/* eslint-disable @typescript-eslint/no-empty-interface */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface BrandedEffectName<T extends HandlerFunction> extends Symbol {}

export type EffectName<T extends HandlerFunction = () => unknown> =
  | symbol
  | string
  | number
  | BrandedEffectName<T>

export type KeyableEffectName = symbol | string | number

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HandlerFunction<R = any, Args extends any[] = any[]> = (
  ...args: Args
) => R

export type Handler = Record<KeyableEffectName, HandlerFunction>

export type Frame = {
  parent: Frame | null
  handler: Handler
  withHandler(handler: Handler): Frame
}
