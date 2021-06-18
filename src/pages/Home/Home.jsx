import React from 'react'
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Carousel } from 'antd';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import './style.css'
import Header from '../commom/Header';
import Footer from '../commom/Footer';
import Item from '../commom/Item'
import ScrollToTop from '../commom/ScrollToTop/Index'
import history from '../../utils/history.js'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { getProductListAction } from '../../redux/actions';

function Home({ getProductList, productList }) {



	useEffect(() => {
		getProductList();
	}, []);

	const settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 4,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					dots: false,
					infinite: false,
					speed: 500,
					slidesToShow: 4,
					slidesToScroll: 4,
				}
			},
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
			},
			{
				breakpoint: 320,
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


	const contentStyle = {
		height: 'auto',
		color: '#fff',
		lineHeight: '160px',
		textAlign: 'center',
		background: '#364d79',

	};
	function renderProductCategory(categoryId) {
		return productList.data.map((item, index) => {
			var sum = 0;
			if (item.categoryId === categoryId) {
				item.comments.map((itemComment) => {
					sum += itemComment.inforComment.countStar;
				})
				if (sum > 0) {
					sum /= item.comments.length
				} else {
					sum = 5
				}
				return (
					<Item key={index} id={item.id} name={item.name} price={item.price} image={item.image} comments={item.comments} avgStar={Math.round(sum / 0.5) * 0.5} />
				)
			}

		})
	}

	return (
		<>
			{productList.load ? (
				<>
					<Header />
					<Skeleton className="content-slide" color="black" style={{ height: 400 }}>

					</Skeleton>
					<div className="menu-category" >
						<Skeleton style={{ padding: 100 }}>
							<ul >

							</ul>
						</Skeleton>
					</div>
					<div className="wrap-banner-product featured-products" style={{ marginTop: "12px" }}>
						<div className="banner-first" style={{ height: "200px" }}>
							<Slider {...settings}>
								<div>
									<Skeleton style={{ height: "100px" }}>

									</Skeleton>
								</div>
								<div>
									<Skeleton style={{ height: "100px" }}>

									</Skeleton>
								</div>
								<div>
									<Skeleton style={{ height: "100px" }}>

									</Skeleton>
								</div>
								<div>
									<Skeleton style={{ height: "100px" }}>

									</Skeleton>
								</div>
							</Slider>
						</div>
					</div>
					<Footer />
				</>
			) :
				(
					<>
						<Header />
						<ScrollToTop />
						<div className="wrap-home">

							<Carousel className="content-slide" autoplay dots={false} style={{ margin: "0px" }}>
								<div>
									<h3 className="carousel" style={contentStyle}>
										<img src="https://lh3.googleusercontent.com/GM_PRsMUvDzsPah9zT4mijpZ7TrxK-0Jeibc2zMzGzAAEjr2SCCRVp-lptGP5Wzx6yrb5PAdVRRrLlOTOVLBI-c0Q4BcbqmH=w1920-rw" alt="name" />
									</h3>
								</div>
								<div>
									<h3 className="carousel" style={contentStyle}>
										<img src="https://lh3.googleusercontent.com/xS-Ey_-W5I4JaPc8oL9xJZhYtvAFdF_76KMHUVbW7Xf-jfaoxj420-6WZ_RiKVd10ZN3iZr4FV6UuWllJS6d-dXAdk6mjO0=w1920-rw" alt="name" />
									</h3>
								</div>
								<div>
									<h3 className="carousel" style={contentStyle}>
										<img src="https://lh3.googleusercontent.com/V-vPPB588FJOanwJQLBjp02hp0zkGBWM9lerFDI2V84laXVRfXXq2UEZDhQToi1i-F1ocDQ0cHVtGm5-Ixo8EmZilBymf_k=w1920-rw" alt="name" />
									</h3>
								</div>
								<div>
									<h3 className="carousel" style={contentStyle}>
										<img src="https://lh3.googleusercontent.com/1KJ9inWD5ELRzE3OZ7dfgq5lkkb-favqqE9BAh3EIIENopR_xSIUxtqYOQDVdPZ0PbgQ_jOkxL8vMb_hd814L3jykdxMFAQWZQ=w1920-rw" alt="name" />
									</h3>
								</div>
							</Carousel>

							<div className="menu-category">
								<ul>
									<li onClick={() => { history.push(`/search?q=laptop`) }}>
										<div className="icon-left">
											<i className="fal fa-mobile-android"></i>
										</div>
										<div >
										Laptop và Macbook
										</div>
									</li>
									<li onClick={() => { history.push(`/search?q=dien+thoai`) }}>
										<div className="icon-left">
											<i className="fal fa-laptop"></i>
										</div>
										<div>
										Điện thoại
										</div>
									</li>
									<li onClick={() => { history.push(`/search?q=tivi`) }}>
										<div className="icon-left">
											<i className="far fa-tv"></i>
										</div>
										<div>
											Tivi và Màn hình Tivi
										</div>
									</li>
									<li onClick={() => { history.push(`/search?q=thiet+bi+mang`) }}>
										<div className="icon-left">
											<i className="fal fa-network-wired"></i>
										</div>
										<div>
										Thiết bị mạng
										</div>
									</li>
									<li onClick={() => { history.push(`/search?q=thiet+bi+am+thanh`) }}>
										<div className="icon-left">
											<i className="fal fa-headphones"></i>
										</div>
										<div>
										Phụ kiện
										</div>
									</li>
									<li onClick={() => { history.push(`/search?q=linh+kien+may+tinh`) }}>
										<div className="icon-left">
											<i className="fal fa-microchip"></i>
										</div>
										<div>
										Linh kiện điện tử
										</div>
									</li>
								</ul>
							</div>
							<div className="wrap-banner-product featured-products">
								<div className="banner-first">
									<Slider {...settings}>
										<div className="banner-firt-img">
											<img src="https://lh3.googleusercontent.com/LCewL_GdPew2Q7F3Xdnyvu2QM0PaOY3FicbazkV2TUCe58smNksqDtEiO4NXHtAJvUvyr2Qe_tBFk9cmosRCTlW9mCeV--2X=w308-rw" alt="" />
										</div>
										<div className="banner-firt-img">
											<img src="https://lh3.googleusercontent.com/dZndgOdcysup7wH-McEZbA2pfOi6NLkue80zVZmwIzs30YXFEyIHu91jeuAIhUKm1M_WuIEzGPQmyqpAsqFl2ts7u3fmd2UM=w308-rw" alt="" />
										</div>
										<div className="banner-firt-img">
											<img src="https://lh3.googleusercontent.com/i8kRsWh83uaR4I976yWtGBAk707gaI9XJTjmqV04OStvA1pGB1nQ5OR5haP7SQ6GWxSj4AqXJyQzMoRNlYjMmoXgOdT4dEpv=w308-rw" alt="" />
										</div>
										<div className="banner-firt-img">
											<img src="https://lh3.googleusercontent.com/oxrVFbAsGOMxGAI0m6G6rCOkt75YI3rSI8T8PFJA7XYzbW9fPJYF9GOBwDnz2nenwr6KMtxJdFwsWIQ5WQAlt44CehJCTDM=w308-rw" alt="" />
										</div>
									</Slider>
								</div>
							</div>

							<div className="header-sub">
								<div className="li-submenu" onClick={() => { history.push(`/search?q=laptop`) }}>
									Laptop và Macbook
								</div>
								<div className="li-submenu" onClick={() => { history.push(`/search?q=dien+thoai`) }}>
									Điện thoại
								</div>
								<div className="li-submenu" onClick={() => { history.push(`/search?q=tivi`) }}>
									Tivi và Màn hình Tivi
								</div>
								<div className="li-submenu" onClick={() => { history.push(`/search?q=thiet+bi+mang`) }}>
									Thiết bị mạng
								</div>
								<div className="li-submenu" onClick={() => { history.push(`/search?q=thiet+bi+am+thanh`) }}>
									Phụ kiện
								</div>
								<div className="li-submenu" onClick={() => { history.push(`/search?q=linh+kien+may+tinh`) }}>
									Linh kiện điện tử
								</div>
							</div>

							<div className="wrap-banner-product">
								<div className="banner-product" >
								<h1>Điện thoại</h1>
									
									<Slider {...settings}>
										{renderProductCategory(2)}
									</Slider>
								</div>
							</div>
							<div className="banner">
								<a href="">
									<img src="https://hoanghamobile.com/Uploads/2021/04/16/banner-iphone-12-mini-1200-140.gif" alt="name" />
								</a>
							</div>
							<div className="wrap-banner-product">
								<div className="banner-product">
								<h1>Laptop và Macbook</h1>
									<Slider {...settings}>
										{renderProductCategory(1)}
									</Slider>
								</div>
							</div>

							<div className="banner">
								<a href="">
									<img src="https://hoanghamobile.com/Uploads/2021/04/16/banner-iphone-12-mini-1200-140.gif" alt="name" />
								</a>
							</div>
							<div className="wrap-banner-product">
								<div className="banner-product" >
									<h1>Tivi và màn hình tivi</h1>
									<Slider {...settings}>
										{renderProductCategory(3)}
									</Slider>
								</div>
							</div>
							<div className="banner">
								<a href="">
									<img src="https://hoanghamobile.com/Uploads/2021/04/16/banner-iphone-12-mini-1200-140.gif" alt="name" />
								</a>
							</div>
							<div className="banner-product">
								<h1>Thiết bị mạng</h1>
								<Slider {...settings}>
									{renderProductCategory(4)}
								</Slider>
							</div>
							<div className="banner">
								<a href="">
									<img src="https://hoanghamobile.com/Uploads/2021/04/16/banner-iphone-12-mini-1200-140.gif" alt="name" />
								</a>
							</div>
							<div className="banner-product">
								<h1>Thiết bị âm thanh</h1>
								<Slider {...settings}>
									{renderProductCategory(5)}
								</Slider>
							</div>
							<div className="banner">
								<a href="">
									<img src="https://hoanghamobile.com/Uploads/2021/04/16/banner-iphone-12-mini-1200-140.gif" alt="name" />
								</a>
							</div>
							<div className="banner-product" >
								<h1>Link kiện máy tính</h1>
								<Slider {...settings}>
									{renderProductCategory(6)}
								</Slider>
							</div>
						</div>
						<Footer />
					</>
				)
			}
		</>
	)
}
const mapStateToProps = (state) => {
	const { productList } = state.productReducer;
	return {
		productList: productList,
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		getProductList: (params) => dispatch(getProductListAction(params)),
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
