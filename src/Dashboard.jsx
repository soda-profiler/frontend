import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import "./css/animate.css";
import "./css/bootstrap.css";
import "./css/icomoon.css";
import "./css/style.css";
import Highlight from "react-highlight";

import { connect } from "react-redux";
import Project from "./services/project";
import User from "./services/user";

import DataTable from "./DataTable";
import TimeLineChart from "./TimeLine";

import ProjectForm from "./ProjectForm";

const PYTHON_EXAMPLE = project_name => `
from soda_client import Soda 

soda = Soda(access_token, "${project_name}")

@soda.profile
def your_function(n):
    pass

`;

class Dashboard extends Component {
  state = {
    data: null,
    record: "",
    records: [],
    is_signup_form_open: false,
    decorate: ""
  };

  componentDidMount() {
    this.props.dispatch(Project.get());
   
    setInterval(() => {
      this.state.decorate
        ? this.setState({
            decorate: null
          })
        : this.setState({
          decorate: "underline"
          });
    }, 1000);
  }
  createProject = data => {
    const { name } = data;
    this.props.dispatch(Project.create(name));
    this.props.dispatch(Project.get());
  };
  logoutUser = () => {
    this.props.dispatch(User.logout());
  };
  selectProject = project_name => {
    this.props.dispatch(Project.select(project_name));
  };
  render() {
    const { projects } = this.props.project;
    const { currentProject } = this.props.project;
    const { records } = this.props.record;

    return (
      <div>
        <nav id="colorlib-main-nav" role="navigation">
          <a
            href="#"
            className="js-colorlib-nav-toggle colorlib-nav-toggle active"
          >
            <i />
          </a>
          <div className="js-fullheight colorlib-table">
            <div className="colorlib-table-cell js-fullheight">
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="search"
                      placeholder="Enter any key to search..."
                    />
                    <button type="submit" className="btn btn-primary">
                      <i className="icon-search3" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <ul>
                    <li className="">
                      <a>Log out</a>
                    </li>

                    <li className="active">
                      <a href="index.html">Home</a>
                    </li>

                    <li>
                      <a href="work.html">Work</a>
                    </li>
                    <li>
                      <a href="blog.html">Blog</a>
                    </li>
                    <li>
                      <a href="about.html">About</a>
                    </li>
                    <li>
                      <a href="contact.html">Contact</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div id="colorlib-page">
          <header>
            <div className="container">
              <div className="row">
                <div className="col-md-10">
                  <div className="colorlib-navbar-brand">
                    <a className="colorlib-logo" href="index.html">
                      Soda
                    </a>
                  </div>
                  <a
                    href="#"
                    className="js-colorlib-nav-toggle colorlib-nav-toggle"
                  >
                    <i />
                  </a>
                </div>
                <div className="col-md-2">
                  <a onClick={this.logoutUser}>Log out</a>
                </div>
              </div>
            </div>
          </header>
          {projects.length > 0 ? (
            <div
              style={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                width: "100%",
                flexDirection: "column",
                paddingTop: "10em"
              }}
            >
              <div className="row">
                <div className="col-md-2">
                  <h2> Projects </h2>

                  <ul>
                    {projects.map(project => (
                      <li>
                        <h3>
                          <a onClick={() => this.selectProject(project.name)}>
                            {project.name}
                          </a>
                        </h3>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-md-10">
                  {currentProject &&
                    (records.length < 1 ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "column"
                        }}
                      >
                        <h2 style={{
                          textDecoration: this.state.decorate
                        }}>
                          
                          Waiting for records
                          
                        </h2>
                        <label>
                          {" "}
                          If you haven't assign this project in a code base, you can
                          add it to your project using the following code
                          example.
                        </label>
                        <pre>
                          <code className="python">
                            {PYTHON_EXAMPLE(currentProject)}
                          </code>
                        </pre>
                      </div>
                    ) : (
                      <div
                        style={{
                          minWidth: "90%"
                        }}
                      >
                        <TimeLineChart />
                        <DataTable />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : (
            <ProjectForm onSubmit={this.createProject} />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  form: state.form,
  project: state.project,
  record: state.record
});

export default connect(mapStateToProps)(Dashboard);
