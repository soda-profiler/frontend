import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import User from "./services/user";
import "./css/animate.css";
import "./css/bootstrap.css";
import "./css/icomoon.css";
import "./css/style.css";
import { connect } from "react-redux";
import history from "./history";
import SignUpForm from "./SignUpForm";

const code = `
from soda_client import Soda

soda = Soda(access_token, "fib_project")

@soda.profile
def bad_fib(n):
  if n <= 1:
      return n
  else:
      return bad_fib(n-1) + bad_fib(n-2)

bad_fib(10)
`;
const Slogan = props => (
  <div className="col-one-forth js-fullheight">
    <div className="display-t js-fullheight">
      <div className="display-tc js-fullheight">
        <h2 className="number">
          {new Date().getDay()}/{new Date().getMonth()}{" "}
        </h2>
        <div className="text-inner">
          <div className="desc">
            <span className="tag">Welcome to soda</span>
            <h2>
              {" "}
              {/*{
              fontFamily: "Gravitas One"
            }*/}
              Systems efficient until the{" "}
              <h2 style={{ color: "#939393", display: "inline" }}>
                {" "}
                data{" "}
              </h2>{" "}
              grows.
            </h2>
            <p>
              Soda allows you to observe the performance of your system in the
              production environment, where it should be truly fast and
              efficient.{" "}
            </p>
            <p>
              <a
                className="btn-view"
                style={{ cursor: "pointer" }}
                onClick={props.openSignUpForm}
              >
                Get Started
                <i className="icon-arrow-right3" />
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

class Login extends Component {
  state = {
    data: null,
    record: "",
    records: [],
    is_signup_form_open: false
  };

  componentWillMount() {
    if (localStorage.getItem("token")) {
      history.push("/");
    }
  }
  openSignUpForm = () => {
    this.setState({
      is_signup_form_open: true
    });
  };

  handleSignUp = form_data => {
    this.props.dispatch(User.login(form_data["email"], form_data["password"]));
  };

  render() {
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
                <div className="col-md-12">
                  <div className="colorlib-navbar-brand">
                    <a className="colorlib-logo" href="index.html">
                      Soda
                    </a>
                  </div>
                  {/*
                 <a
                    href="#"
                    className="js-colorlib-nav-toggle colorlib-nav-toggle"
                  >
                    <i />
                  </a>
                */}
                </div>
              </div>
            </div>
          </header>
          <div id="colorlib-hero" className="js-fullheight">
            <div className="owl-carousel">
              <div className="item">
                <div className="hero-flex js-fullheight">
                  <div className="col-three-forth">
                    <img
                      style={{
                        float: "right",
                        marginRight: "7em",
                        paddingTop: "4em"
                      }}
                      className="hero-img js-fullheight img-fluid "
                      src="https://im0-tub-ru.yandex.net/i?id=73dcc9edfa6a7e0d8321fd92475e2c32-l&n=13"
                    />
                  </div>

                  {this.state.is_signup_form_open ? (
                    <SignUpForm onSubmit={this.handleSignUp} />
                  ) : (
                    <Slogan openSignUpForm={this.openSignUpForm} />
                  )}
                </div>
              </div>

              <div className="item">
                <div className="hero-flex js-fullheight">
                  <div
                    style={{
                      margin: "auto",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      alignContent: "center",
                      padding: "5em",
                      flexDirection: "column"
                    }}
                  >
                    <center>
                      <div
                        className="text-inner"
                        style={{
                          margin: 0
                        }}
                      >
                        <div className="desc">
                          <h2> You can improve performance only so much.</h2>
                          <p>
                            Dynamic program analysis that measures, for example,
                            the space (memory) or time complexity of a program,
                            the usage of particular instructions, or the
                            frequency and duration of function calls. Most
                            commonly, profiling information serves to aid
                            program optimization.
                          </p>
                        </div>
                      </div>
                    </center>
                    <pre
                      style={{
                        marginTop: "2em"
                      }}
                    >
                      <code>{code}</code>
                    </pre>
                  </div>
                </div>
              </div>

              {/*
              <div className="item">
                <div className="hero-flex js-fullheight">
                  <div className="col-three-forth">
                    <div
                      className="hero-img js-fullheight"
                      style={{ backgroundImage: "url()" }}
                    />
                  </div>
                  <div className="col-one-forth js-fullheight">
                    <div className="display-t js-fullheight">
                      <div className="display-tc js-fullheight">
                        <div className="text-inner">
                          <div className="desc">
                            <span className="tag"> Performance Insights </span>
                            <h2> Analyze and Troubleshoot System's Performance </h2>
                            <p>
                            Performance Insights expands on existing 
                            Amazon RDS monitoring features to illustrate your database's 
                            performance and help you analyze any issues that affect it.
                            </p>
                            <p>
                              <a href="work.html" className="btn-view">
                                View Samples
                                <i className="icon-arrow-right3" />
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Login);
