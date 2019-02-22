import * as constants from '../constants'

const initialState = {
  currentProject: undefined,  
  projects: [],
  isCreating: false,
  isFetching: false
}
 
export default function project(state = initialState, { type, payload }) {
  switch (type) {
    case constants.PROJECT_CREATING:
      return { ...initialState, isCreating: true }
    case constants.PROJECT_CREATED:
      return { currentProject: payload, isCreating: false }
    case constants.FETCHING_PROJECTS:
      return { ...state, isFetching: true }
    case constants.PROJECTS_FETCHED:
      return { ...state, projects: payload, isFetching: false }
    case constants.SELECT_PROJECT:
      return {...state, currentProject: payload }
    default:
      return state
  }
}
