import React, {useEffect} from 'react'
import { Table } from 'antd';
import { connect } from 'react-redux';
import { getProductOrderListAction } from '../../../../redux/actions';

import '../PageHistory/style.css'

const columns = [
	{ title: 'Tên khách hàng', dataIndex: 'nameCustomer', key: 'nameCustomer'},
	{ title: 'Địa chỉ', dataIndex: 'addressCustomer', key: 'addressCustomer', },
	{ title: 'Thành tiền', dataIndex: 'totalMoney', key: 'totalMoney', },
	{ title: 'Thời gian đặt hàng', dataIndex: 'timeOrder', key: 'timeOrder', },
	{ title: 'Tình trạng', dataIndex: 'status', key: 'status', },
];

const columnTwo = [
	{ title: 'Tên sản phẩm', dataIndex: 'nameProduct', key: 'nameProduct' },
	{ title: 'Hình ảnh', dataIndex: 'imageProduct', key: 'imageProduct' },
	{ title: 'Số lượng', dataIndex: 'quantityProduct', key: 'quantityProduct' },
	{ title: 'Giá', dataIndex: 'priceProduct', key: 'priceProduct' },
];

function HistoryOrder({productOrderList, getProductOrderList}) {
	const userInfor = JSON.parse(localStorage.getItem('userInfo'));
	console.log("productOrderList: ", productOrderList.data)
	useEffect(()=>{
		if(userInfor && userInfor.id){
			getProductOrderList(userInfor.id);
		}
	}, [])

	function dataProductOrderList(){
		if(productOrderList){
			// console.log("productOrderList: ", productOrderList)
			return productOrderList.data.map((item, index) =>{
				return {
					key: index,
					nameCustomer: item.consigneeInfor.name,
					addressCustomer:item.consigneeInfor.wards + "-" + item.consigneeInfor.district+"-"+item.consigneeInfor.city,
					totalMoney: item.totalOrder.toLocaleString('vi', { style: 'currency', currency: 'VND' }),
					timeOrder: item.currentTime,
					inforProduct: item.cart.map((itemCart, indexCart) => {
						return {
							key: indexCart+1,
							nameProduct: Object.keys(itemCart.productOptions).length > 0 ? itemCart.name + " " +  itemCart.productOptions.memory : itemCart.name,
							imageProduct: <div className="history-image"><img src={itemCart.image} alt="" /></div>,
							quantityProduct: itemCart.quantity,
							priceProduct: Object.keys(itemCart.productOptions).length > 0 
												? (itemCart.price + itemCart.productOptions.price).toLocaleString('vi', { style: 'currency', currency: 'VND' }) 
												: itemCart.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })
							
						}
					}),
					status: item.status === 1 ? "Chờ hàng" : (item.status === 2 ? "Đang vận chuyển" : "Đã thanh toán")
				}
			})
		}
	
	}

	return (
		<div className="wrap-history">
			<Table
			pagination={false}
			columns={columns}
			scroll={{ x: 1024 }}
			expandable={{
				expandedRowRender: record => 
					<Table
						pagination={false}
						columns={columnTwo}
						dataSource={record.inforProduct}
					/>
				,
			}}
			dataSource={dataProductOrderList()}
		/>
		</div>
	)
}

const mapStateToProps = (state) => {
	const { productOrderList } = state.userReducer;
	return {
		productOrderList,
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		getProductOrderList: (params) => dispatch(getProductOrderListAction(params)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryOrder)
