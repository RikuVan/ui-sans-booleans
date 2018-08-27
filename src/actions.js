export const fetchEvent = {
  request: () => ({ type: "FETCH_EVENT" }),
  complete: payload => ({ type: "FETCH_EVENT_COMPLETE", payload })
}
