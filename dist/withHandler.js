"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withHandler = void 0;
const frame_1 = require("./frame");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function withHandler(...args) {
    if (args.length === 3) {
        const [effectName, handlerFunction, func] = args;
        return frame_1.withFrame(frame_1.useFrame().withHandler({ [effectName]: handlerFunction }), func);
    }
    if (args.length === 2) {
        const [handlerObj, func] = args;
        return frame_1.withFrame(frame_1.useFrame().withHandler(handlerObj), func);
    }
    throw new Error('Wrong number of arguments');
}
exports.withHandler = withHandler;
//# sourceMappingURL=withHandler.js.map