import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";

import M from "materialize-css/dist/js/materialize.min.js";

import firebase from "../../../firebase/config";
import { connect } from "react-redux";
import { setLoading, authError } from "../../actions/authAction";
import Spinner from "../layout/Spinner";

const Login = ({ isAuthenticated, setLoading, loading, authError }) => {
  const [state, setState] = useState({
    email: "",
    password: ""
  });

  const { email, password } = state;

  const onSubmit = e => {
    e.preventDefault();
    if (email === "" && password === "") {
      let message = `<div className="purple">Please enter all fields to continue.</div>`;
      M.toast({ html: message, classes: "rounded" });
    } else {
      setLoading(true);

      //sign in a user
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {})
        .catch(err => {
          console.error(err);
          if (err.code === "auth/user-not-found") {
            M.toast({ html: "Invalid credentials", classes: "rounded" });
            authError();
          } else if (err.code === "auth/wrong-password") {
            M.toast({ html: "Wrong password", classes: "rounded" });
            authError();
          }
        });
    }
    //clear fields
    setState({
      email: "",
      password: ""
    });
  };

  const onChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  //google signIn
  const signInWithGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        return;
      })
      .catch(err => {
        console.error(err);
      });
  };

  //fb signIn

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return loading ? (
    <Spinner />
  ) : (
    <div>
      <Fragment>
        <div className="row">
          <form className="col s12" onSubmit={onSubmit}>
            <h3 className="center">
              Account <span className="deep-purple-text">Login</span>
            </h3>

            <div className="row">
              <div className="input-field col l6 m6 s12">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                />
                <label htmlFor="email">Email ID</label>
              </div>
              <div className="input-field col l6 m6 s12">
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                />
                <label htmlFor="email">Password</label>
              </div>
            </div>
            <div className="center">
              <button className="btn waves-effect waves-light deep-purple">
                Submit
                <i className="material-icons right">send</i>
              </button>
            </div>
          </form>
          <div className="center ">
            <button
              className="btn waves-effect waves-light red"
              style={{ marginTop: "12px" }}
              onClick={signInWithGoogle}
            >
              Sign In with Google
              <i className="material-icons right">send</i>
            </button>
          </div>
        </div>
        <div className="center mt-3">
          <h5>
            New user?{" "}
            <Link to="/register" className="deep-purple-text">
              Register
            </Link>
          </h5>
        </div>
      </Fragment>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.userData.isAuthenticated,
  loading: state.userData.isLoading
});

export default connect(
  mapStateToProps,
  { setLoading, authError }
)(Login);
