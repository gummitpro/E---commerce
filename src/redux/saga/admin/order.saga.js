import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import {URL} from '../../../contrains/App.js'

function* changeStatusSaga(action) {
  try {
    const { id,status } = action.payload
    const result = yield axios({
      method: 'PATCH',
      url: URL + `/orders/${id}`,
      data: {
        status,
      }
    });
    yield put ({
      type: 'CHANGE_STATUS_SUCCESS',
      payload: {
        data: result.data
      }
    })
    yield put ({ type: 'GET_ORDER_ADMIN_REQUEST'})
  } catch (e) {
    yield put ({
      type: 'CHANGE_STATUS_FAIL',
      payload: {
        error: e.error
      }
    })
  }
}
function* getOrderSaga() {
  try {
    const result = yield axios.get(URL + `/orders?_expand=user`)
    if(result.data) {
      yield put ({
        type: 'GET_ORDER_SUCCESS',
        payload: {
          data: result.data
        }
      })
    } else {
      yield put({
        type: 'GET_ORDER_FAIL',
        payload: {
          error: 'FAIL'
        }
      })
    }
  } catch (e) {
    yield put ({
      type: 'GET_ORDER_FAIL',
      payload: {
        error: e.error
      }
    })
  }
}
function* getOrderFilterSaga(action) {
  try {
    const {status} = action.payload
    const result = yield axios({
      method: 'GET',
      url: URL + `/orders`,
      params: {
        _expand: 'user',
        status: status
      }
    });
    yield put({
      type: "GET_ORDER_FILTER_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put ({
      type: 'GET_ORDER_FILTER_FAIL',
      payload: {
        error: e.error
      }
    })
  }
}
function* removeOrderSaga(action) {
  try {
    const {id} = action.payload
    const result = yield axios.delete(URL + `/orders/${id}`)
    if(result.data) {
      yield put ({
        type: 'REMOVE_ORDER_SUCCESS'
      })
      yield put ({ type: 'GET_ORDER_ADMIN_REQUEST'})
    } else {
      yield put({
        type: 'REMOVE_ORDER_FAIL',
      })
    }
  } catch (e) {
    yield put ({
      type: 'REMOVE_ORDER_FAIL',
    })
  }
}
export default function* orderAdminSaga() {
  yield takeEvery('CHANGE_STATUS_REQUEST', changeStatusSaga);
  yield takeEvery('GET_ORDER_ADMIN_REQUEST',getOrderSaga);
  yield takeEvery('GET_ORDER_ADMIN_FILTER_REQUEST',getOrderFilterSaga);
  yield takeEvery('REMOVE_ORDER_ADMIN_REQUEST',removeOrderSaga)
}