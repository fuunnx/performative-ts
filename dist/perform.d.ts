import { EffectName, HandlerFunction } from './types';
export declare function perform<R, Args extends unknown[] = []>(name: EffectName<HandlerFunction<R, Args>>, ...args: Args): R;
export declare function performSafe<R, Args extends unknown[] = []>(name: EffectName<HandlerFunction<R, Args>>, ...args: Args): R | undefined;
