import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Row, Col, Input } from 'antd';

import {changePasswordAction} from '../../../../redux/actions'
import './style.css'

function ChangePassword({userInfo, changePasswordTask}) {

	// console.log("userInfo: ",userInfo)

	const [values, setValues] = useState({
		id: userInfo.data.id,
		email: userInfo.data.email,
		passwordOld: '',
		passwordNew: '',
		confirmPassword: '',
	});

	const [errors, setErrors] = useState({
		passwordOld: '',
		passwordNew: '',
		confirmPassword: '',
	})

	const handleChange = e => {
		const { name, value } = e.target
		setValues({
			...values,
			[name]: value
		})
	}

	function handleSubmit() {
		let isValid = true;
		const newChangeError = {
			errPasswordOld: '',
			errPasswordNew: '',
			confirmPassword: '',
		}

		if (values.passwordOld.length === 0) {
			isValid = false;
			newChangeError.errPasswordOld = "Vui lòng nhập mật khẩu cũ !";
		} else {
			newChangeError.errPasswordOld = "";
		}

		if (values.passwordNew.length === 0) {
			isValid = false;
			newChangeError.errPasswordNew = "Vui lòng nhập mật khẩu mới !";
		} else {
			newChangeError.errPasswordNew = "";
		}

		if (values.confirmPassword.length === 0) {
			isValid = false;
			newChangeError.confirmPassword = "Vui lòng nhập lại mật khẩu !";
		} else if (values.confirmPassword !== values.passwordNew) {
			isValid = false;
			newChangeError.confirmPassword = "Mật khẩu không trùng khớp";
		} else {
			newChangeError.confirmPassword = "";
		}

		if (isValid) {
			// console.log(values);
			changePasswordTask(values)
		} else {
			setErrors({ ...newChangeError })
		}
	}

	return (
		<>
			<Row gutter={[16, 16]}>
				<Col md={24} xs={24}>
					<div className="infor-account">
						<div className="row-form">
							<label htmlFor="">
								Mật khẩu cũ
							</label>
							<div className="form-right">
								<Input.Password
									size="large"
									placeholder="Nhập mật khẩu cũ"
									name="passwordOld"
									value={values.passwordOld}
									onChange={handleChange}
								/>
								{errors.errPasswordOld && <p className="error">{errors.errPasswordOld}</p>}

							</div>
						</div>
						<div className="row-form">
							<label htmlFor="">
								Mật khẩu mới
							</label>
							<div className="form-right">
								<Input.Password
									size="large"
									placeholder="Nhập mật khẩu mới"
									name="passwordNew"
									value={values.passwordNew}
									onChange={handleChange}
								/>
								{errors.errPasswordNew && <p className="error">{errors.errPasswordNew}</p>}
							</div>

						</div>
						<div className="row-form">
							<label htmlFor="">
								Nhập lại mật khẩu
							</label>
							<div className="form-right">
								<Input.Password
									size="large"
									placeholder="Xác nhận mật khẩu"
									name="confirmPassword"
									value={values.confirmPassword}
									onChange={handleChange}
								/>
								{errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
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
		changePasswordTask: (params) => dispatch(changePasswordAction(params))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
