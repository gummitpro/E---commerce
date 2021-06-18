import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import productReducer from './product.reducer';
import adminProductReducer from './admin/product.reducer'
import adminCommonReducer from './admin/common.reducer'
import adminOrderReducer from './admin/order.reducer'

export default combineReducers({
  userReducer: userReducer,
  productReducer: productReducer,
  adminProductReducer: adminProductReducer,
  adminCommonReducer: adminCommonReducer,
  adminOrderReducer: adminOrderReducer,
})