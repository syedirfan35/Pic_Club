import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { clearUser } from "../../actions/authAction";

import M from "materialize-css/dist/js/materialize.min.js";
import firebase from "../../../firebase/config";

const Navbar = ({ userDetails, isAuthenticated, clearUser }) => {
  useEffect(() => {
    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems, {});
    //eslint-disable-next-line
  }, []);

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        clearUser();
      })
      .catch(err => {
        console.error(err);
      });
  };

  const authLinks = (
    <Fragment>
      <li>
        <div className="user-view">
          {userDetails &&
            (userDetails.displayName ? (
              <h5>Welcome {userDetails.displayName}!</h5>
            ) : (
              <h5>Welcome User!</h5>
            ))}
        </div>
      </li>
      <li className="divider"></li>

      <li>
        <Link to="/">Home</Link>
      </li>

      <li className="divider"></li>
      <li>
        <a href="#!" onClick={signOut}>
          Sign Out
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div>
      <Fragment>
        <div className="navbar-fixed">
          <nav style={{ marginBottom: "30px", backgroundColor: "#6930c3" }}>
            <div className="nav-wrapper">
              <Link
                to="/"
                className="brand-logo"
                id="logo"
                style={{ marginLeft: "5px" }}
              >
                Pic-Club
              </Link>
              <a
                href="#!"
                data-target="mobile-demo"
                className="sidenav-trigger"
              >
                <i className="material-icons">menu</i>
              </a>
              <ul className="right hide-on-med-and-down">
                {isAuthenticated ? authLinks : guestLinks}
              </ul>
            </div>
          </nav>
        </div>
        <ul className="sidenav" id="mobile-demo">
          {isAuthenticated ? authLinks : guestLinks}
        </ul>
      </Fragment>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.userData.isAuthenticated,
  userDetails: state.userData.currentUser
});

export default connect(
  mapStateToProps,
  { clearUser }
)(Navbar);
