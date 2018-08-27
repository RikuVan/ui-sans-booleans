import { combineReducers } from "redux"
import Event from "./Event"

const eventReducer = (
  state = {
    event: Event.NotAsked
  },
  action
) => {
  console.log(action)
  switch (action.type) {
    case "FETCH_EVENT":
      return { event: Event.Loading }
    case "FETCH_EVENT_COMPLETE":
      return { event: action.payload }
    default:
      return state
  }
}

export default combineReducers({
  event: eventReducer
})
