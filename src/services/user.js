import session from "./base";
import { USER_LOGGING_IN, USER_LOGGED_IN, USER_LOGGED_OUT } from "../constants";
import { Responsive } from "semantic-ui-react";
import history from '../history'

class UserService {
  constructor(session) {
    this.session = session;
  }

  checkAuth() {
    const token = localStorage.getItem('token')
    if(!token) {
      history.push('/welcome/')
    }
  }
  login(email, password) {
    return async dispatch => {
      dispatch(this.logout())
      dispatch({
        type: USER_LOGGING_IN
      })

      const { data } = await this.session.post("/auth", {
        email,
        password
      })
      
      const token = `Bearer ${data["access_token"]}`;
      localStorage.setItem('token', token)
      session.defaults.headers.common['Authorization'] = token

      dispatch({
        type: USER_LOGGED_IN,
        payload: token
      })
      history.push('/')

    }
  }
  singUp(email, password) {
    return this.session
      .post("/users", {
        email,
        password
      })
      .then(response => response.data)
      .then(payload => {
        console.log(payload);
      });
  }
  get(...args) {
    return this.session.get("/users").then(response => response.data);
  }
  logout() {
    localStorage.removeItem('token')
    session.defaults.headers.common['Authorization'] = undefined

    return async dispatch => {
      dispatch({
        type: USER_LOGGED_OUT
      })
      history.push('/welcome/')
    }
  }
}

const User = new UserService(session);
export default User;
