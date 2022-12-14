import actionTypes from "../actions/actionTypes";

const initialState = {
  genders: [],
  roles: [],
  positions: [],
  users: [],
  isLoadingGenders: false,
  outstandingDoctors: [],
  allDoctors: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      state.isLoadingGenders = true;
      // console.log("FETCH_GENDER_START ", action);
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoadingGenders = false;
      // console.log("FETCH_GENDER_SUCCESS ", action);
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      // console.log("FETCH_GENDER_FAILED ", action);
      state.isLoadingGenders = false;
      state.genders = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAILED:
      state.positions = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAILED:
      state.roles = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      state.users = action.users;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USERS_FAILED:
      state.roles = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_OUTSTANDING_DOCTORS_SUCCESS:
      state.outstandingDoctors = action.doctors;
      return {
        ...state,
      };
    case actionTypes.FETCH_OUTSTANDING_DOCTORS_FAILED:
      state.outstandingDoctors = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
      state.allDoctors = action.dataDr;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTORS_FAILED:
      state.allDoctors = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
