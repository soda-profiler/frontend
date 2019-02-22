import axios from "axios";

const token = localStorage.getItem('token')
let session = undefined;
if (token){
  session = axios.create({
  baseURL: "http://0.0.0.0/api/v1.0/",
  timeout: 10000,
  headers: {
    Authorization: token
  }
});
}
else {
  session = axios.create({
    baseURL: "http://0.0.0.0/api/v1.0/",
    timeout: 10000,
  });
}

export default session;
