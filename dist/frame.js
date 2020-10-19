"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withFrame = exports.runWithFrame = exports.useFrame = void 0;
let currentFrame = createFrame();
function createFrame(parent = null, handler = {}) {
    const frame = {
        parent,
        handler,
        withHandler(childHandler) {
            return createFrame(frame, childHandler);
        },
    };
    return frame;
}
function useFrame() {
    return currentFrame;
}
exports.useFrame = useFrame;
function runWithFrame(frame, exec) {
    const frameBefore = currentFrame;
    if (frame) {
        currentFrame = frame;
    }
    try {
        return exec();
    }
    finally {
        currentFrame = frameBefore;
    }
}
exports.runWithFrame = runWithFrame;
function withFrame(frame, func) {
    return (...args) => runWithFrame(frame, () => func(...args));
}
exports.withFrame = withFrame;
//# sourceMappingURL=frame.js.map