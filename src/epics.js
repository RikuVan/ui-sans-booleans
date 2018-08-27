import { combineEpics, ofType } from "redux-observable"
import { ajax } from "rxjs/ajax"
import { of } from "rxjs"
import { delay } from "rxjs/operators"
import { map, switchMap, catchError } from "rxjs/operators"
import { fetchEvent } from "./actions"
import Event from "./Event"

import isWithinRange from "date-fns/is_within_range"
import isBefore from "date-fns/is_before"
import addHours from "date-fns/add_hours"

const getIsEventOpen = ({ datetime }) =>
  isBefore(new Date(), addHours(datetime, 24))

const getIsRegistrationOpen = event => {
  if (event.registrationOpens) {
    const endDate = event.registrationCloses
      ? event.registrationCloses
      : new Date(8640000000000000)
    return isWithinRange(new Date(), event.registrationOpens, endDate)
  }
  return false
}

const mapToEvent = ({ data }) => {
  const event = data.currentEvent
  console.log(data)
  if (!data.currentEvent) {
    return Event.NoEvent
  }
  if (data.feedbackOpen) {
    return Event.ClosedEventWithFeedback(event)
  } else if (getIsEventOpen(event) && getIsRegistrationOpen(event)) {
    return Event.OpenEventWithRegistration(event)
  } else if (getIsEventOpen(event)) {
    return Event.OpenEvent(event)
  }
  return Event.ClosedEvent(event)
}

const URL =
  "https://us-central1-wds-event-dev.cloudfunctions.net/api/events/current"

const getEventEpic = action$ =>
  action$.pipe(
    ofType("FETCH_EVENT"),
    switchMap(a =>
      ajax.getJSON(URL).pipe(
        delay(1000),
        map(mapToEvent),
        map(fetchEvent.complete),
        catchError(error =>
          of({
            type: "FETCH_EVENT_COMPLETE",
            payload: Event.Failure(error)
          })
        )
      )
    )
  )

const rootEpic = combineEpics(getEventEpic)

export default rootEpic
