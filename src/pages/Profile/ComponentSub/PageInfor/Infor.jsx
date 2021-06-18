import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux';
import moment from 'moment';
import { Row, Col , Input, Radio, DatePicker } from 'antd';

import {changeInforAction, getUserInfoAction} from '../../../../redux/actions'

import './style.css'

function Infor({userInfo, changeInforTask}) {
	console.log("userInfo ơ ngoài: ",userInfo)
	var user = JSON.parse(localStorage.getItem('userInfo'));
	// console.log(userInfo)

	useEffect(() => {
		if(user.id){
			setValues({...values})
		}else{
		}
	 }, [userInfo.data]);

	const [values, setValues] = useState({
		id: userInfo.data.id,
		email: userInfo.data.email,
		userName: userInfo.data.userName ? userInfo.data.userName : "",
		fullname: "",
		gender: userInfo.data.gender !== ""  ? userInfo.data.gender : "Nam",
		phone: userInfo.data.phone ? userInfo.data.phone : '',
		date: userInfo.data.date ? userInfo.data.date : moment().format('L')
	});

	console.log("values: 111: ", values.fullname)

	const [errors, setErrors] = useState({
		email: '',
		fullname: '',
		userName: '',
		phone: '',
	})
	
	function handleChangeDate(date, dateString) {
		console.log("dateString dateString: ", dateString)
		setValues({...values, date: dateString})
	}
	// console.log("dateValue dateValue: ", dateValue)

	// console.log("values1: " , values)

	const handleChange = (e) => {

		const { name, value } = e.target
		setValues({
			...values,
			[name]:  value
		})
	}
	function validateEmail(email) {   
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
  	}
	function handleSubmit() {
		let isValid = true;
		const newChangeError = {
			email: '',
			userName: '',
			fullname: '',
			phone: '',
		}
		
		if (values.email.length === 0) {
			isValid = false;
			newChangeError.email = "Vui lòng nhập email !";
		} else if(!validateEmail(values.email)){
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

		if (values.fullname.length === 0) {
			isValid = false;
			newChangeError.fullname = "Vui lòng nhập tên đầy đủ !";
		} else {
			newChangeError.fullname = "";
		}

		if (values.phone.length === 0) {
			isValid = false;
			newChangeError.phone = "Vui lòng nhập số điện thoại !";
		} else if(!/((09|03|07|08|05)+([0-9]{8})\b)/g.test(values.phone)){
			isValid = false;
			newChangeError.phone = "Số điện thoại không hợp lệ"
		}else {
			newChangeError.phone = ""
		}


		if (isValid) {
			console.log("values input: ", values);
			setErrors({ ...newChangeError })
			changeInforTask(values)
			
		} else {
			setErrors({ ...newChangeError })
		}
	}
	console.log("error: ", errors);
	console.log("userInfo.data.gender: ", userInfo.data.gender, userInfo.data.gender === "")
	return (
		<>
			<Row gutter={[16, 16]}>
				<Col md={8} xs={24}>
					<div className="infor-user">
						<div className="infor-image">
							<img src="https://st.quantrimang.com/photos/image/072015/22/avatar.jpg" alt="avatar" />
						</div>
						<div className="infor-name">
							<h3>{userInfo.data.userName}</h3>
						</div>
					</div>
				</Col>
				<Col md={16} xs={24}>
					<div className="infor-account">
						<div className="row-form">
							<label htmlFor="">
								Họ và tên
							</label>
							<div className="form-right">
								<Input
									size="large"
									placeholder="Nhập họ và tên"
									name="fullname"
									value={values.fullname}
									onChange={handleChange}
								/>
								{errors.fullname && <p className="error">{errors.fullname}</p>}

							</div>
							
						</div>
						<div className="row-form">
							<label htmlFor="">
								Email
							</label>
							<div className="form-right">
								<Input
									size="large"
									placeholder="Nhập email của bạn"
									name="email"
									value={values.email}
									onChange={handleChange}
								/>
								{errors.email && <p className="error">{errors.email}</p>}

							</div>
						</div>
						<div className="row-form">
							<label htmlFor="">
								Tên đăng nhập
							</label>
							<div className="form-right">
								<Input
									size="large"
									placeholder="Nhập tên đăng nhập của bạn"
									name="userName"
									value={values.userName}
									onChange={handleChange}
								/>
								{errors.userName && <p className="error">{errors.userName}</p>}
							</div>
						</div>
						<div className="row-form">
							<label htmlFor="">
								Giới tính
							</label>
							<div className="form-right">
								{console.log("values.gender: ", values)}
								<Radio.Group 
									onChange={handleChange}  
									defaultValue={values.gender === "" ? "Nam" : values.gender}  
									value={values.gender === "" ? "Nam" : values.gender} 
									name="gender">
									<Radio value={"Nam"} >Nam</Radio>
									<Radio value={"Nữ"}>Nữ</Radio>
									<Radio value={"Khác"}>Khác</Radio>
								</Radio.Group>
							</div>
							
						</div>
						<div className="row-form">
							<label htmlFor="">
								Ngày sinh
							</label>
							<div className="form-right">
								<DatePicker 
									defaultValue={moment(moment().format('L'), "DD/MM/YYYY")}
									onChange={handleChangeDate} 
									format="DD/MM/YYYY" 
								/>
							</div>
						</div>
						<div className="row-form">
							<label htmlFor="">
								Số điện thoại
							</label>
							
							<div className="form-right">
								<Input
									size="large"
									placeholder="Nhập số điện thoại"
									name="phone"
									value={values.phone}
									onChange={handleChange}
								/>
								{errors.phone && <p className="error">{errors.phone}</p>}
							</div>
						</div>
						<div className="button-submit">
							<button onClick={() => handleSubmit()}>
								Cập nhật
							</button>
						</div>
					</div>
				</Col>
			</Row>

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
		changeInforTask: (params) => dispatch(changeInforAction(params)),
		getUserInfo: (params) => dispatch(getUserInfoAction(params)),
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(Infor)
