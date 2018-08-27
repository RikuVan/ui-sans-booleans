import { Component } from "react"
import { connect } from "react-redux"
import { fetchEvent } from "../actions"
import R from "ramda"
import Event from "../Event"

class EventConsumer extends Component {
  foldIntoView(event, map = v => v, renderers) {
    const {
      renderNotAsked,
      renderLoading,
      renderFailure,
      renderOpenEvent,
      renderOpenEventWithRegistration,
      renderClosedEvent,
      renderClosedEventWithFeedback,
      renderNoEvent
    } = renderers
    return event.case({
      NotAsked: () => {
        this.props.fetchEvent()
        return this.rendererOrNull(renderNotAsked)
      },
      Loading: () => this.rendererOrNull(renderLoading),
      Failure: () => this.rendererOrNull(renderFailure),
      OpenEvent: data => this.rendererOrNull(renderOpenEvent, map(data)),
      OpenEventWithRegistration: data =>
        this.rendererOrNull(renderOpenEventWithRegistration, map(data)),
      ClosedEvent: data => this.rendererOrNull(renderClosedEvent, map(data)),
      ClosedEventWithFeedback: data =>
        this.rendererOrNull(
          [renderClosedEventWithFeedback, renderClosedEvent],
          map(data)
        ),
      NoEvent: () => this.rendererOrNull(renderNoEvent)
    })
  }

  rendererOrNull(renderer, data) {
    if (typeof renderer === "function") {
      return renderer(data)
    }
    if (Array.isArray(renderer)) {
      return R.reduceWhile(
        R.isNil,
        (acc, r) => acc || this.rendererOrNull(r, data),
        null,
        renderer
      )
    }
    return null
  }

  render() {
    const { event, map, ...rest } = this.props
    return this.foldIntoView(event, map, rest)
  }
}

export default connect(
  ({ event }) => event,
  { fetchEvent: fetchEvent.request }
)(EventConsumer)
