export function getProductListAction(params) {
  return {
    type: 'GET_PRODUCT_LIST_REQUEST',
    payload: params,
  }
}

export function getProductDetailAction(params){
  return {
    type: 'GET_PRODUCT_DETAIL_REQUEST',
    payload: params
  }
}
export function getProductSameAction(params) {
  return {
    type: 'GET_PRODUCT_SAME_REQUEST',
    payload: params,
  }
}
export function addProductCartAction(params) {
  return {
    type: 'ADD_PRODUCT_CART_REQUEST',
    payload: params,
  }
}

export function decProductCartAction(params) {
  return {
    type: 'DEC_PRODUCT_CART_REQUEST',
    payload: params,
  }
}

export function incProductCartAction(params) {
  return {
    type: 'INC_PRODUCT_CART_REQUEST',
    payload: params,
  }
}

export function removeProductCartAction(params) {
  return {
    type: 'REMOVE_PRODUCT_CART_REQUEST',
    payload: params,
  }
}

export function paymentAction(params) {
  return {
    type: 'PAYMENT_REQUEST',
    payload: params,
  }
}

export function addCommentAction(params) {
  return {
    type: 'ADD_COMMENT_REQUEST',
    payload: params,
  }
}

export function getCommentListAction(params) {
  return {
    type: 'GET_COMMENT_LIST_REQUEST',
    payload: params,
  }
}

export function getProductSearchAction(params) {
  console.log("params:   params  ", params)
  return {
    type: 'GET_PRODUCT_LIST_SEARCH_REQUEST',
    payload: params,
  }
}

export function addProductAction(params) {
  return {
    type: 'ADD_PRODUCT_ADMIN_REQUEST',
    payload: params,
  }
}
export function editProductAction(params) {
  return {
    type: 'EDIT_PRODUCT_ADMIN_REQUEST',
    payload: params,
  }
}
export function removeProductAction(params) {
  return {
    type: 'REMOVE_PRODUCT_AMIN_REQUEST',
    payload: params,
  }
}
