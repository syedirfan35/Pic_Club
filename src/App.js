import React, { useEffect, Fragment } from "react";
import { withRouter, Route, Switch } from "react-router-dom";

import firebase from "./firebase/config";
import { connect } from "react-redux";

import "./App.css";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";

import Navbar from "./app/components/layout/Navbar";
import Login from "./app/components/pages/Login";
import Register from "./app/components/pages/Register";
import Home from "./app/components/pages/Home";

import { setUser, setLoading, clearUser } from "./app/actions/authAction";
import Spinner from "./app/components/layout/Spinner";

const App = ({ setUser, loading, setLoading }) => {
  useEffect(() => {
    //initialize materialize css
    M.AutoInit();
    //auth state

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        clearUser();
      }
    });
  });

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  loading: state.userData.isLoading
});

export default withRouter(
  connect(
    mapStateToProps,
    { setUser, setLoading }
  )(App)
);
