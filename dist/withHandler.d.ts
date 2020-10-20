import type { EffectName, Handler, HandlerFunction } from './types';
export declare function withHandler<R, Args extends unknown[] = []>(handlerObj: Handler, func: (...args: Args) => R): (...args: Args) => R;
export declare function withHandler<T extends HandlerFunction, R, Args extends unknown[] = []>(effectName: EffectName<T>, handlerFunction: T, func: (...args: Args) => R): (...args: Args) => R;
