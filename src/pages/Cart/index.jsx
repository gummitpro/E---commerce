import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import Header from "../commom/Header";
import Footer from "../commom/Footer";
import history from '../../utils/history';
import "./style.css";

import { incProductCartAction, decProductCartAction, removeProductCartAction } from '../../redux/actions';

function index({userInfo, shoppingCart, decCart, incCart, removeCart }) {
  var localStorageCart = shoppingCart.data;
  var totalMoney = 0;
  const renderListCart = localStorageCart.map((item, index) => {
    {item.productOptions.length !== {} ? totalMoney += (item.price + item.productOptions.price) * item.quantity
		: totalMoney += item.price * item.quantity}
    
    return (
      <div className="cart-product" key={index} >
        <div className="cart-product-left">
        <div className="cart-image" height="80" width="80">
          <img className="lazyload" alt="product" src={item.image} loading="lazy" decoding="async" />
        </div>
        <div className="cart-name" >
          <p>{item.name} {item.productOptions && item.productOptions.memory}</p>
        </div>
        </div>
        <div className="cart-action">
          <div className="cart-quanty">
            <button className="btn-quantity" onClick={() => { decCart({id: item.id, productOptions:item.productOptions}) }}>
              <span>-</span>
            </button>
            <input type="number" className="content-quantity" value={item.quantity} readOnly style={{ marginLeft: "10px" }} />
            <button className="btn-quantity" onClick={() => { incCart({id: item.id, productOptions:item.productOptions}) }}>
              <span>+</span>
            </button>

          </div>
          <div className="cart-price">
            <p>{Object.keys(item.productOptions).length > 0 ? (item.price + item.productOptions.price).toLocaleString('vi', { style: 'currency', currency: 'VND' }) : item.price.toLocaleString('vi', { style: 'currency', currency: 'VND' }) }</p>
          </div>
          <div className="cart-remove">
            <button className="btn-remove" onClick={() => { removeCart({id: item.id, productOptions:item.productOptions}) }}>
              <i className="fal fa-trash-alt"></i>
            </button>
          </div>
        </div>

      </div>
    )
  })

  const renderListCartMoblie = localStorageCart.map((item, index) => {
    {item.productOptions.length !== {} ? totalMoney += (item.price + item.productOptions.price) * item.quantity
		: totalMoney += item.price * item.quantity}
    return (
      <div className="cart-product-mobile" key={index} >
        <div className="cart-product-left-mobile">
          <div className="cart-image" height="80" width="80">
            <img className="lazyload" alt="product" src={item.image} loading="lazy" decoding="async" />
          </div>
        </div>
        <div className="cart-product-right-mobile">
          <div className="cart-product-right-content">
            <div className="cart-name-moblie" >
              <p>{item.name} {item.productOptions && item.productOptions.memory}</p>
            </div>
            <div className="cart-remove">
              <button className="btn-remove" onClick={() => { removeCart({id: item.id, productOptions:item.productOptions}) }}>
                <i className="fal fa-trash-alt"></i>
              </button>
            </div>
          </div>
          <div className="cart-product-right-content">
            <div className="cart-price-moblie">
              <p>{Object.keys(item.productOptions).length > 0 ? (item.price + item.productOptions.price).toLocaleString('vi', { style: 'currency', currency: 'VND' }) : item.price.toLocaleString('vi', { style: 'currency', currency: 'VND' }) }</p>
            </div>
            <div className="cart-quanty">
              <button className="btn-quantity" onClick={() => { decCart({id: item.id, productOptions:item.productOptions}) }}>
                <span>-</span>
              </button>
              <input type="number" className="content-quantity" value={item.quantity} readOnly style={{ marginLeft: "10px" }} />
              <button className="btn-quantity" onClick={() => { incCart({id: item.id, productOptions:item.productOptions}) }}>
                <span>+</span>
              </button>

            </div>
          </div>

        </div>

      </div>
    )
  })

  return (
    <>
      <Header />

      <div className="wrap-cart">
        {localStorageCart.length > 0 ? (
          <Row justify='center' className="content-cart" gutter={[16, 16]}>
            <Col span={16} md={16} sm={24} xs={24}>
              <h2>Giỏ hàng của bạn</h2>
              <div className="list-cart-product">
                {renderListCart}
              </div>
              <div className="list-cart-product-mobile">
                {renderListCartMoblie}
              </div>
            </Col>
            <Col span={8} md={8} sm={24} xs={24}>
              <h2>Thanh toán</h2>
              <div className="content-payment">
                <div className="info-payment">
                  <div>
                    <p>Tạm tính</p>
                    <p>{(totalMoney/2).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                  </div>
                  <div>
                    <p>Phí vận chuyển</p>
                    <p>{(50000).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                  </div>
                  <div>
                    <p>Thành tiền</p>
                    <p className="sumary-money">{(totalMoney/2 + 50000).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                  </div>
                  <button className="btn-payment" onClick={() => {
                    if(!userInfo.data.id){
                      return history.push({
                        pathname: "/dang-nhap",
                        state: {
                          prevPath: "/gio-hang"
                        }
                      })
                    }else{
                      return history.push(`/thanh-toan`)
                    }
                  }}>
                    Thanh toán {!userInfo.data.id && (<p style={{fontSize:"12px", marginBottom: "0px"}}>Vui lòng đăng nhâp</p>)}
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        ) : (
          <div className="content-cart-empty">
            <div className="content-image">
              <div className="image-empty">
                <img src="https://i.imgur.com/Drj57qu.png" alt="" />
              </div>
            </div>
            <p style={{ textAlign: "center" }}>Giỏ hàng chưa có sản phẩm nào</p>
            <button className="btn-payment" onClick={() => history.push(`/`)}>Mua sắm ngay</button>
          </div>

        )}

      </div>
      <Footer />
    </>
  )
}
const mapStateToProps = (state) => {
  const { userInfo } = state.userReducer;
  const { shoppingCart } = state.productReducer;
  return {
    shoppingCart,
    userInfo
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    decCart: (params) => dispatch(decProductCartAction(params)),
    incCart: (params) => dispatch(incProductCartAction(params)),
    removeCart: (params) => dispatch(removeProductCartAction(params))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(index);