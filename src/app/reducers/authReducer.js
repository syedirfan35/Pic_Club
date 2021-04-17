import {
  SET_USER,
  SET_LOADING,
  CLEAR_USER,
  AUTH_ERROR
} from "../actions/types";

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  isLoading: false,
  selectedImage: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true,
        isLoading: false
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case CLEAR_USER:
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
        isLoading: false
      };
    case AUTH_ERROR:
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
        isLoading: false
      };

    default:
      return state;
  }
};

export default reducer;
