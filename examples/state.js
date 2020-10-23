import { withHandler, perform } from '../src'
import { log, withLogPrefix } from './logger'

// --- library

const updateEff = Symbol('update')
const getEff = Symbol('get')

function setState(newState) {
  return perform(updateEff, () => newState)
}

function getState() {
  return perform(getEff)
}

function updateState(updateFn) {
  return perform(updateEff, updateFn)
}

function withState(state, computation) {
  const handler = {
    [getEff]() {
      return state
    },
    [updateEff](updateFn) {
      state = updateFn(state)
      return state
    },
  }
  const result = withHandler(handler, computation)
  return [state, result]
}

function withComputedState(lens, computation) {
  const handler = {
    [getEff]() {
      return lens.get(getState())
    },
    [updateEff](updateFun) {
      let currState = getState()

      return lens.get(
        setState(lens.set(currState, updateFun(lens.get(currState)))),
      )
    },
  }
  return withHandler(handler, computation)
}

function withLoggedStateChange(computation) {
  const handler = {
    [updateEff](updateFn) {
      const newState = updateState(updateFn)
      log('updated state to', newState)
      return newState
    },
  }
  return withHandler(handler, computation)
}

// --- userland

export default function main() {
  return withState(0, () => withLoggedStateChange(sub))
}

const farenheitLens = {
  get(celsiusTemp) {
    const farenheitTemp = celsiusTemp * 1.8 + 32
    return farenheitTemp
  },
  set(_, farenheitTemp) {
    const celsiusTemp = (farenheitTemp - 32) / 1.8
    return celsiusTemp
  },
}

function sub() {
  withLogPrefix('celsius', doTemperatureVariations)
  withLogPrefix('farenheit', () =>
    withComputedState(farenheitLens, doTemperatureVariations),
  )
}

function doTemperatureVariations() {
  log('before update', getState())
  updateState((x) => x + 1)
  log('after update', getState())
  setState(0)
  log('after reset', getState())
}
