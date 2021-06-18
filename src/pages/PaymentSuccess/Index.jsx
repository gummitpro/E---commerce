import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux';
import Header from "../commom/Header";
import Footer from "../commom/Footer";
import history from '../../utils/history';
import '../PaymentSuccess/style.css'

function Index({shoppingCart}) {
	
	
	return (
		<>
			<Header />
			<div className="wrap-payment-success">
				<div className="icon-payment-success">
					<i className="far fa-check-circle"></i>
				</div>
				<h1>Đặt hàng thành công</h1>
				<div>Cảm ơn bạn đã mua hàng tại: <p className="text-payment-success">lion</p></div>
				<button className="button-payment-success" onClick={() => history.push(`/`)}>Tiếp mua sắm </button>
			</div>
			<Footer />
		</>
	)
}

const mapStateToProps = (state) => {
	const { shoppingCart } = state.productReducer;
	return {
		shoppingCart,
	}
};

export default connect(mapStateToProps, null)(Index);
