import { createStore, applyMiddleware } from "redux"

import { createEpicMiddleware } from "redux-observable"

import { createLogger } from "redux-logger"

import reducer from "./reducers"

import rootEpic from "./epics"

// store

const epicMiddleware = createEpicMiddleware(rootEpic)

const loggerMiddleware = createLogger()

export default () =>
  createStore(reducer, applyMiddleware(epicMiddleware, loggerMiddleware))
