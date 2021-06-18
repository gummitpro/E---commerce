export function changeStatusAction(params) {
  return {
    type: 'CHANGE_STATUS_REQUEST',
    payload: params,
  }
}
export function getOrderAdminAction(params) {
  return {
    type: 'GET_ORDER_ADMIN_REQUEST',
    payload: params,
  }
}
export function getOrderFilterAdminAction(params) {
  return {
    type: 'GET_ORDER_ADMIN_FILTER_REQUEST',
    payload: params,
  }
}
export function removeOrderAdminAction(params) {
  return {
    type: 'REMOVE_ORDER_ADMIN_REQUEST',
    payload: params,
  }
}