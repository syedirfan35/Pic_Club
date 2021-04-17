import { SET_USER, SET_LOADING, CLEAR_USER, AUTH_ERROR } from "./types";

export const setUser = user => {
  return {
    type: SET_USER,
    payload: user
  };
};

export const setLoading = loading => {
  return {
    type: SET_LOADING,
    payload: loading
  };
};

export const clearUser = () => {
  return {
    type: CLEAR_USER
  };
};

export const authError = () => {
  return {
    type: AUTH_ERROR
  };
};
