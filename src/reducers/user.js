import * as constants from '../constants'

const initialState = {
  token: null,
  isLoading: false
}

export default function user(state = initialState, { type, payload }) {
  switch (type) {
    case constants.USER_LOGGING_IN:
      return { ...initialState, isLoading: true }
    case constants.USER_LOGGED_IN:
      return { token: payload, isLoading: false }
    case constants.USER_LOGGED_OUT:
      return initialState
    default:
      return state
  }
}
