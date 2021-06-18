import { fork } from 'redux-saga/effects';

import userSaga from './user.saga';
import productSaga from './product.saga';
import adminProductSaga from './admin/product.saga';
import adminUserSaga from './admin/user.saga';
import orderAdminSaga from './admin/order.saga';

import cartSaga from './cart.saga';
import commentSage from './comment.saga'


export default function* mySaga() {
  yield fork(userSaga);
  yield fork(productSaga);
  yield fork(cartSaga);
  yield fork(commentSage);

  yield fork(adminProductSaga);
  yield fork(adminUserSaga);
  yield fork(orderAdminSaga);
}
