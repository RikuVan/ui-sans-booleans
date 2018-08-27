import React from "react"
import EventConsumer from "./EventConsumer"
import { Spinner } from "./Spinner"
import "./App.css"
import { Event } from "./Event"
import { Feedback } from "./Feedback"

const ClosedEvent = ({ event }) => (
  <section className="section">
    <Event event={event} />
    <div className="closed">-- CLOSED --</div>
  </section>
)

const ClosedEventWithFeedback = ({ event }) => (
  <React.Fragment>
    <ClosedEvent event={event} />
    <section className="section">
      <Feedback />
    </section>
  </React.Fragment>
)

const OpenEvent = ({ event }) => (
  <section className="section">
    <Event event={event} />
  </section>
)

const OpenEventWithRegistration = ({ event }) => (
  <React.Fragment>
    <OpenEvent event={event} />
    <section className="section">
      <button>REGISTER</button>
    </section>
  </React.Fragment>
)

class App extends React.Component {
  render() {
    return (
      <main className="main">
        <h3>An app without booleans</h3>
        <EventConsumer
          renderLoading={() => <Spinner />}
          renderOpenEvent={data => <OpenEvent event={data} />}
          renderOpenEventWithRegistration={data => (
            <OpenEventWithRegistration event={data} />
          )}
          renderClosedEvent={data => <ClosedEvent event={data} />}
          renderClosedEventWithFeedback={data => (
            <ClosedEventWithFeedback event={data} />
          )}
          renderFailure={error => (
            <div className="error">Sorry an error occurred: {error}</div>
          )}
          renderNoEvent={() => (
            <section>
              <h4>No coming event</h4>
              We will let you know when the next event is coming!
            </section>
          )}
        />
      </main>
    )
  }
}

export default App
