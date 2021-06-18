import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import history from '../../utils/history';
import { notification } from 'antd';

import {URL} from '../../contrains/App.js'

const openNotificationWithIcon = (type, notify) => {
  notification[type]({
    message: '',
    description: notify,
    duration: 2
  });
};


function* loginSaga(action) {
 
  try {
    const { email, password, prevPath } = action.payload;
    
    const result = yield axios({
      method: 'GET',
      url: URL + '/users',
      params: {
        email,
        password,
      }
    });
    if (result.data.length > 0 ) {
      if(result.data[0].status === true){
        localStorage.setItem('userInfo', JSON.stringify(result.data[0]));
        if(result.data[0].admin) {
          yield put({ // đợi rồi mới chạy
            type: "LOGIN_SUCCESS",
            payload: {
              data: result.data[0],
            },
          });
          yield history.push('/admin');
        } else {
          yield put({ // đợi rồi mới chạy
            type: "LOGIN_SUCCESS",
            payload: {
              data: result.data[0],
            },
          });
          
          console.log("prevPath: ", prevPath)
          yield history.push(prevPath ? prevPath : "/");
        }
      }else {
        openNotificationWithIcon("error", "Tài khoản của bạn đã bị khóa")
      }
    } else {
      openNotificationWithIcon("error", "Email hoặc mật khẩu không đúng")
      yield put({
        type: "LOGIN_FAIL",
        payload: {
          error: 'Email hoặc mật khẩu không đúng',
        },
      });
    }
  } catch (e) {
   console.log(e)
    yield put({
      type: "LOGIN_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* getUserInfoSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(URL + `/users/${id}`);
    yield put({
      type: "GET_USER_INFO_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "GET_USER_INFO_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* registerSaga(action) {
  try {
    const { email, password, userName } = action.payload;
    // const result = yield axios({
    //   method: 'POST',
    //   url: URL + '/users',
    // }, {email, password, userName})  // không hiểu tại sao luôn
    
    const user = yield axios.get(URL + '/users'	)
		const u = user.data.find(user => user.email === email)
    if(u){
      yield openNotificationWithIcon('error', 'Email đã được đăng ký')
    }else{
      const result = yield axios.post(URL + '/users'
      , {email, password, userName, admin: false, status: true,} )
      
      if (result.data) {
        yield openNotificationWithIcon('success', 'Đăng ký thành công')

        yield (window.location.replace("http://localhost:3000/dang-nhap"));

        yield put({ // đợi rồi mới chạy
          type: "REGISTER_SUCCESS",
          payload: {
            // data: result.data[0],
            data: result.data,
          },
        });
        
      } else {
        yield put({
          type: "REGISTER_FAIL",
          payload: {
            error: 'Email đã được đăng ký',
          },
        });
      }
    }
  } catch (e) {
    yield put({
      type: "REGISTER_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* getProductOrderListSaga(action) {
  try {
    const result = yield axios({
      method: 'GET',
      url: URL + '/orders?userId='+action.payload
    });
    yield put({
      type: "GET_PRODUCT_ORDER_LIST_SUCCESS",
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({
      type: "GET_PRODUCT_ORDER_LIST_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* changeInforSaga(action){

  const {id,  email, fullname,gender, userName, phone, date } = action.payload;
  const result = yield axios.patch(URL + `/users/${id}`,{email: email, userName: userName, fullname: fullname, gender: gender, phone: phone, date: date})
  
  if(result ){
    yield put({
      type: "CHANGE_INFOR_SUCCESS",
      payload: {
        data: result.data
      },
    });
  }
}

function* changePasswordSaga(action){
  const {id,  email, passwordOld, passwordNew } = action.payload;
  const result = yield axios({
    method: 'GET',
    url: URL + '/users',
    params:{
      email,
      password: passwordOld,
    }
  });
  if(result.data.length > 0 ){
    // const resultTwo = yield axios({
    //   method: 'PATCH',
    //   url: URL + '/users/'+id,
    //   data:{
    //     password: passwordNew,
    //   }
    // });
    yield axios.patch(URL + `/users/${id}`,{password: passwordNew})
    yield openNotificationWithIcon('success', 'Thay đổi mật khẩu thành công')
    
    // yield put({
    //   type: "CHANGE_PASSWORD_SUCCESS",
    //   payload: {
    //     data: result.data
    //   },
    // });
    
  }else{
    openNotificationWithIcon('error', 'Thay đổi mật khẩu không thành công')
  }
 
}



function* getUserListSaga() {
  try {
    const result = yield axios.get(URL + '/users?_embed=orders')
    yield put({
      type: 'GET_USER_LIST_SUCCESS',
      payload: {
        data: result.data
      }
    })
  } catch(e) {
    yield put({
      type: 'GET_USER_LIST_FAIL',
      payload: {
        error: e.error
      }
    })
  }
}



export default function* userSaga() {
  yield takeEvery('LOGIN_REQUEST', loginSaga);
  yield takeEvery('GET_USER_INFO_REQUEST', getUserInfoSaga);
  yield takeEvery('REGISTER_REQUEST', registerSaga);
  yield takeEvery('GET_PRODUCT_ORDER_LIST_REQUEST', getProductOrderListSaga);
  yield takeEvery('CHANGE_INFOR_REQUEST', changeInforSaga);
  yield takeEvery('CHANGE_PASSWORD_REQUEST', changePasswordSaga);

  yield takeEvery('GET_USER_LIST_REQUEST', getUserListSaga);
}
