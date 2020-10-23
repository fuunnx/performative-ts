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

export function withFrame<T>(frame: Frame | null, computation: () => T): T {
  const frameBefore = currentFrame
  if (frame) {
    currentFrame = frame
  }

  try {
    return computation()
  } finally {
    currentFrame = frameBefore
  }
}

export function bindFrame<Args extends unknown[], R = []>(
  frame: Frame | null,
  func: (...args: Args) => R,
): (...args: Args) => R {
  return (...args: Args) => withFrame(frame, () => func(...args))
}
