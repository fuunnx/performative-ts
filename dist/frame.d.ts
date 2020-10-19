import type { Frame } from './types';
export declare function useFrame(): Frame;
export declare function runWithFrame<T>(frame: Frame | null, exec: () => T): T;
export declare function withFrame<T extends unknown[], U>(frame: Frame | null, func: (...args: T) => U): (...args: T) => U;
