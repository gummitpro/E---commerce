const validation = (values) => {
	let errors = {};
	if(!values.userName.trim() ){
		errors.userName = "Vui lòng nhập tên đăng nhập";
	}else if(values.userName.length > 6){
		errors.userName = "Tên đăng nhập không được dài quá 6 ký tự";
	}

	if(!values.email.trim() ){
		errors.email = "Vui lòng nhập email";
		
	}else if(!/.+@.+\.[A-Za-z]+$/.test(values.email)){
		errors.email = "Email không hợp lệ"
	}
	if(!values.password ){
		errors.password = "Vui lòng nhập mật khẩu";
	}else if(values.password.length < 6){
		errors.password = "Mật khẩu tối thiểu 6 ký tự";
	}

	if(!values.confirmPassword){
		errors.confirmPassword = "Vui lòng xác nhận lại mật khẩu";
	}else if(values.password !== values.confirmPassword){
		errors.confirmPassword = "Mật khẩu không trùng khớp";
	}
	return errors;
}
export default validation;