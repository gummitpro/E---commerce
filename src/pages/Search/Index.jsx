import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import queryString from 'query-string';
import { connect } from 'react-redux';

import { Row, Col, Slider  } from 'antd';

import Header from '../commom/Header';
import Footer from '../commom/Footer';
import Item from '../commom/Item';

import './style.css'

import { getProductSearchAction } from '../../redux/actions';

function Index({ productListSearch, searchAction }) {
	const { search } = useLocation();
	const parsed = queryString.parse(window.location.search);

	const [productListSearchs, setProductListSearchs] = useState(productListSearch.data)
	
	const [page, setPage] = useState(1)

	useEffect(() => {
		setProductListSearchs(renderListByPage(page))
	}, [productListSearch.data])

	useEffect(() => {
		searchAction({ search: parsed.q })
	}, [parsed.q])

	const arrNumberPage = [];

	for(let i = 1;i<=Math.ceil(productListSearch.data.length/20);i++){
		arrNumberPage.push(i)
	}
	
	function renderListByPage(page){
		const newArr = [...productListSearch.data]
		// console.log("ttt", productListSearch.data)
		const currentListSearch = newArr.slice(20 * (page - 1), 20 * page)//  limit * (currenpge - 1) + 1
		// console.log("currentListSearch: ", currentListSearch) 
		return currentListSearch
	}

	console.log("page: ", page)
	function clickPage(page){
		setProductListSearchs(renderListByPage(page))
	}

	function renderNumber(){
		
		return arrNumberPage.map((item, index) => {
			return (
				<a 
				onClick={()=>{
					clickPage(item)
				}} key={index}>{item}</a>
			)
		})
	}

	function sortASC() {
		const dataToSort = [...productListSearchs];
		return dataToSort.sort(function(a, b) {
			return (a.price) - (b.price);
	  	});
	}

	function sortDESC() {
		const dataToSort = [...productListSearchs];
		return dataToSort.sort(function(a, b) {
			return  (b.price) - (a.price) ;
	  	});
	}

	const [priceSort, setPriceSort] = useState({beginValue: 0, endValue: 50000000})

	// console.log("priceSort: ", priceSort)

	function sortPrice() {
		const dataToSort = productListSearch.data;
		return dataToSort.filter( (item) => {
			// console.log("item: ", item.price, item.price === priceSort.beginValue)
			return (item.price >= priceSort.beginValue && item.price <= priceSort.endValue) ;
	  	});
	}

	function onChange(value) {
		console.log('onChange: ', value);
		setProductListSearchs(sortPrice())
		setPriceSort({...priceSort, beginValue: value[0]});
	}
	 
	function onAfterChange(value) {
		console.log('onAfterChange: ', value);
		setProductListSearchs(sortPrice())
		setPriceSort({...priceSort, endValue: value[1]});
	}

	console.log("sort price: ", sortPrice())
	function renderProductList() {
		// console.log("productListSearchs22:  ", productListSearchs)
		const dataToSort = [...productListSearchs];
		if(dataToSort.length > 0){
			return dataToSort.map((item, id) => {
				var sum = 0;
				item.comments.map((itemComment) =>{
					sum += itemComment.inforComment.countStar;
				})
				if(sum > 0){
					sum/= item.comments.length
				}else{
					sum = 5
				}
				return (
					<Col md={6} xs={12} key={id}>
						<Item id={item.id} name={item.name} price={item.price} image={item.image} comments={item.comments} avgStar={Math.round(sum / 0.5) * 0.5}/>
					</Col>
				)
			})
		}else{
			return (
				<h1>Không tìm thấy sản phẩm nào</h1>
			)
		}
		
	}

	return (
		<>
			<Header />
			<div className="wrap-search">
				<Row gutter={[16, 16]}>
					<Col md={5} xs={24}>
						<div className="fillter">
							<h3>Sắp xếp theo</h3>
							<ul>
								<li onClick={()=> {setProductListSearchs(sortASC())} }>Sắp xếp giá tăng dần</li>
								<li onClick={()=> {setProductListSearchs(sortDESC())} }>Sắp xếp giá giảm dần</li>
								<li>Price 
									<p>{priceSort.beginValue.toLocaleString('vi', { style: 'currency', currency: 'VND' }) + "  đến  "} 
										{ priceSort.endValue.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
									<Slider
										range
										step={500000}
										max={100000000}
										defaultValue={[0, 50000000]}
										onChange={onChange}
										onAfterChange={onAfterChange}
									/>
									
								</li>
							</ul>
						</div>
					</Col>

					{productListSearch.load ? (
						<Col md={19} xs={24}>
							<div> <h1>Loading</h1> </div>
						</Col>
					) : (
						<Col md={19} xs={24}>
							<div className="search-product">
							<Row gutter={[16, 16]}>
								{renderProductList()}
								
							</Row>
								<div className="container-page">
									{renderNumber()}
								</div>
							</div>
						</Col>
					)}

				</Row>
			</div>
			<Footer />
		</>
	)
}

const mapStateToProps = (state) => {
	const { productListSearch } = state.productReducer;
	return {
		productListSearch
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		searchAction: (params) => dispatch(getProductSearchAction(params)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
