import React, { useState, Fragment, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import M from "materialize-css/dist/js/materialize.min.js";

import firebase from "../../../firebase/config";

import Spinner from "../layout/Spinner";

import { setLoading } from "../../actions/authAction";

const Register = ({ isAuthenticated, loading, setLoading }) => {
  useEffect(() => {
    M.updateTextFields();
  });
  const [state, setState] = useState({
    userName: "",
    password: "",
    password2: "",
    email: ""
  });
  const { userName, password, password2, email } = state;

  const onSubmit = e => {
    e.preventDefault();
    if (
      userName === "" &&
      password === "" &&
      password2 === "" &&
      email === ""
    ) {
      M.toast({
        html: "Please enter all fields to continue",
        classes: "rounded"
      });
    } else if (password !== password2) {
      M.toast({ html: "Passwords didn't match.", classes: "rounded" });
    } else {
      setLoading(true);
      //registering user
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(err => {
          console.error(err);
        });
    }
    //clear fields
    setState({
      userName: "",
      password: "",
      password2: "",
      email: ""
    });
  };

  const onChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="row">
        <form className="col s12" onSubmit={onSubmit}>
          <h3 className="center" id="register-header">
            Account <span className="deep-purple-text accent-2">Register</span>
          </h3>

          <div className="row ">
            <div className="input-field col l6 m6 s12">
              <input
                type="text"
                name="userName"
                value={userName}
                onChange={onChange}
                placeholder="Enter your name..."
              />
              <label htmlFor="name">Name</label>
            </div>
            <div className="input-field col l6 m6 s12">
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="Enter your email id..."
              />
              <label htmlFor="email">Email ID</label>
            </div>
            <div className="input-field col l6 m6 s12">
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Enter your password..."
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="input-field col l6 m6 s12">
              <input
                type="password"
                name="password2"
                value={password2}
                onChange={onChange}
                placeholder="Confirm password..."
              />
              <label htmlFor="password">Confirm Password</label>
            </div>
          </div>

          <div className="center">
            <button
              className="btn waves-effect waves-light deep-purple"
              type="submit"
            >
              Submit
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
      <div className="center mt-3">
        <h5>
          Already a user?{" "}
          <Link to="/login" className="deep-purple-text">
            Login
          </Link>
        </h5>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.userData.isAuthenticated,
  loading: state.userData.isLoading
});

export default connect(
  mapStateToProps,
  { setLoading }
)(Register);
