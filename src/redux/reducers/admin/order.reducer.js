const initialState = {
  orderList: {
    data: [],
    load: false,
    error: '',
  },
}
export default function adminOrderReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_ORDER_ADMIN_REQUEST': {
      return {
        ...state,
        orderList: {
          ...state.orderList,
          load: true,
        }
      }
    }
    case 'GET_ORDER_SUCCESS': {
      const { data } = action.payload
      return {
        ...state,
        orderList: {
          ...state.orderList,
          data: data,
          load: true,
        }
      }
    }
    case 'GET_ORDER_FAIL': {
      const { error } = action.payload
      return {
        ...state,
        orderList: {
          ...state.orderList,
          error: error,
          load: true,
        }
      }
    }
    case 'GET_ORDER_ADMIN_FILTER_REQUEST': {
      return {
        ...state,
        orderList: {
          ...state.orderList,
          load: true,
        }
      }
    }
    case 'GET_ORDER_FILTER_SUCCESS': {
      const { data } = action.payload
      return {
        ...state,
        orderList: {
          ...state.orderList,
          data: data,
          load: true,
        }
      }
    }
    case 'GET_ORDER_FILTER_FAIL': {
      const { error } = action.payload
      return {
        ...state,
        orderList: {
          ...state.orderList,
          error: error,
          load: true,
        }
      }
    }
    default: {
      return state;
    }
  }
}