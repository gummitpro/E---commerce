const validation = (values) => {
	let errors = {};

	if(!values.name ){
		errors.name = "Vui lòng nhập tên";
	}else{
		errors.name = ""
	}

	if(!values.email ){
		errors.email = "Vui lòng nhập email";
	}else{
		errors.email = ""
	}

	if(!values.contentComment ){
		errors.contentComment = "Vui lòng nhập nội dung đánh giá";
	}else{
		errors.contentComment = ""
	}
	return errors;
}
export default validation;