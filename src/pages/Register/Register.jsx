import React, {useState} from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
// import history from '../../utils/history';
import './style.css';
import Header from '../commom/Header';
import Footer from '../commom/Footer';
import validation from './validation';
import { registerAction } from '../../redux/actions';

function Register({registerTask}) {
	const [values, setValues] = useState({
		userName: '',
		email: '',
		password: '',
		confirmPassword: ''
	});
	const [errors, setErrors] = useState({
		userName: '',
		email: '',
		password: '',
		confirmPassword: ''
	})

	const handleChange = e => {
		const {name, value} = e.target
		setValues({
			...values,
			[name]: value
		})
	}	
	function checkProperties(obj) {
		for (var key in obj) {
			 if (obj[key] !== "")
				  return false;
		}
		return true;
  }
	const handleSubmit = e => {

		let isValid = true;
		const newChangeError = {
			userName: '',
			email: '',
			password: '',
			confirmPassword: ''
		}

		if (values.email.length === 0) {
			isValid = false;
			newChangeError.email = "Vui lòng nhập mật khẩu cũ !";
		} else if(!/.+@.+\.[A-Za-z]+$/.test(values.email)){
			isValid = false;
			newChangeError.email = "Email không hợp lệ"
		}else {
			newChangeError.email = "";
		}


		if (values.userName.length === 0) {
			isValid = false;
			newChangeError.userName = "Vui lòng nhập tên tài khoản !";
		} else if(values.userName.length > 6){
			isValid = false;
			newChangeError.userName = "Tên tài khoản nhiều nhất là 6 ký tự";
		} else{
			newChangeError.userName = "";
		}

		if(values.password.length === 0 ){
			isValid = false;
			newChangeError.password = "Vui lòng nhập mật khẩu";
		}else if(values.password.length < 6){
			isValid = false;
			newChangeError.password = "Mật khẩu tối thiểu 6 ký tự";
		}else{
			newChangeError.password = "";
		}
	
		if(!values.confirmPassword){
			isValid = false;
			newChangeError.confirmPassword = "Vui lòng xác nhận lại mật khẩu";
		}else if(values.password !== values.confirmPassword){
			isValid = false;
			newChangeError.confirmPassword = "Mật khẩu không trùng khớp";
		}else{
			newChangeError.confirmPassword = ""
		}

		if (isValid) {
			console.log("values input: ", values);
			setErrors({ ...newChangeError })
			registerTask(values)
		} else {
			setErrors({ ...newChangeError })
		}


	}

	return (
		<>
			<Header/>
			<div className="wrap-register">
				<div className="content-register">
					<h1 className="sign-up-heading">Đăng ký</h1>
					<form className="sign-up-form">
						<div className="form-inputs">
							<label htmlFor="userName" className="sign-up-label">User name</label>
							<input
								id="userName"
								type="text"
								name="userName"
								className="sign-up-input"
								placeholder="Nhập tên đăng nhập của bạn"
								value ={values.userName}
								onChange={handleChange}
							/>
							{errors.userName && <p className="error">{errors.userName}</p>}
						</div>
						<div className="form-inputs">
							<label htmlFor="email" className="sign-up-label">Email</label>
							<input
								id="email"
								type="text"
								name="email"
								className="sign-up-input"
								placeholder="Nhập email của bạn"
								value ={values.email}
								onChange={handleChange}
							/>
							{errors.email && <p className="error">{errors.email}</p>}
						</div>
						<div className="form-inputs">
							<label htmlFor="password" className="sign-up-label">Password</label>
							<input
								id="password"
								type="password"
								name="password"
								className="sign-up-input"
								placeholder="Nhập mật khẩu của bạn"
								value ={values.password}
								onChange={handleChange}
							/>
							{errors.password && <p className="error">{errors.password}</p>}
						</div>
						<div className="form-inputs">
							<label htmlFor="password" className="sign-up-label">Confirm Password</label>
							<input
								id="confirmPassword"
								type="password"
								name="confirmPassword"
								className="sign-up-input"
								placeholder="Xác nhận mật khẩu của bạn"
								value ={values.confirmPassword}
								onChange={handleChange}
							/>
							{errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
						</div>
						<div className="btn">
							<button className="sign-up-submit" type="button" onClick={() => handleSubmit()}>
								Đăng ký
							</button>
							<p>Bạn đã có tài khoản <Link to ="/dang-nhap">Đăng nhập</Link></p>
							
						</div>
						<div className="sign-up-or"><span></span></div>
						<button className="sign-up-social-google">
							<i className="fa fa-google sign-up-social-google-icon"></i>
							<span className="sign-up-social-google-text">Tiếp tục bằng Google</span>
						</button>
						<button className="sign-up-social-facebook">
							<i className="fa fa-facebook sign-up-social-facebook-icon"></i>
							<span className="sign-up-social-facebook-text">Tiếp tục bằng Facebook</span>
						</button>
					</form>
				</div>
			</div>
			<Footer/>
		</>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		registerTask: (params) => dispatch(registerAction(params)),
	};
}
export default connect(null, mapDispatchToProps)(Register)

