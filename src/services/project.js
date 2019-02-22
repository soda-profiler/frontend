import session from "./base";
import { PROJECT_CREATING, PROJECT_CREATED, FETCHING_PROJECTS, PROJECTS_FETCHED, SELECT_PROJECT } from "../constants";
import { instanceOf } from "prop-types";

import User from './user'
import Record from './record'

class ProjectService {
  constructor(session) {
    this.session = session;
  }

  get(...args) {
    return async dispatch => {
      dispatch({
        type: FETCHING_PROJECTS
      })
    try {
      const { data } = await this.session.get("/projects")
      dispatch({
        type: PROJECTS_FETCHED,
        payload: data
      })

      if (data.length > 0) {
        const first_project = data[0]
        dispatch(this.select(first_project.name ))
      }
    } catch (error) {
      const { response } = error
      
        dispatch(User.logout())
   
    }
  }
  }

  select(project_name) {
    return async dispatch => {
      dispatch({
        type: SELECT_PROJECT,
        payload: project_name
      });

      try {
        
        dispatch(Record.get(project_name))
      
      } catch (error) {
        const { status } = error.response
        if (status == 403) {
          const { response } = error
          dispatch(User.logout())
     
        }
      }
    };
  }

  create(name) {
    return async dispatch => {
      dispatch({
        type: PROJECT_CREATING
      });

      try {
        const { data } = await this.session.post("/projects", {
          name
        })
        dispatch({
          type: PROJECT_CREATED,
          payload: data
        });
      
      } catch (error) {
        const { status } = error.response
        if (status == 403) {
          const { response } = error
          dispatch(User.logout())
     
        }
      }
    };
  }
}

const Project = new ProjectService(session);
export default Project;
