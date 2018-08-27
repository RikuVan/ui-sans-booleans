import * as React from "react"

export const Event = ({ event }) => (
  <div>
    <h4 className="underline">Next Event</h4>
    <p>{event.datetime}</p>
    <p>{event.location}</p>
    <p>{event.sponsor}</p>
  </div>
)
