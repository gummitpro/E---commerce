import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import {URL} from '../../../contrains/App.js'

function* removeUserSaga(action) {
  try {
    const { id } = action.payload
    const result = yield axios.delete(URL + `/users/${id}`)
    if (result.data) {
      yield put({
        type: 'REMOVE_USER_SUCCESS',
        payload: { id }
      })
    } else {
      yield put({
        type: 'REMOVE_USER_FAIL',
        payload: {
          error: 'FAIL'
        }
      })
    }
  } catch (e) {
    yield put({
      type: 'REMOVE_USER_FAIL',
      payload: {
        error: e.error
      }
    })
  }
}
function* getUserFilterSaga(action) {
  try {
    const { status } = action.payload
    const result = yield axios({
      method: 'GET',
      url: URL + '/users',
      params: {
        status: status,
      }
    });
    yield put({
      type: 'GET_USER_FILTER_SUCCESS',
      payload: {
        data: result.data
      }
    })
  } catch (e) {
    yield put({
      type: 'GET_USER_FILTER_FAIL',
      payload: {
        error: e.error
      }
    })
  }
}
function* changeStatusUserAdminSaga (action) {
  try {
    const { id, status, admin } = action.payload
    const result = yield axios.patch(URL + `/users/${id}`,{ status, admin })
    if (result.data) {
      yield put({
        type: 'CHANGE_STATUS_USER_SUCCESS',
        payload: {
          data: result.data
        }
      })
      yield put({type: 'GET_USER_LIST_REQUEST'})
    } else {
      yield put({
        type: 'CHANGE_STATUS_USER_FAIL',
        payload: 'FAIL'
      })
    }
  } catch (e) {
    yield put ({
      type: 'CHANGE_STATUS_USER_FAIL',
      payload: {
        error: e.error
      }
    })
  }
}
function* editUserAdminSaga (action) {
  try {
    const { id, userName, email, newPass, phone, gender } = action.payload
    var result
    {newPass === "" ? result = yield axios.patch(URL + `/users/${id}`,{userName, email, phone, gender})
    : result = yield axios.patch(URL + `/users/${id}`,{userName, email, password: newPass,  phone, gender})
    }
    localStorage.setItem('userInfo', JSON.stringify(result.data));
    if (result.data) {
      yield put({
        type: 'EDIT_USER_SUCCESS',
        payload: {
          data: result.data
        }
      })
    } else {
      yield put({
        type: 'EDIT_USER_FAIL',
        payload: 'FAIL'
      })
    }
  } catch (e) {
    yield put ({
      type: 'EDIT_USER_FAIL',
      payload: {
        error: e.error
      }
    })
  }
}
export default function* userSaga() {
  yield takeEvery('GET_USER_FILTER_REQUEST', getUserFilterSaga)
  yield takeEvery('REMOVE_USER_REQUEST', removeUserSaga);
  yield takeEvery('CHANGE_STATUS_USER_REQUEST', changeStatusUserAdminSaga);
  yield takeEvery('EDIT_USER_REQUEST',editUserAdminSaga)
}