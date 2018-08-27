import * as React from "react"
import ErrorBoundary from "react-error-boundary"
import Fallback from "./Fallback"
const isArray = Array.isArray
const isFunction = v => typeof v === "function"

class Maybe {
  static of(value) {
    return new Maybe(value)
  }

  constructor(value) {
    this.value = value
  }

  isNothing() {
    return this.value == null
  }

  map(fn) {
    try {
      const newValue = this.isNothing() ? null : fn(this.value)
      return Maybe.of(newValue)
    } catch (e) {
      console.error(
        "MaybeData: blew up when mapping--maybe you tried to mutate?"
      )
      return Maybe.of(this.value)
    }
  }

  mapAll(fnList) {
    if (isArray(fnList)) {
      return fnList.reduce(
        (prevValue, currVal) =>
          isFunction(currVal) ? prevValue.map(currVal) : prevValue,
        this
      )
    } else if (isFunction(fnList)) {
      return this.map(fnList)
    }
    return this
  }

  fold(render) {
    return this.isNothing() ? null : render(this.value)
  }
}

const MaybeComponent = ({ of, map, render }) =>
  Maybe.of(of)
    .mapAll(map)
    .fold(render)

export default props => (
  <ErrorBoundary FallbackComponent={Fallback}>
    <MaybeComponent {...props} />
  </ErrorBoundary>
)
