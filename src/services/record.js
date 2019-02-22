import session from './base';
import { FETCHING_RECORDS, RECORDS_FETCHED } from "../constants";
import User from './user'

class RecordService {
  constructor(session) {
    this.session = session
  }

  get(project_name) {
    return async dispatch => {
      dispatch({
        type: FETCHING_RECORDS
      })
    try {
      const { data } = await this.session.get(`/records?project_name=${project_name}`)
      dispatch({
        type: RECORDS_FETCHED,
        payload: data
      })
    } catch (error) {
      const { response } = error
        dispatch(User.logout())
    }
  }
  }
}

const Record = new RecordService(session)
export default Record;