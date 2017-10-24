import {applyMiddleware, createStore} from 'redux'
//import logger , {createLogger} from "redux-logger"

import {reducers} from './reducers'

//const middleware = applyMiddleware(logger)

//middleware = applyMiddleware()

let store = createStore(reducers)

export default store