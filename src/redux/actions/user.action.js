export function loginAction(params) {
    return {
        type: 'LOGIN_REQUEST',
        payload: params,
    }
}
export function getUserInfoAction(params) {
    return {
        type: 'GET_USER_INFO_REQUEST',
        payload: params,
    }
}
export function registerAction(params) {
    return {
        type: 'REGISTER_REQUEST',
        payload: params,
    }
}
export function logoutAction(params) {
    return {
        type: 'LOGOUT',
    }
}

export function changePasswordAction(params) {
    return {
        type: 'CHANGE_PASSWORD_REQUEST',
        payload: params,
    }
}

export function changeInforAction(params) {
    return {
        type: 'CHANGE_INFOR_REQUEST',
        payload: params,
    }
}


export function getProductOrderListAction(params) {
    console.log("params 1231323111: ", params)
    return {
      type: 'GET_PRODUCT_ORDER_LIST_REQUEST',
      payload: params,
    }
}
// ---------------

export function getUserListAction(){
    return {
        type: 'GET_USER_LIST_REQUEST'
    }
}
export function editUserAction(params) {
    return {
        type: 'EDIT_USER_REQUEST',
        payload: params
    }
}