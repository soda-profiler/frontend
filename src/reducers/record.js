import * as constants from '../constants'

const initialState = {
  currentRecord: undefined,  
  records: [],
  isFetching: false
}
 
export default function record(state = initialState, { type, payload }) {
  switch (type) {
    case constants.FETCHING_RECORDS:
      return { ...state, isFetching: true }
    case constants.RECORDS_FETCHED:
      return { ...state, records: payload, isFetching: false }
    default:
    return state
  }
}
