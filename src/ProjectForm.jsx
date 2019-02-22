import React from "react";
import { Field, reduxForm } from "redux-form";

let ProjectForm = props => {
  const { handleSubmit, onSubmit } = props; // Notice two functions, not one! Only onSubmit is passed in by you as a prop. The other is passed in by redux-form

  return (
    <div id="colorlib-hero">
      <div className="item">
        <div
          className="hero-flex"
          style={{
            alignItems: "center",
            margin: "auto",
            flexDirection: "column",
            paddingTop: "10em"
          }}
        >
          <h1> Hello, Mehmet </h1>
          <span
                    style={{
                      fontWeight: "lighter",
                      textAlign: "center"
                    }}
                  >
                    You have not created any projects yet.
                  </span>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <div className="row row-padded-bottom-sm">
                <div className="col-md-9" style={{
                      paddingRight: 0,
                      paddingLeft: 0
                }}>
                  <Field
                    placeholder="Project Name"
                    name="name"
                    id="name"
                    component="input"
                    type="text"
                    autoComplete="off"
                    className="form-control"
                  />
                </div>
                <div className="col-md-3"  style={{
                      paddingRight: 0,
                      paddingLeft: 0,
                }}>
                  <button
                    className="btn-view form-control"
                    type="submit"
                    style={{
                      cursor: "pointer",
                      border: "1px solid rgb(147, 147, 147)",
                      height: "50px",
                      width: 100
                    }}
                  >
                    CREATE
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

ProjectForm = reduxForm({
  form: "project"
})(ProjectForm);

export default ProjectForm;
