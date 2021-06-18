import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux';
import { getProductListAction } from '../../redux/actions';

function Index({ getProductList, productList }) {

	const [data, setData] = useState([])
	const [done, setDone] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => {
			setDone(true)
		}, 1000);
		return () => clearTimeout(timer);
	 }, []);
	return (
		<div>
			{ !done && (<div> âlll </div>)}
		</div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Index)
