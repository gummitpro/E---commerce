import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import {  Redirect } from 'react-router-dom';
import { Row, Col } from 'antd';

import Header from "../commom/Header";
import Footer from "../commom/Footer";
import history from '../../utils/history';
import { paymentAction } from '../../redux/actions'
import validation from './validation';
import '../../pages/Payment/style.css';

import {URL, URL_ADDRESS} from '../../contrains/App';

function Index({ shoppingCart, userInfo, paymentTask }) {
	
	const [values, setValues] = useState({
		name		: '',
		phone		: '',
		city		: '', // thanh pho
		district : '', // quận / huyện 
		wards		: '', // phường xã
		village	: '', // thôn (dc chi tiet)
		noteOrder: '',
		
	});
	
	const [errors, setErrors] = useState({
		name		: '',
		phone		: '',
		city		: '', // thanh pho
		district : '', // quận / huyện 
		wards		: '', // phường xã
		village	: '', // thôn (dc chi tiet)
		noteOrder: '',
	})
	
	const [countries, setCountries] = useState([]);
	const [districtss, setDistrict] = useState([]);
	const [wards, setWards] = useState([]);


	const fetchCountryData = async() => {
		const response = await fetch(URL_ADDRESS + "/city");
		const aa = await response.json()
		setCountries(aa)
	}
	async function fetchDistrictData(cityData){
		const [code] = cityData.split("/")
		const response = await fetch(URL_ADDRESS + "/provider?parentcode="+code);
		const bb = await response.json()
		setDistrict(bb)
	}

	async function fetchWardsData(districtData){
		const [code] = districtData.split("/")
		const response = await fetch(URL_ADDRESS + "/ward?parentcode="+code);
		const cc = await response.json()
		setWards(cc)
	}
	// 48/Thành_phô_Đà_Nẵng
	useEffect(()=>{
		fetchCountryData()
	}, [])
	useEffect(()=>{
		fetchDistrictData(values.city)
	}, [values.city])
	useEffect(()=>{
		fetchWardsData(values.district)
	}, [values.district])

	if (localStorage.getItem("userInfo") === null) {
		return <Redirect to="/dang-nhap" />;
	}

	function renderCity(){
		return countries.map((item, index) => {
			return (
				<option key={index} value={item.code+"/"+item.name}>{item.name}</option>
			)
		})
	}
	
	function renderDistrict(){
		return districtss.map((item, index) => {
			return (
				<option key={index} value={item.code+"/"+item.name}>{item.name}</option>
			)
		})
	}

	function renderWard(){
		return wards.map((item, index) => {
			return (
				<option key={index} value={item.code+"/"+item.name}>{item.name}</option>
			)
		})
	}

	const handleChange = e => {
		const { name, value } = e.target
		setValues({
			...values,
			[name]: value
		})
	}
	var totalMoney = 0;
	var totalFinalMoney = 0;
	const renderListCart = shoppingCart.data.length > 0 ? shoppingCart.data.map((item, index) => {
		{item.productOptions.length !== {} ? totalMoney += (item.price + item.productOptions.price) * item.quantity
		: totalMoney += item.price * item.quantity}
		return (
			<div className="payment-cart" key={index}>
				<div height="80" width="80" className="payment-cart-img">
					<img alt="product" src={item.image} loading="lazy" />
				</div>
				<div className="cart-infor">
					<a target="_blank" href="/smart-tivi-samsung-4k-55-inch-ua55tu7000kxxv-s200301303.html">
						<div className="payment-cart-name">{item.name} {item.productOptions && item.productOptions.memory}</div>
					</a>
					<div className="payment-cart-number">Số lượng: {item.quantity}</div>
					<span className="payment-cart-price">{(item.price + item.productOptions.price).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
				</div>
			</div>
		)

	}) : (
		<div>
			<p style={{ textAlign: "center" }}>Giỏ hàng chưa có sản phẩm nào</p>
         <button className="btn-payment" onClick={() => history.push(`/`)}>Hãy mua sắm nào </button>
		</div>
	);

	function getCurrentTime(){
		var currentdate = new Date(); 
		var datetime = currentdate.getDate() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getFullYear() + "-"  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

		return datetime;
	}

	function handelPayment(){
		let isValid = true;
		const newChangeError = {
			name		: '',
			phone		: '',
			city		: '', // thanh pho
			district : '', // quận / huyện 
			wards		: '', // phường xã
			village	: '', // thôn (dc chi tiet)
			noteOrder: '',
		}

		if(!values.name ){
			isValid = false;
			newChangeError.name = "Vui lòng nhập tên";
			
		}else{
			newChangeError.name = ""
		}
	
		if(!values.phone ){
			isValid = false;
			newChangeError.phone = "Vui lòng nhập số điện thoại";
		}else if(!/((09|03|07|08|05)+([0-9]{8})\b)/g.test(values.phone)){
			isValid = false;
			newChangeError.phone = "Số điện thoại không hợp lệ"
		}else{
			newChangeError.phone = ""
		}
	
		if(!values.city ){
			isValid = false;
			newChangeError.city = "Vui lòng chọn thành phố hoặc tỉnh";
		}else{
			newChangeError.city = ""
		}
	
		if(!values.district){
			isValid = false;
			newChangeError.district = "Vui lòng chọn quận hoặc huyện";	
		}else{
			newChangeError.district = ""
		}
	
		if(!values.wards ){
			isValid = false;
			newChangeError.wards = "Vui lòng chọn phường hoặc xã";
		}else{
			newChangeError.wards = ""
		}
	
		if(!values.village ){
			isValid = false;
			newChangeError.village = "Vui lòng nhập thôn hoặc số nhà";
		}else{
			newChangeError.village = ""
		}


		if (isValid) {
			console.log("values input: ", values);
			setErrors({ ...newChangeError })
			paymentTask({
				consigneeInfor: {
					...values,
					city: values.city.split("/")[1],
					district: values.district.split("/")[1],
					wards: values.wards.split("/")[1]
				}, 
				userId: userInfo.data.id,
				cart: shoppingCart.data,
				payment: false,
				status: 1,
				currentTime: getCurrentTime(),
				totalOrder: totalFinalMoney
			})
			localStorage.removeItem("shoppingCart");
			history.push(`/thanh-toan-thanh-cong`)

		} else {
			setErrors({ ...newChangeError })
		}
	}

	function isEmpty_ (obj) {
		return Object.keys(obj).find((k) => obj[k] === "")
		// return Object.values(obj).findIndex(element => element !== "");
  	}

	return (
		<>
			<Header />
			<div className="wrap-payment">
				<Row gutter={[16, 16]}>
					<Col span={16} md={16} sm={24} xs={24}>
						<div className="info-delivery commomBackgroundBoder" >
							<h3>Thông tin khách hàng</h3>
							<div className="infor-customer">
								<div className="form-group">
									<input
										type="text"
										name="name"
										className="form-control"
										placeholder="Họ và tên"
										value={values.name}
										onChange={handleChange}
									/>
									{errors.name && <p className="error">{errors.name}</p>}
								</div>
								<div className="form-group">
									<input
										type="text"
										name="phone"
										className="form-control"
										placeholder="Số điện thoại"
										value={values.phone}
										onChange={handleChange}
									/>
									{errors.phone && <p className="error">{errors.phone}</p>}
								</div>
							</div>
							<h3 style={{ marginTop: "20px" }}>Nơi nhận hàng</h3>
							<div className="infor-address">
								<div className="city">
									<div className="form-group">
										<select className="form-control" name="city" onChange={handleChange} value={values.city}>
											<option value="">Chọn thành phố / huyện</option>
											{renderCity()}
										</select>
										{errors.city && <p className="error">{errors.city}</p>}
									</div>
									<div className="form-group" >
										<select className="form-control" name="district" onChange={handleChange} value={values.district}>
											<option value="">Chọn quận / huyện</option>
											{renderDistrict()}
										</select>
										{errors.district && <p className="error">{errors.district}</p>}
									</div>
								</div>
								<div className="town">
									<div className="form-group">
										<select className="form-control" name="wards" onChange={handleChange} value={values.wards}>
											<option value="">Chọn phường / xã</option>
											{renderWard()}
										</select>
										{errors.wards && <p className="error">{errors.wards}</p>}
									</div>
									<div className="form-group">
										<input
											type="text"
											name="village"
											className="form-control"
											placeholder="Số nhà / thôn"
											value={values.village}
											onChange={handleChange}
										/>
										{errors.village && <p className="error">{errors.village}</p>}
									</div>
								</div>
							</div>
						</div>
						<div className="note-order commomBackgroundBoder">
							<h3>Ghi chú cho đơn hàng</h3>
							<div className="form-group-note">
								<textarea
									type="text"
									name="noteOrder" 
									value={values.noteOrder}
									onChange={handleChange}
									className="form-control"
									placeholder="Nhập thông tin ghi chú cho nhà bán hàng"
								/>
							</div>
						</div>
					</Col>
					<Col span={8} md={8} sm={24} xs={24}>
						<div className="infor-order commomBackgroundBoder" >
							<h3>Thông tin đơn hàng</h3>
							<div className="list-cart">
								{renderListCart}
							</div>
						</div>
						{shoppingCart.data.length > 0 && (
							<div className="content-payment ppay-ment">
								<div className="info-payment">
									<div>
										<p>Tạm tính</p>
										<p>{totalMoney.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
									</div>
									<div>
										<p>Phí vận chuyển</p>
										<p>{(50000).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
									</div>
									<div>
										<p>Thành tiền</p>
										<p className="sumary-money">{(totalFinalMoney = totalMoney + 50000).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
									</div>
									<button className="btn-payment" onClick={() => {handelPayment();}}>
										Thanh toán ngay
									</button>
								</div>
							</div>
						)}

					</Col>
				</Row>
			</div>
			<Footer />
		</>
	)
}
const mapStateToProps = (state) => {
	const { shoppingCart } = state.productReducer;
	const { userInfo } = state.userReducer;
	return {
		shoppingCart,
		userInfo
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		paymentTask: (params) => dispatch(paymentAction(params))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
