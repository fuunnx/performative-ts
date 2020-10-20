import type { Frame, Handler } from './types'

let currentFrame: Frame = createFrame()

function createFrame(
  parent: Frame | null = null,
  handler: Handler = {},
): Frame {
  const frame: Frame = {
    parent,
    handler,
    withHandler(childHandler: Handler) {
      return createFrame(frame, childHandler)
    },
  }

  return frame
}

export function captureFrame(): Frame {
  return currentFrame
}

export function runWithFrame<T>(frame: Frame | null, exec: () => T): T {
  const frameBefore = currentFrame
  if (frame) {
    currentFrame = frame
  }

  try {
    return exec()
  } finally {
    currentFrame = frameBefore
  }
}

export function withFrame<Args extends unknown[], R = []>(
  frame: Frame | null,
  func: (...args: Args) => R,
): (...args: Args) => R {
  return (...args: Args) => runWithFrame(frame, () => func(...args))
}
