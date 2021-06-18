import { notification } from 'antd';
var localStorageCart = JSON.parse(localStorage.getItem("shoppingCart"));

const initialState = {
  productList: {
    data: [],
    load: false,
    error: '',
  },
  productDetail: {
    data: {
      comments: []
    },

    load: false,
    error: '',
  },
  productListSame: {
    data: [],
    load: false,
    error: '',
  },

  numberCart: localStorageCart ? localStorageCart.length : 0,
  shoppingCart: {
    data: localStorageCart ? localStorageCart : [],
    load: false,
    error: '',
  },

  commentList: {
    data: [],
    load: false,
    error: '',
  },

  productListSearch: {
    data: [],
    load: false,
    error: '',
  },

};
const getNotificationStyle = type => {
  return {
    success: {
      color: 'rgba(0, 0, 0, 0.65)',
      border: '1px solid #b7eb8f',
      backgroundColor: '#f6ffed'
    },
    error: {
      color: 'rgba(0, 0, 0, 0.65)',
      border: '1px solid #ffa39e',
      backgroundColor: '#fff1f0'
    }
  }[type]
}
const openCustomNotificationWithIcon = type => {
  notification[type]({
    message: type==="success" ? 'Thêm sản phẩm thành công' : "Thêm sản phẩm không thành công",
    style: getNotificationStyle(type),
    duration: 2
  })
}

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_PRODUCT_LIST_REQUEST': {
      return {
        ...state,
        productList: {
          ...state.productList,
          load: true,
        },
      }
    }
    case 'GET_PRODUCT_LIST_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        productList: {
          ...state.productList,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_PRODUCT_LIST_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        productList: {
          ...state.productList,
          load: false,
          error: error,
        },
      }
    }
    case 'ADD_PRODUCT_ADMIN_REQUEST': {
      return {
        ...state,
        productList: {
          ...state.productList,
          load: true,
        }
      }
    }
    case 'ADD_PRODUCT_ADMIN_SUCCESS': {
      const { data } = action.payload
      return {
        ...state,
        productList: {
          ...state.productList,
          load: false,
          data: data
        }
      }
    }
    case 'ADD_PRODUCT_ADMIN_FAIL': {
      const { error } = action.payload
      return {
        ...state,
        productList: {
          ...state.productList,
          load: false,
          error: error
        }
      }
    }
    case 'EDIT_PRODUCT_ADMIN_REQUEST': {
      return {
        ...state,
        productList: {
          ...state.productList,
          load: true,
        }
      }
    }
    case 'EDIT_PRODUCT_ADMIN_SUCCESS': {
      const { id, name, price } = action.payload
      const newProductList = state.productList
      newProductList.data.splice(id, 1, { name: name, price: price })
      return {
        ...state,
        productList: {
          ...newProductList,
          load: false,
          data: newProductList.data
        }
      }
    }
    case 'GET_PRODUCT_DETAIL_REQUEST': {
      return {
        ...state,
        productDetail: {
          ...state.productDetail,
          load: true,
        },
      }
    }
    case 'GET_PRODUCT_DETAIL_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        productDetail: {
          ...state.productDetail,
          data: data,
          load: false,
        },
      }
    }
    // const { error } = action.payload;
    //   return {
    //     ...state,
    //     productList: {
    //       ...state.productList,
    //       load: false,
    //       error: error,
    //     },
    //   }
    case 'GET_PRODUCT_DETAIL_FAIL': {
      const { error } = action.payload;
      console.log("error: ", error)
      return {
        ...state,
        productDetail: {
          ...state.productDetail,
          load: false,
          error: error,
        },
      }
    }
    case 'GET_PRODUCT_SAME_REQUEST': {
      return {
        ...state,
        productListSame: {
          ...state.productListSame,
          load: true,
        },
      }
    }
    case 'GET_PRODUCT_SAME_SUCCESS': {
      const { data } = action.payload;
      // console.log("state product reducer : ", data)
      return {
        ...state,
        productListSame: {
          ...state.productListSame,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_PRODUCT_SAME_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        productListSame: {
          ...state.productListSame,
          load: false,
          error: error,
        },
      }
    }
    case 'ADD_PRODUCT_CART_REQUEST': {
     
      const { data } = action.payload;
      if (state.numberCart === 0) {
        let cart = {
          id: action.payload.id,
          quantity: 1,
          name: action.payload.name,
          image: action.payload.image,
          price: action.payload.price,
          inventory: action.payload.inventory,
          productOptions: action.payload.optionSelected ? action.payload.optionSelected : {}
        }
        openCustomNotificationWithIcon('success')
        state.shoppingCart.data.push(cart);
      }
      else {
        let checkQuantity = false;
        let check = false;
        state.shoppingCart.data.map((item, key) => {
          if (item.id === action.payload.id) {
            if(Object.keys(action.payload.optionSelected).length !== 0){
              if(item.productOptions.id === action.payload.optionSelected.id){
                if(item.quantity < item.inventory){
                  console.log("chan: ", item.quantity,  item.inventory)
                  openCustomNotificationWithIcon('success')
                  state.shoppingCart.data[key].quantity++;
                  check = true;
                }else{
                  checkQuantity = true;
                  if(item.quantity >= item.inventory){
                    openCustomNotificationWithIcon('error')
                  }
                }
                
              }
            }else if(item.id === action.payload.id && Object.keys(action.payload.optionSelected).length === 0){
              if(item.quantity < item.inventory){
                console.log("chan: ", item.quantity,  item.inventory)
                console.log("hợp lệ")
                openCustomNotificationWithIcon('success')
                state.shoppingCart.data[key].quantity++;
                check = true;
              }else {
                checkQuantity = true;
                if(item.quantity >= item.inventory){
                  openCustomNotificationWithIcon('error')
                }
                console.log("không hợp lệ")
              }
            }
          }
        });
        if (!check && !checkQuantity) {
          console.log("123");
          let _cart = {
            id: action.payload.id,
            quantity: 1,
            name: action.payload.name,
            image: action.payload.image,
            price: action.payload.price,
            inventory: action.payload.inventory,
            productOptions: action.payload.optionSelected ? action.payload.optionSelected : {}
          }
          openCustomNotificationWithIcon('success')
          state.shoppingCart.data.push(_cart);
        }else if(check === true && checkQuantity === true){
          openCustomNotificationWithIcon('error')
        }
      }
      localStorage.setItem("shoppingCart", JSON.stringify(state.shoppingCart.data))
      return {
        ...state,
        numberCart: localStorageCart ? state.shoppingCart.data.length : 1
      }
    }
    case 'DEC_PRODUCT_CART_REQUEST': {
      console.log("action.payload: ", action.payload)
      let tempCart = [];
      if(Object.keys(action.payload.productOptions).length > 0){
        console.log("item.id === action.payload");
        tempCart = state.shoppingCart.data.map((item) =>{
          if(item.productOptions.id === action.payload.productOptions.id ){
            item = {...item, quantity: item.quantity > 1 ? item.quantity-1 : 1}
          }
          return item;
        })
      }else{
        console.log("item.id === action.payload1111");
        tempCart = state.shoppingCart.data.map((item) =>{
          console.log("item.id === action.payload: ", item.id,  action.payload, item.id === action.payload)
          if(item.id === action.payload.id ){
            item = {...item, quantity: item.quantity > 1 ? item.quantity-1 : 1}
          }
          return item;
        })
      }
      
      localStorage.setItem("shoppingCart", JSON.stringify(tempCart))
      return {
        ...state,
        shoppingCart: {
          data: tempCart,
          load: false,
          error: '',
        },
      }
    }
    case 'INC_PRODUCT_CART_REQUEST': {
      let tempCart = [];
      if(Object.keys(action.payload.productOptions).length > 0){
        tempCart = state.shoppingCart.data.map((item) =>{
          if(item.productOptions.id === action.payload.productOptions.id ){
            if(item.quantity < item.inventory){
              item = {...item, quantity: item.quantity+1}
            }
          }
          return item;
        })
      }else{
        tempCart = state.shoppingCart.data.map((item) =>{
          if(item.id === action.payload.id ){
            if(item.productOptions.id === action.payload.productOptions.id ){
            
              if(item.quantity < item.inventory){
                item = {...item, quantity: item.quantity+1}
              }
            }
          }
          return item;
        })
      }
      
      localStorage.setItem("shoppingCart", JSON.stringify(tempCart))
      return {
        ...state,
        shoppingCart: {
          data: tempCart,
          load: false,
          error: '',
        },
      }
    }
    case 'REMOVE_PRODUCT_CART_REQUEST': {
      let tempCart = [];
      if(Object.keys(action.payload.productOptions).length > 0){
        tempCart = state.shoppingCart.data.filter((item) =>{
          return item.productOptions.id !== action.payload.productOptions.id 
        })
      }else{
        tempCart = state.shoppingCart.data.filter((item) => {
          return item.id !== action.payload.id
        })
      }
      
      localStorage.setItem("shoppingCart", JSON.stringify(tempCart))
      return {
        ...state,
        numberCart: state.numberCart - 1,
        shoppingCart: {
          data: tempCart,
          load: false,
          error: '',
        },
      }
    }
    case 'ADD_COMMENT_REQUEST': {
      return {
        ...state,
        commentList: {
          ...state.commentList,
          load: true,
        }
      }
    }
    case 'ADD_COMMENT_SUCCESS': {
      const { data } = action.payload
      console.log("ADD_COMMENT_SUCCESSL:  ", action.payload)
      let newArr = [...state.commentList.data];
      // if(state.commentList.data.length === 5){
      //   newArr.length = 4
      // }
      newArr.unshift(data);
      return {
        ...state,
        commentList: {
          ...state.commentList,
          data: newArr,
          load: false,
        }
      }
    }
    case 'ADD_COMMENT_FAIL': {
      const { error } = action.payload
      return {
        ...state,
        commentList: {
          ...state.commentList,
          load: false,
          error: error
        }
      }
    }
    case 'GET_COMMENT_LIST_REQUEST': {
      return {
        ...state,
        commentList: {
          ...state.commentList,
          load: true,
        }
      }
    }
    case 'GET_COMMENT_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        commentList: {
          ...state.commentList,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_COMMENT_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        commentList: {
          ...state.commentList,
          load: false,
          error: error,
        },
      }
    }

    case 'GET_PRODUCT_LIST_SEARCH_REQUEST': {
      return {
        ...state,
        productListSearch: {
          ...state.productListSearch,
          load: true,
        },
      }
    }
    case 'GET_PRODUCT_LIST_SEARCH_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        productListSearch: {
          ...state.productListSearch,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_PRODUCT_LIST_SEARCH_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        productListSearch: {
          ...state.productListSearch,
          load: false,
          error: error,
        },
      }
    }

    case 'PAYMENT_SUCCESS': {
      return {
        ...state,
        numberCart: 0,
        shoppingCart: {
          data: [],
          load: false,
          error: '',
        },
      }
    }

    default: {
      return state;
    }
  }
}
