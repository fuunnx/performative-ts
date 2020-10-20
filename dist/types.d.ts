interface BrandedEffectName<T extends HandlerFunction> extends Symbol {
}
export declare type EffectName<T extends HandlerFunction = () => unknown> = symbol | string | number | BrandedEffectName<T>;
export declare type KeyableEffectName = symbol | string | number;
export declare type HandlerFunction<R = any, Args extends any[] = any[]> = (...args: Args) => R;
export declare type Handler = Record<KeyableEffectName, HandlerFunction>;
export declare type HandlerTuple<T extends HandlerFunction> = [EffectName<T>, T];
export declare type Frame = {
    parent: Frame | null;
    handler: Handler;
    withHandler(handler: Handler): Frame;
};
export {};
