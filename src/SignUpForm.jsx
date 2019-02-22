import React from "react";
import { Field, reduxForm } from "redux-form";

let SignUpForm = props => {
  console.log(props)
  const { handleSubmit } = props;
  return (
    <div className="col-one-forth js-fullheight">
      <div className="display-t js-fullheight">
        <div className="display-tc js-fullheight">
          <h2 className="number">
            {new Date().getDay()}/{new Date().getMonth()}
          </h2>
          <div className="text-inner">
            <div className="desc">
              <span className="tag">Welcome to SODA</span>
              <h2>Sign Up</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <div className="row row-padded-bottom-sm">
                    <div className="col-md-12">
                      <Field
                        placeholder="E-mail"
                        name="email"
                        id="email"
                        component="input"
                        type="email"
                        autoComplete="off"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="row row-padded-bottom-sm">
                    <div className="col-md-12">
                      <Field
                        name="password"
                        component="input"
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="password"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <Field
                        name="password_again"
                        component="input"
                        type="password"
                        className="form-control"
                        id="password_again"
                        placeholder="password (again)"
                      />
                    </div>
                  </div>
                  <div className="row row-padded-bottom-sm">
                    <div className="col-md-12">
                      <label className="styled-checkbox">
                        <p>
                          I agree to the{" "}
                          <a href="#" className="terms">
                            Terms of Service{" "}
                          </a>
                          and the{" "}
                          <a href="#" className="terms">
                            Privacy Policy
                          </a>
                        </p>
                        <Field name="terms_accepted" component="input" type="checkbox" />
                        <span className="checkmark" />
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <button
                        type="submit"
                        style={{
                          cursor: "pointer",
                          border: "1px solid rgb(147, 147, 147)"
                        }}
                        className="btn-view"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SignUpForm = reduxForm({
  // a unique name for the form
  form: "signUp"
})(SignUpForm);

export default SignUpForm;
