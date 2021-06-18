import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { resolveOnChange } from 'antd/lib/input/Input';

import {URL } from '../../contrains/App'

function* getProductListSaga() {
  try {
    //const { page, limit } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: URL + '/products?_embed=comments'
    });
    yield put({
      type: "GET_PRODUCT_LIST_SUCCESS",
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({
      type: "GET_PRODUCT_LIST_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* getProductDetailSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: URL + `/products/${id}?_embed=comments`,
      params: {
        _embed: 'productOptions',
        // _expand: 'category'
      }
    });
    // console.log("result: ", result.status)
    if(result.status == 200){
      yield put({
        type: "GET_PRODUCT_DETAIL_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    }else{
     
      yield put({
        type: "GET_PRODUCT_DETAIL_FAIL", 
        payload: {
          error: result.status
        },
      });
    }
    
  } catch (e) {
    yield put({
      type: "GET_PRODUCT_DETAIL_FAIL", 
      payload: {
        error: 404
      },
    });
  }
}

function* getProductListSameSaga(action) {
  try {
    const { categoryId } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: URL + `/products?categoryId=${categoryId}&_embed=comments`
    });
    // console.log("result list product: ", result)
    yield put({
      type: "GET_PRODUCT_SAME_SUCCESS",
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({
      type: "GET_PRODUCT_SAME_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* getProductListSearchSaga(action) {
  try {
    const { search } = action.payload;
    console.log("action.payload: ", action.payload.search)
    const result = yield axios({
      method: 'GET',
      url: URL + '/products?q='+action.payload.search+'&_embed=comments'
    });
    console.log("result list product search: ", result)
    yield put({
      type: "GET_PRODUCT_LIST_SEARCH_SUCCESS",
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({
      type: "GET_PRODUCT_LIST_SEARCH_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* addProductSaga(action) {
   try {
    const { price, name } = action.payload;
    const result = yield axios.post(URL + '/products', {name, price})
    if (result.data) {
      yield put({ // đợi rồi mới chạy
        type: "ADD_PRODUCT_ADMIN_SUCCESS",
        payload: {
          // data: result.data[0],
          // data: result.data,
        },
      });
      // yield alert("Thành công");
    } else {
      yield put({
        type: "ADD_PRODUCT_ADMIN_FAIL",
        payload: {
          error: 'FAIL',
        },
      });
    }
   } catch (e) {
    yield put({
      type: "ADD_PRODUCT_ADMIN_FAIL",
      payload: {
        error: e.error,
      },
    });
   }
}

function* editProductSaga (action) {
  try {
    const {name,price,id} = action.payload
    const result = yield axios.post(URL + `/products/${id}`, {name, price})
    if(result.data){
      yield put({
        type: 'EDIT_PRODUCT_ADMIN_SUCCESS',
        payload: result.data
      })
    } else {
      yield put({
        type: 'EDIT_PRODUCT_ADMIN_FAIL',
        payload: {
          error: 'FAIL'
        }
      })
    }
    } catch(e) {
      yield put({
        type: 'EDIT_PRODUCT_ADMIN_FAIL',
        payload: {
          error :e.error
        }
      })
    }
}

export default function* productSaga() {
  yield takeEvery('GET_PRODUCT_LIST_REQUEST', getProductListSaga);
  yield takeEvery('GET_PRODUCT_DETAIL_REQUEST', getProductDetailSaga);
  yield takeEvery('GET_PRODUCT_SAME_REQUEST', getProductListSameSaga);
  yield takeEvery('GET_PRODUCT_LIST_SEARCH_REQUEST', getProductListSearchSaga);
  yield takeEvery('ADD_PRODUCT_ADMIN_REQUEST', addProductSaga);
  yield takeEvery('EDIT_PRODUCT_ADMIN_REQUEST', editProductSaga);
  // yield takeEvery('GET_PRODUCT_DETAIL_REQUEST', getProductDetailSaga);
}
