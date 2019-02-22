import { createStore, combineReducers, applyMiddleware } from 'redux'
import { reducer as formReducer } from 'redux-form'
import user from './user'
import project from './project'
import record from './record'

import logger from 'redux-logger'
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  user,
  project,
  record,
  form: formReducer
})

const store = createStore(rootReducer,  applyMiddleware(logger, thunk)
)

export default store;