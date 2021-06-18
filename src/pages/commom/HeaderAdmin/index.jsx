import React from 'react'
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Input, Popover, Button } from 'antd';
import { logoutAction } from '../../../redux/actions'
import history from '../../../utils/history'
import '../HeaderAdmin/style.css'
const { Search } = Input;

function Header({ userInfo, logout }) {
	
	

	const contentUser = (
		<div className="sub-user">
			<Button onClick={() => logOut()}>
				<div>Đăng suất</div>
			</Button>
		</div>
	)
	function logOut() {
		history.replace({ pathname: '/' })
		localStorage.clear()
		logout()
	}

	return (
		<>
			<header>
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
					<div> <h1>Quản Lý Cửa Hàng</h1>	</div>
					<ul className="header-menu">
						{userInfo.data.id ?
							(
								<li title="Cá nhân" className="login-hover">
									<Popover placement="bottom" content={contentUser} trigger="hover">
										<Button>
											<Link to="/admin">
												<div className="center-icon">
													<span><i className="far fa-user"></i></span>
												</div>
												<div className="scroll ">
													<span >Admin</span>
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
			</header>

		</>
	)
}
const mapStateToProps = (state) => {
	const { userInfo } = state.userReducer;
	return {
		userInfo,
	}
};
const mapDispatchToProps = (dispatch) => {
	return {
		logout: (params) => dispatch(logoutAction(params))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)

