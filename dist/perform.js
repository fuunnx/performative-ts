"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.performSafe = exports.perform = void 0;
const frame_1 = require("./frame");
function perform(name, ...args) {
    const handler = resolveHandlerFunction(name);
    if (handler === NOT_FOUND) {
        throw new Error(`Unknown handler for ${name.toString()} in current frame`);
    }
    return handler(...args);
}
exports.perform = perform;
function performSafe(name, ...args) {
    const handler = resolveHandlerFunction(name);
    if (handler === NOT_FOUND) {
        return undefined;
    }
    return handler(...args);
}
exports.performSafe = performSafe;
const NOT_FOUND = Symbol('HANDLER_NOT_FOUND');
function resolveHandlerFunction(name, defaultValue) {
    const origin = frame_1.useFrame();
    if (name in origin.handler) {
        return frame_1.withFrame(origin.parent, origin.handler[name]);
    }
    let current = origin.parent;
    while (current) {
        const ctx = current.handler;
        if (name in ctx) {
            return frame_1.withFrame(current.parent, ctx[name]);
        }
        current = current.parent;
    }
    if (defaultValue !== undefined) {
        return defaultValue;
    }
    return NOT_FOUND;
}
//# sourceMappingURL=perform.js.map