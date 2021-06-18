import React, { useEffect } from 'react'
import { useState } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { Row, Col, Rate, Progress, Modal, Button, Input } from 'antd';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import validation from './validation';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { getProductDetailAction, getProductSameAction, addProductCartAction, addCommentAction, getCommentListAction } from '../../redux/actions';
import Header from '../commom/Header';
import Comment from '../Comment/Index';
import Footer from '../commom/Footer';
import Item from '../commom/Item';
import history from '../../utils/history';
import NotFound from '../../pages/NotFound/Index.jsx';
import ScrollToTop from '../commom/ScrollToTop/Index';

import './style.css'
function Detail({ productDetail, productListSame, commentList, addToCart, addComment, getProductDetail, getProductSame, getCommentList, match }) {

	const productId = match.params.id;

	const { id, image, name, price, categoryId, inventory, specifications, des, comments, arrImg } = productDetail.data;

	const [backgroundChecked, setBackgroundChecked] = useState({ index: 0, color: "#d6d6e5" })

	const [imgDef, setImgDef] = useState()

	const [tmpSpecifications, setSpecifications] = useState({})

	const [tmpListComment, setTmpListComment] = useState(commentList.data)
	useEffect(()=>{
		setTmpListComment(renderListCommentByPage(1))
		console.log("12313123")
	}, [commentList])

	useEffect(() => {
		console.log("444");
		setBackgroundChecked({ index: 0, color: "#d6d6e5" })
		getCommentList({ id: productId })
		setTmpListComment(commentList.data)
		if (productDetail.error !== 404) {
			getProductDetail({ id: productId });
		}
	}, [productId])
	
	const arrNumberComment = [];
	const ll = tmpListComment[0];
	console.log("aaa: ", commentList)
	if(commentList.data.length > 0 ){
		console.log("tmpListComment: ",ll?.id)
		for(let i = 1;i<=Math.ceil(commentList.data.length/5);i++){
			arrNumberComment.push(i)
		}
	}

	function renderListCommentByPage(page){
		const newArr = [...commentList.data]
		// console.log("ttt", productListSearch.data)
		const currentListComment = newArr.slice(5 * (page - 1), 5 * page)//  limit * (currenpge - 1) + 1
		// console.log("currentListComment: ", currentListComment) 
		return currentListComment
	}

	function renderNumberPage(){
		
		return arrNumberComment.map((item, index) => {
			return (
				<a 
				onClick={()=>{
					clickPageComment(item)
				}} key={index}>{item}</a>
			)
		})
	}
	function clickPageComment(page){
		console.log("page:111111111111111 ", page)
		setTmpListComment(renderListCommentByPage(page))
		// setProductListSearchs(renderListByPage(page))
	}
	
	// console.log("lc: ", commentList.data)
	
	useEffect(() => {
		getProductSame({ categoryId: categoryId })
	}, [categoryId])

	useEffect(() => {
		if (productDetail.data.id) {
			setOptionSelected(productDetail.data.productOptions[0] || {})
		}
		setSpecifications(specifications)
		setImgDef(image)
	}, [productDetail.data])

	// console.log("tmpSpecifications: ", tmpSpecifications)

	const settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 4,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					dots: false,
					infinite: false,
					speed: 500,
					slidesToShow: 3,
					slidesToScroll: 3,
				}
			},
			{
				breakpoint: 425,
				settings: {
					dots: false,
					infinite: false,
					speed: 500,
					slidesToShow: 2,
					slidesToScroll: 2,
				}
			}
		]
	};

	const [isModalVisible, setIsModalVisible] = useState(false);


	function renderListImage(){
		let arrayImg = arrImg ? arrImg.split("###") : [];
		return arrayImg.map((item, index) => {
			return (
				<div className="small-img" key={index} >
					<img className="thumbnail" src={item} alt="sản phẩm" onClick={(e)=>setImgDef(e.target.src)} />
				</div>
			)
		})
	}

	const [values, setValues] = useState({
		countStar: 0,
		name: '',
		email: '',
		contentComment: ''
	});
	const [errors, setErrors] = useState({
		countStar: 0,
		name: '',
		email: '',
		contentComment: ''
	})

	const [optionSelected, setOptionSelected] = useState({});
	const [isReadMore, setIsReadMore] = useState(false);
	const [isReadMoreSec, setIsReadMoreSec] = useState(false);


	const handleChange = e => {
		const { name, value } = e.target
		setValues({
			...values,
			[name]: value
		})
	}

	const showModal = () => {
		setIsModalVisible(true);
	};

	function getCurrentTime() {
		var currentdate = new Date();
		var datetime = currentdate.getDate() + "-"
			+ (currentdate.getMonth() + 1) + "-"
			+ currentdate.getFullYear() + " "
			+ currentdate.getHours() + ":"
			+ currentdate.getMinutes() + ":"
			+ currentdate.getSeconds();

		return datetime;
	}
	function validateEmail(email) {   
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
  	}
	function checkProperties(obj) {
		var count = 0;
		for (var key in obj) {
			console.log("obj[key]: ", obj[key])
			if (obj[key] === "" || obj[key] === 0){
				count++;
				console.log(count)
			}
				 
		}
		if( count > 0){
			return false;
		}else{
			return true
		}
		
  	}

	console.log(values)
	
	const handleOk = () => {

		let isValid = true;
		const newChangeError = {
			countStar: 0,
			name: '',
			email: '',
			contentComment: ''
		}

		if(!values.countStar === 0 ){
			isValid = false;
			newChangeError.countStar = "Vui lòng chọn số sao để đánh giá";
		}else{
			newChangeError.countStar = ""
		}
		if(!values.name ){
			isValid = false;
			newChangeError.name = "Vui lòng nhập tên";
		}else{
			newChangeError.name = ""
		}
	
		if(!values.email ){
			isValid = false;
			newChangeError.email = "Vui lòng nhập email";
		}else if(!validateEmail(values.email)){
			isValid = false;
			newChangeError.email = "Email không hợp lệ";
		}else{
			newChangeError.email = ""
		}
	
		if(!values.contentComment ){
			isValid = false;
			newChangeError.contentComment = "Vui lòng nhập nội dung đánh giá";
		}else{
			newChangeError.contentComment = ""
		}
		
		if (isValid) {
			setErrors({ ...newChangeError })
			console.log("4569999", values)
			if(checkProperties(values) === true){ // true
				console.log("123")
				setValues({
					countStar: 0,
					name: '',
					email: '',
					contentComment: ''
				})
				
				addComment({ productId: id, inforComment: values, currentTime: getCurrentTime() });
				
				setIsModalVisible(false);
			}else{
				console.log("456")

				// setIsModalVisible(false);
			}
			
		} else {
			setErrors({ ...newChangeError })
			// setIsModalVisible(false);
		}

	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const changeStar = (value) => {
		setValues({ ...values, countStar: value })
	}

	function createMarkup() {
		return {
			__html: des
		};
	};

	function onChangeValue(event) {
		var productOptionSelected = productDetail.data.productOptions.find((item, index) => {
			if (item.id.toString() === event.target.value) {
				setBackgroundChecked({ index: index, color: "#d6d6e5" })
				return true;
			}
		})
		setOptionSelected(productOptionSelected)
	}
	function renderProductOptions() {
		if (productDetail.data.id) {
			return productDetail.data.productOptions.map((item, index) => {
				return (
					<label key={index} style={{backgroundColor: backgroundChecked.index === index && backgroundChecked.color}} >
						<input 
							type="radio" 
							name="radio" 
							value={item.id}
							defaultChecked={price === (price + item.price) && "true"} 
							onChange={onChangeValue}
						/>
						<span>
							{item.memory}
						</span>
							<p>{(price + item.price).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
					</label>	
				)
			})
		}
	}

	function renderProductSame() {

		return productListSame.data.map((item, id) => {
			var sum = 0;
			item.comments.map((itemComment) => {
				sum += itemComment.inforComment.countStar;
			})
			if (sum > 0) {
				sum /= item.comments.length
			} else {
				sum = 5
			}
			return (
				<Item key={id} id={item.id} name={item.name} price={item.price} image={item.image} comments={item.comments} avgStar={Math.round(sum / 0.5) * 0.5} />
			)
		})
	}
	var counts = {};
	var sumComment = 0;
	var avgComment = 0;
	for (var i = 0; i < commentList.data.length; i++) {
		var num = commentList.data[i];
		counts[num.inforComment.countStar] = counts[num.inforComment.countStar] ? counts[num.inforComment.countStar] + 1 : 1;
	}

	sumComment = parseInt(counts[5] !== undefined ? counts[5] : 0) +
		parseInt(counts[4] !== undefined ? counts[4] : 0) +
		parseInt(counts[3] !== undefined ? counts[3] : 0) +
		parseInt(counts[2] !== undefined ? counts[2] : 0) +
		parseInt(counts[1] !== undefined ? counts[1] : 0)

	avgComment = parseInt(counts[5] !== undefined ? counts[5] : 0) * 5 +
		parseInt(counts[4] !== undefined ? counts[4] : 0) * 4 +
		parseInt(counts[3] !== undefined ? counts[3] : 0) * 3 +
		parseInt(counts[2] !== undefined ? counts[2] : 0) * 2 +
		parseInt(counts[1] !== undefined ? counts[1] : 0)

	// console.log("sumComment : ", sumComment)

	function renderComment() {
		return tmpListComment.map((item, index) => {
			return (
				<Comment key={index} currentTime={item.currentTime} inforComment={item.inforComment} />
			)
		})
	}

	const renderSpecification = Object.keys(specifications || {}).map((item, index) => {
		return (
			<li key={index} className="specification-li">
				<div className="lileft">
					{item}
				</div>
				<div className="liright">
					{specifications[item]}
				</div>
			</li>
		)
	})
	return (
		<>
			{productDetail.error === 404 && <NotFound />}
			<Header />
			{productDetail.load && productDetail.error !== 404 ?
				(<div className="wrap-detail">
					<SkeletonTheme color="#ffffff">
						<Row gutter={[16, 16]}>
							<Col md={18} >
								<div className="detail-product">
									<Row>
										<Col md={10}>
											<div className="detail-product-img">
												<Skeleton color="black" style={{ width: "300px", height: "300px" }} />
											</div>
											<div className="muti-img">
												<div className="small-img">
													<Skeleton style={{ width: "50px", height: "50px" }} />
												</div>
												<div className="small-img">
													<Skeleton style={{ width: "50px", height: "50px" }} />
												</div>
												<div className="small-img">
													<Skeleton style={{ width: "50px", height: "50px" }} />
												</div>
											</div>
										</Col>
										<Col md={14}>
											<div className="detail-product-info">
												<div className="name-product">
													<p><Skeleton style={{ width: "200px", height: "50px" }} /></p>
												</div>
												<div className="price-product">
													<span><Skeleton style={{ width: "200px", height: "50px" }} /></span>
												</div>
												<div className="select-price-product"  >
													<Skeleton style={{ width: "200px", height: "50px" }} />
												</div>
												<Row gutter={[8, 8]}>
													<Col md={12}>
														<Skeleton style={{ width: "200px", height: "50px" }} />
													</Col>
													<Col md={12}>
														<Skeleton style={{ width: "200px", height: "50px" }} />
													</Col>
												</Row>

											</div>
										</Col>
									</Row>
								</div>

							</Col>
							<Col md={6}>
								<Skeleton style={{ width: "100%", height: "400px" }} />
							</Col>
						</Row>
					</SkeletonTheme>
				</div>
				) :
				<div className="wrap-detail">
					<ScrollToTop />
					<Row gutter={[16, 16]}>
						<Col lg={18} md={24}>
							<div className="detail-product">
								<Row>
									<Col lg={10} md={24} sm={24} xs={24}>
										<div className="detail-product-img">
											<img id="image" src={imgDef} alt="sản phẩm" />
										</div>
										<div className="muti-img">
											{renderListImage()}
											
										</div>
									</Col>
									<Col lg={14} md={24} sm={24} xs={24}>
										<div className="detail-product-info">
											<div className="detail-product-info-top">
												<Rate disabled allowHalf style={{ fontSize: "12px" }} defaultValue={5} />
												<span style={{ display: "inline-block", marginLeft: "20px" }}>{comments.length + " đánh giá"}</span>
											</div>
											<div className="name-product">
												{name}
											</div>
											<p>Thương hiệu: {tmpSpecifications? (tmpSpecifications['Thương hiệu'] !== undefined ? tmpSpecifications['Thương hiệu'] : "khác") : "khác" }</p>

											<div className="price-product">
												<span>{price && (parseInt(price) + parseInt(optionSelected.price) || price).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
											</div>
											<div className="select-price-product">
												<div className="containerr">
													{/* <form> */}
													{renderProductOptions()}
													{/* </form> */}
												</div>
											</div>
											<div className="diccount" >
												<h3>Ưu đãi liên quan</h3>
												<ul>
													<li>Tặng gói iCloud 50GB đến 15 tháng</li>
													<li>Tặng Bảo hành 2 năm chính hãng</li>
													<li>Thu cũ đổi mới - Trợ giá ngay 15%</li>
												</ul>
											</div>
											<Row gutter={[8, 8]}>
												<Col md={12} xs={24}>
													<button className="btn btn-buy" onClick={() => {
														addToCart({ id, image, name, price, categoryId, inventory, optionSelected })
														history.push(`/gio-hang`)
													}} >Mua ngay</button>
												</Col>
												<Col md={12} xs={24}>
													<button className="btn btn-cart" onClick={() => addToCart({ id, image, name, price, categoryId, inventory, optionSelected })}>Thêm giỏ hàng</button>
												</Col>
											</Row>

										</div>
									</Col>
								</Row>
							</div>
						</Col>
						<Col lg={6} md={24}>
							<div className="widget">
								<div>
									<span><i className="far fa-truck-moving"></i></span>
									<p>Sản phẩm được miễn phí giao hàng</p>
								</div>
								<h3 >Chính sách bán hàng</h3>
								<div>
									<span><i className="far fa-check-circle"></i></span>
									<p>Cam kết hàng chính hãng 100%</p>
								</div>
								<div>
									<span><i className="far fa-truck-loading"></i></span>
									<p>Miễn phí giao hàng từ 800K</p>
								</div>
								<div>
									<span><i className="far fa-sync-alt"></i></span>
									<p>Đổi trả miễn phí trong 10 ngày</p>
								</div>
								<h3 >Dịch vụ khác</h3>
								<div>
									<span><i className="far fa-cog"></i></span>
									<p>Sửa chữa đồng giá 150.000đ.</p>
								</div>
								<div>
									<span><i className="fas fa-broom"></i></span>
									<p>Vệ sinh máy tính, laptop.</p>
								</div>
								<div>
									<span><i className="far fa-shield"></i></span>
									<p>Bảo hành tại nhà.</p>
								</div>
							</div>
						</Col>
					</Row>
					<div className="same-product">
						<div className="title-content">
							<h3>CÓ THỂ BẠN THÍCH</h3>
						</div>
						<div className="same-product-bottom">
							<Slider {...settings}>
								{renderProductSame()}
							</Slider>
						</div>
					</div>
					<div className="des-product">
						<Row gutter={[16, 16]} >
							<Col md={16} xs={24}>
								<div className="des-product-left">
									<div className="title-content">
										<h3>Mô tả sản phẩm</h3>
									</div>
									<div
										className="des-product-content"
										style={{
											height: isReadMore === false ? "400px" : "auto",
											overflow: isReadMore === false ? "hidden" : "auto"
										}}
										dangerouslySetInnerHTML={createMarkup()} />
									<div className="view-more">
										<button
											className="btn btn-view-more"
											onClick={() => setIsReadMore(!isReadMore)}
										>
											{isReadMore === false ? "Xem thêm" : "Thu nhỏ"}
										</button>
									</div>
								</div>
							</Col>
							<Col md={8} xs={24}>
								<div className="des-product-right">
									<div className="title-content">
										<h3>Thông số kỹ thuật</h3>
									</div>
									<div className="specification">
										<ul className="render-pecification-ul" style={{
											height: isReadMoreSec === false ? "360px" : "auto",
											overflow: isReadMoreSec === false ? "hidden" : "auto"
										}}>
											{renderSpecification}
										</ul>

									</div>
									<div className="view-more">
										<button
											className="btn btn-view-more"
											onClick={() => setIsReadMoreSec(!isReadMoreSec)}
										>
											{isReadMoreSec === false ? "Xem thêm" : "Thu nhỏ"}
										</button>
									</div>
								</div>
							</Col>
						</Row>
					</div>
					<div className="same-product">
						<div className="title-content" >
							<h3>Đánh giá và nhận xét</h3>
						</div>
						<div className="same-product-bottom">
							<Row gutter={[16, 16]}>
								<Col md={8} xs={12} span={8}>
									<div style={{ textAlign: "center" }}>
										<p>Đánh Giá Trung Bình</p>
										<h1 style={{ fontSize: "32px" }}>5/5</h1>
										<Rate disabled allowHalf defaultValue={5} />
									</div>
								</Col>
								<Col md={8} xs={12} span={8}>
									{/* counts[5] === undefined ? counts[5] ? 0 , counts[4], counts[3], counts[2], counts[1] */}
									<div style={{ textAlign: "center" }}>
										<div className="row-star">
											<span className="number-comment">5</span>
											<i className="fas fa-star" style={{ marginRight: "8px", color: "#fadb14" }}></i>
											<Progress percent={counts[5] !== undefined ? counts[5] / sumComment * 100 : 0} showInfo={false} />
											<span className="number-comment">{counts[5] !== undefined ? counts[5] : 0}</span>
										</div>
										<div className="row-star">
											<span className="number-comment">4</span>
											<i className="fas fa-star" style={{ marginRight: "8px", color: "#fadb14" }}></i>
											<Progress percent={counts[4] !== undefined ? counts[4] / sumComment * 100 : 0} showInfo={false} />
											<span className="number-comment">{counts[4] !== undefined ? counts[4] : 0}</span>
										</div>
										<div className="row-star">
											<span className="number-comment">3</span>
											<i className="fas fa-star" style={{ marginRight: "8px", color: "#fadb14" }}></i>
											<Progress percent={counts[3] !== undefined ? counts[3] / sumComment * 100 : 0} showInfo={false} />
											<span className="number-comment">{counts[3] !== undefined ? counts[3] : 0}</span>
										</div>
										<div className="row-star">
											<span className="number-comment">2</span>
											<i className="fas fa-star" style={{ marginRight: "8px", color: "#fadb14" }}></i>
											<Progress percent={counts[2] !== undefined ? counts[2] / sumComment * 100 : 0} showInfo={false} />
											<span className="number-comment">{counts[2] !== undefined ? counts[2] : 0}</span>
										</div>
										<div className="row-star">
											<span className="number-comment">1</span>
											<i className="fas fa-star" style={{ marginRight: "8px", color: "#fadb14" }}></i>
											<Progress percent={counts[1] !== undefined ? counts[1] / sumComment * 100 : 0} showInfo={false} />
											<span className="number-comment">{counts[1] !== undefined ? counts[1] : 0}</span>
										</div>
									</div>
								</Col>
								<Col md={8} xs={24} span={8}>
									<div style={{ textAlign: "center" }}>
										<p className="small-para">Bạn đã dùng sản phẩm này?</p>
										<Button type="primary" onClick={showModal}>
											Đánh giá
											</Button>
										<Modal title="Nhận xét sản phẩm" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
											<div className="evaluate-star">
												<span>Chọn đánh giá của bạn </span>
												<Rate
													defaultValue={0}
													value={values.countStar}
													onChange={changeStar}
												/>
											</div>
											<Input
												placeholder="Họ và tên"
												name="name"
												value={values.name}
												onChange={handleChange}
											/>
											<small>{errors.name}</small>
											<Input
												placeholder="Email"
												name="email"
												value={values.email}
												onChange={handleChange}
											/>
											<small>{errors.email}</small>
											<Input

												placeholder="Nhận xét về sản phẩm"
												name="contentComment"
												value={values.contentComment}
												onChange={handleChange}
											/>
											<small>{errors.contentComment}</small>
										</Modal>
									</div>
								</Col>
							</Row>
						</div>
						<div className="wrap-render-list-comment">
							{renderComment()}
							<div className="container-page">
									{renderNumberPage()}
								</div>
						</div>
					</div>
				</div>
			}
			<Footer />



		</>

	)
}
const mapStateToProps = (state) => {
	const { productDetail, productListSame, shoppingCart, commentList } = state.productReducer;
	return {
		productDetail,
		productListSame,
		shoppingCart,
		commentList
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		getProductDetail: (params) => dispatch(getProductDetailAction(params)),
		getProductSame: (params) => dispatch(getProductSameAction(params)),
		addToCart: (params) => dispatch(addProductCartAction(params)),
		addComment: (params) => dispatch(addCommentAction(params)),
		getCommentList: (params) => dispatch(getCommentListAction(params))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
