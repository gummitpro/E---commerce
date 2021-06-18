import { notification } from 'antd';
const initialState = {
   userInfo: {
      data: {},
      load: false,
      error: '',
   },
   productOrderList: {
      data: [],
      load: false,
      error: '',
   },

   userList:{
      data: [],
      load: false,
      error: '',
   }
};

const openNotificationWithIconInfor = (type, notify) => {
   notification[type]({
     message: '',
     description:notify ,
     duration: 2
   });
 };

export default function userReducer(state = initialState, action) {
   switch (action.type) {
      case 'LOGIN_REQUEST':
         {
            return {
               ...state,
               userInfo: {
                  ...state.userInfo,
                  load: true,
               },
            }
         }
      case 'LOGIN_SUCCESS':
         {
            const { data } = action.payload;
            return {
               ...state,
               userInfo: {
                  ...state.userInfo,
                  data: data,
                  load: false,
               },
            }
         }
      case 'LOGIN_FAIL':
         {
            const { error } = action.payload;
            return {
               ...state,
               userInfo: {
                  ...state.userInfo,
                  load: false,
                  error: error,
               },
            }
         }

      case 'GET_USER_INFO_REQUEST':
         {
            return {
               ...state,
               userInfo: {
                  ...state.userInfo,
                  load: true,
               },
            }
         }
      case 'GET_USER_INFO_SUCCESS':
         {
            const { data } = action.payload;
            return {
               ...state,
               userInfo: {
                  ...state.userInfo,
                  data: data,
                  load: false,
               },
            }
         }
      case 'GET_USER_INFO_FAIL':
         {
            const { error } = action.payload;
            return {
               ...state,
               userInfo: {
                  ...state.userInfo,
                  load: false,
                  error: error,
               },
            }
         }
      case 'REGISTER_REQUEST':
         {
            return {
               ...state,
               userInfo: {
                  ...state.userInfo,
                  load: true,
               },
            }
         }
      case 'REGISTER_SUCCESS':
         {
            const { data } = action.payload;
            // openNotificationWithIconInfor("success", "Đăng ký tài khoản thành công")
            return ;
         }
      case 'REGISTER_FAIL':
         {
            const { error } = action.payload;
            return {
               ...state,
               userInfo: {
                  ...state.userInfo,
                  load: false,
                  error: error,
               },
            }
         }
      case 'LOGOUT':
         {
            return {
               userInfo: {
                  data: {}
               }
            }
         }
      case 'GET_PRODUCT_ORDER_LIST_REQUEST':
         {
            return {
               ...state,
               productOrderList: {
                  data: [],
                  load: true,
                  error: '',
               },
            }
         }
      case 'GET_PRODUCT_ORDER_LIST_SUCCESS':
         {
            const { data } = action.payload;
            return {
               ...state,
               productOrderList: {
                  ...state.productOrderList,
                  data: data,
                  load: false,
               },
            }
         }
      case 'CHANGE_INFOR_SUCCESS':
      {
         openNotificationWithIconInfor('success', 'Thay đổi thông tin thành công')
         const { data } = action.payload;
         return {
            ...state,
            userInfo: {
               ...state.userInfo,
               data: data,
               load: false,
            },
         }
      }



      case 'GET_USER_LIST_REQUEST':
         {
            return {
               ...state,
               userList: {
                  ...state.userList,
                  load: true,
               },
            }
         }
      case 'GET_USER_LIST_SUCCESS':
         {
            const { data } = action.payload
            return {
               ...state,
               userList: {
                  ...state.userList,
                  data: data,
                  load: false,
               }
            }

         }
      case 'GET_USER_LIST_FAIL':
         {
            const { error } = action.payload;
            return {
               ...state,
               userList: {
                  ...state.userList,
                  load: false,
                  error: error
               }
            }

         }
      case 'GET_USER_FILTER_REQUEST':
         {
            return {
               ...state,
               userList: {
                  ...state.userList,
                  load: true,
               },
            }
         }
      case 'GET_USER_FILTER_SUCCESS':
         {
            const { data } = action.payload
            return {
               ...state,
               userList: {
                  ...state.userList,
                  data: data,
                  load: false,
               }
            }

         }
      case 'GET_USER_FILTER_FAIL':
         {
            const { error } = action.payload;
            return {
               ...state,
               userList: {
                  ...state.userList,
                  load: false,
                  error: error
               }
            }

         }
case 'REMOVE_USER_REQUEST': {
         return {
            ...state,
            userList: {
               ...state.userList,
               load: true,
            }
         }
      }
      case 'REMOVE_USER_SUCCESS': {
         const { id } = action.payload
         const newUserList = state.userList.data;
         const userIndex = newUserList.findIndex((item) => { return item.id === id });
         newUserList.splice(userIndex, 1)
         return {
            ...state,
            userList: {
               ...newUserList,
               load: false,
               data: newUserList
            }
         }
      }

      
      default:
         {
            return state;
         }
   }
}