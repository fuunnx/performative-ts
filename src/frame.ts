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

export function useFrame(): Frame {
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

export function withFrame<T extends unknown[], U>(
  frame: Frame | null,
  func: (...args: T) => U,
): (...args: T) => U {
  return (...args: T) => runWithFrame(frame, () => func(...args))
}
