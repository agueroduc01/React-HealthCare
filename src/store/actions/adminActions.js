import actionTypes from './actionTypes';
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  deleteUserService,
  editUserService,
  getDoctorHomeService,
  getAllDoctors,
  postDetailDoctor,
} from '../../services/userService';
import { toast } from 'react-toastify';
import { store } from '../..';

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      // Đánh dấu khi nào fetch data bằng field isLoadingGender
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });

      let res = await getAllCodeService('gender');
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (error) {
      dispatch(fetchGenderFailed());
      console.error('fetchGenderStart failed', error);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      // Đánh dấu khi nào fetch data bằng field isLoadingPosition
      dispatch({
        type: actionTypes.FETCH_POSITION_START,
      });

      let res = await getAllCodeService('position');
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (error) {
      dispatch(fetchPositionFailed());
      console.error('fetchPositionStart failed', error);
    }
  };
};

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      // Đánh dấu khi nào fetch data bằng field isLoadingRole
      dispatch({
        type: actionTypes.FETCH_ROLE_START,
      });

      let res = await getAllCodeService('role');
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (error) {
      dispatch(fetchRoleFailed());
      console.error('fetchRoleStart failed', error);
    }
  };
};

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

export const createNewUser = (data, accessToken) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data, accessToken);
      if (res && res.message.errCode === 0) {
        dispatch(saveUserSuccess());
        let tokenTest = await store.getState().user.userInfo.accessToken;
        dispatch(fetchAllUsersStart(tokenTest));
        toast.success(res.message.errMessage);
      } else {
        dispatch(saveUserFailed());
        toast.error('Created failed');
      }
    } catch (error) {
      dispatch(saveUserFailed());
      console.error('saveUserFailed ', error);
      toast.error('Created failed');
    }
  };
};

export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

export const editAUser = (user, accessToken) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(user, accessToken);
      if (res && res.message.errCode === 0) {
        dispatch(editUserSuccess());
        let tokenTest = await store.getState().user.userInfo.accessToken;
        dispatch(fetchAllUsersStart(tokenTest));
        toast.success(res.message.errMessage);
      } else {
        dispatch(editUserFailed());
        toast.error(res.message.errMessage);
      }
    } catch (error) {
      dispatch(editUserFailed());
      console.error('editUserFailed ', error);
      toast.error('editUserFailed');
    }
  };
};

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});

export const deleteAUser = (id, accessToken) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(id, accessToken);
      if (res && res.errCode === 0) {
        dispatch(deleteUserSuccess());
        let tokenTest = await store.getState().user.userInfo.accessToken;
        dispatch(fetchAllUsersStart(tokenTest));
        toast.success(res.message);
      } else {
        dispatch(deleteUserFailed());
        toast.error('deleteUserFailed');
      }
    } catch (error) {
      dispatch(deleteUserFailed());
      console.error('deleteUserFailed ', error);
      toast.error('deleteUserFailed');
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

export const fetchAllUsersStart = (accessToken) => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers(accessToken);
      if (res && res.errCode === 0) {
        dispatch(fetchAllUsersSuccess(res.data.reverse()));
      } else {
        dispatch(fetchAllUsersFailed());
      }
    } catch (error) {
      dispatch(fetchAllUsersFailed());
      console.error('fetchAllUsersStart failed', error);
    }
  };
};

export const fetchAllUsersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data,
});

export const fetchAllUsersFailed = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILED,
});

export const fetchOutStandingDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let response = await getDoctorHomeService('');
      console.log('res123', response);
      if (response && response.errCode === 0) {
        dispatch(fetchOutStandingDoctorsSuccess(response.data));
      } else {
        dispatch(fetchOutStandingDoctorsFailed());
      }
    } catch (err) {
      console.log('fetchOutStandingDoctorsFailed', err);
      dispatch(fetchOutStandingDoctorsFailed());
    }
  };
};

export const fetchOutStandingDoctorsSuccess = (data) => ({
  type: actionTypes.FETCH_OUTSTANDING_DOCTORS_SUCCESS,
  doctors: data,
});

export const fetchOutStandingDoctorsFailed = () => ({
  type: actionTypes.FETCH_OUTSTANDING_DOCTORS_FAILED,
});

export const fetchAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctors();
      if (res && res.errCode === 0) {
        dispatch(fetchAllDoctorsSuccess(res.doctors));
      } else {
        dispatch(fetchAllDoctorsFailed());
      }
    } catch (err) {
      console.log('fetchAllDoctorsFailed', err);
      dispatch(fetchAllDoctorsFailed());
    }
  };
};

export const fetchAllDoctorsSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
  dataDr: data,
});

export const fetchAllDoctorsFailed = () => ({
  type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
});

export const saveDetailDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await postDetailDoctor(data);
      if (res && res.errCode === 0) {
        dispatch(saveDetailDoctorSuccess());
        toast.success(res.errMessage);
      } else {
        dispatch(saveDetailDoctorFailed());
        toast.error(res.errMessage);
      }
    } catch (err) {
      console.log('saveDetailDoctorFailed', err);
      toast.error(err);
      dispatch(saveDetailDoctorFailed());
    }
  };
};

export const saveDetailDoctorSuccess = () => ({
  type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
});

export const saveDetailDoctorFailed = () => ({
  type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
});
