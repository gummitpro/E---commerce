import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import {Link } from "react-router-dom";
import { Input, Popover, Button } from 'antd';
import { logoutAction } from '../../../redux/actions'
import history from '../../../utils/history'
import '../Header/style.css'
import 'antd/dist/antd.css';
const { Search } = Input;

const onSearch = (value) => {
	history.push(`/search?q=` + value.trim().split(' ').join('+'))
};
function Header({ userInfo, logout, shoppingCart, numberCart }) {
	var renderListCart = [];
	if (shoppingCart.data.length > 0) {
		renderListCart = shoppingCart.data.map((item, index) => {
			return (
				<Link to={`/product/${item.id}`} key={index+112} >
					<div className="sub-cart" >
						<div className="cart-header-image">
							<img src={item.image} alt="pic" />
						</div>
						<div className="description-sub">
							<div className="cart-header-name">{item.name} {item.productOptions && item.productOptions.memory}</div>
							<div>{"Số lượng: " + item.quantity}</div>
							<div>{Object.keys(item.productOptions).length > 0 ? (item.price + item.productOptions.price).toLocaleString('vi', { style: 'currency', currency: 'VND' }) : item.price.toLocaleString('vi', { style: 'currency', currency: 'VND' }) }</div>
						</div>
					</div>
				</Link>
			)
		})
	} else {
		renderListCart =  (
			<div>
				<p style={{textAlign:"center"}}>Không có sản phẩm nào trong giỏ hàng</p>
				<button className="btn btn-cart" onClick={()=> history.push(`/`)}>Mua sắm ngay</button>
			</div>
		)
	}

	const contentUser = (
		<div className="sub-user">
			{userInfo.data.admin ? null :
			<Button onClick={() => history.replace({ pathname: '/thong-tin-ca-nhan' })}>Thông tin cá nhan</Button>
			}
			<Button onClick={() => logOut()}>
				<div>Đăng suất</div>
			</Button>
		</div>
	)
	function logOut() {
		history.replace({ pathname: '/' })
		localStorage.removeItem("userInfo");
		logout()
	}

	return (
		<>
			<header >
				<div className="container-header">
					<Link to="/">
						<div className="brand">
							<div className="brand-img">
								<img src="https://cdn.thukyluat.vn/nhch-images//CauHoi_Hinh/9eb6abaa-8cda-456c-ad66-26ba4da23ffe.jpg?fbclid=IwAR0t7ycFiSjYHuDoezWnRRuzVWsLYvRYPvxXjGfgVoXxfCzuoeECKgR-EWM" alt="logo" />
							</div>
							<div className="brand-name">
								<h1>LION</h1>
							</div>
						</div>
					</Link>
					<div className=" header-search">

						<Search
							placeholder="Tìm kiếm sản phẩm"
							allowClear
							enterButton
							size="large"
							onSearch={onSearch}
						/>
					</div>
					<ul className="header-menu">
						<li title="Giỏ hàng" className="cart-wrapp content-cart-number" >
							<Popover 
								className="btn-hover-cart" 
								placement="bottomRight" 
								content={
									<div className="wrap-list-cart-header" >
										{renderListCart}
									</div>
								} 
								trigger="hover"
							>
								<Button>
									<Link to="/gio-hang">
										<div className="center-icon ">
											<span><i className="far fa-shopping-cart"></i></span>
										</div>
										<div className="number-cart">
												{/* <span>{shoppingCart.data.length}</span> */}
												<span>{numberCart}</span>
											</div>
										<div className="scroll">
											<span >Giỏ hàng</span>
											
										</div>
									</Link>
								</Button>
							</Popover>
						</li>
						{userInfo.data.id ?
							(
								<li title="Cá nhân" className="login-hover">
									<Popover placement="bottom" content={contentUser} trigger="hover">
										<Button>
											{userInfo.data.admin ?
											<Link to="/admin">
												<div className="center-icon">
													<span><i className="far fa-user"></i></span>
												</div>
												<div className="scroll ">
													<span >{userInfo.data.userName}</span>
												</div>
											</Link> : 
											<Link to="/thong-tin-ca-nhan">
												<div className="center-icon">
													<span><i className="far fa-user"></i></span>
												</div>
												<div className="scroll ">
													<span >{userInfo.data.userName}</span>
												</div>
											</Link>
											}
											
										</Button>
									</Popover>
								</li>
							) : (
								<>
									<li title="Đăng nhập">
										<Button>
											<Link to="/dang-nhap">
												<div className="center-icon">
													<span><i className="far fa-sign-in-alt"></i></span>
												</div>
												<div className="scroll ">
													<span >Đăng nhập</span>
												</div>
											</Link>
										</Button>
									</li>
									<li title="Đăng ký">
										<Button>
											<Link to="/dang-ky">
												<div className="center-icon">
													<span><i className="far fa-book"></i></span>
												</div>
												<div className="scroll ">
													<span >Đăng ký</span>
												</div>
											</Link>
										</Button>
									</li>
								</>
							)
						}
					</ul>

				</div>
			</header>
			<header className="header-mobile">
				<div className="header-mobile-top">
					<div className="header-moblie-logo">
						<Link to="/">
							<div className="brand">
								<div className="brand-img">
									<img src="https://cdn.thukyluat.vn/nhch-images//CauHoi_Hinh/9eb6abaa-8cda-456c-ad66-26ba4da23ffe.jpg?fbclid=IwAR0t7ycFiSjYHuDoezWnRRuzVWsLYvRYPvxXjGfgVoXxfCzuoeECKgR-EWM" alt="logo" />
								</div>
								<div className="brand-name">
									<h1>LION</h1>
								</div>
							</div>
						</Link>
					</div>
					<div className="header-mobile-menu">
					<ul className="header-menu">
						<li title="Giỏ hàng" className="cart-wrapp content-cart-number" >
							{/* <Popover 
								className="btn-hover-cart" 
								placement="bottomRight" 
								style={{ width: "384px",maxHeight:" 400px" }} 
								content={renderListCart} 
								trigger="hover"
							> */}
								<Button>
									<Link to="/gio-hang">
										<div className="center-icon ">
											<span><i className="far fa-shopping-cart"></i></span>
										</div>
										<div className="number-cart">
												{/* <span>{shoppingCart.data.length}</span> */}
												<span>{numberCart}</span>
											</div>
										<div className="scroll">
											<span >Giỏ hàng</span>
											
										</div>
									</Link>
								</Button>
							{/* </Popover> */}
						</li>
						{userInfo.data.id ?
							(
								<li title="Cá nhân" className="login-hover">
									<Popover placement="bottom" content={contentUser} trigger="hover">
										<Button>
											<Link to="/thong-tin-ca-nhan">
												<div className="center-icon">
													<span><i className="far fa-user"></i></span>
												</div>
												<div className="scroll ">
													<span >{userInfo.data.userName}</span>
												</div>
											</Link>
										</Button>
									</Popover>
								</li>
							) : (
								<>
									<li title="Đăng nhập">
										<Button>
											<Link to="/dang-nhap">
												<div className="center-icon">
													<span><i className="far fa-sign-in-alt"></i></span>
												</div>
												<div className="scroll ">
													<span >Đăng nhập</span>
												</div>
											</Link>
										</Button>
									</li>
									<li title="Đăng ký">
										<Button>
											<Link to="/dang-ky">
												<div className="center-icon">
													<span><i className="far fa-book"></i></span>
												</div>
												<div className="scroll ">
													<span >Đăng ký</span>
												</div>
											</Link>
										</Button>
									</li>
								</>
							)
						}
					</ul>
					</div>
				</div>
				<div className="header-mobile-bottom">
					<Search
						placeholder="Tìm kiếm sản phẩm"
						allowClear
						enterButton
						size="large"
						onSearch={onSearch}
					/>
				</div>
			</header>
		</>
	)
}
const mapStateToProps = (state) => {
	const { userInfo } = state.userReducer;
	const {shoppingCart, numberCart} = state.productReducer;
	return {
		userInfo,
		shoppingCart,
		numberCart
	}
};
const mapDispatchToProps = (dispatch) => {
	return {
		logout: (params) => dispatch(logoutAction(params))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)

