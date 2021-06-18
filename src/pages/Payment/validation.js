const validation = (values) => {
	let errors = {};

	if(!values.name ){
		errors.name = "Vui lòng nhập tên";
		
	}else{
		errors.name = ""
	}

	if(!values.phone ){
		errors.phone = "Vui lòng nhập số điện thoại";
	}else if(!/((09|03|07|08|05)+([0-9]{8})\b)/g.test(values.phone)){
		errors.phone = "Số điện thoại không hợp lệ"
	}else{
		errors.phone = ""
	}

	if(!values.city ){
		errors.city = "Vui lòng chọn thành phố hoặc tỉnh";
	}else{
		errors.city = ""
	}

	if(!values.district){
		errors.district = "Vui lòng chọn quận hoặc huyện";	
	}else{
		errors.district = ""
	}

	if(!values.wards ){
		errors.wards = "Vui lòng chọn phường hoặc xã";
	}else{
		errors.wards = ""
	}

	if(!values.village ){
		errors.village = "Vui lòng nhập thôn hoặc số nhà";
	}else{
		errors.village = ""
	}

	return errors;
}
export default validation;