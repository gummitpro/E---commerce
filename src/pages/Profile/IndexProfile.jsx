import React, { useState } from 'react'
import {  Redirect } from 'react-router-dom';
import { Card } from 'antd';

import Header from '../commom/Header';
import Footer from '../commom/Footer';
import Infor  from './ComponentSub/PageInfor/Infor.jsx'
import ChangePassword from './ComponentSub/PageChangePassword/ChangePassword.jsx'
import HistoryOrder from './ComponentSub/PageHistory/HistoryOrder.jsx'

const tabListNoTitle = [
	{
		key: 'inforPerson',
		tab: 'Thông tin cá nhân',
	},
	{
		key: 'changePassword',
		tab: 'Thay đổi mật khẩu',
	},
	{
		key: 'historyOrder',
		tab: 'Lịch sử giao hàng',
	},
];

const contentListNoTitle = {
	inforPerson: <Infor/>,
	changePassword: <ChangePassword/>,
	historyOrder: <HistoryOrder/>,
};

function IndexProfile() {
	
	const [state, setState] = useState({
		noTitleKey: 'inforPerson',
	})

	if (localStorage.getItem("userInfo") === null) {
		return <Redirect to="/dang-nhap" />;
	}

	function onTabChange(key, type) {
		// console.log(key, type);
		setState({ [type]: key });
	};
	return (

		<>
			<Header />
			<div style={{padding: "20px", backgroundColor: "#f2f3f5"}}>
			<Card
				style={{ width: '100%' }}
				tabList={tabListNoTitle}
				activeTabKey={state.noTitleKey}
				onTabChange={key => {
					onTabChange(key, 'noTitleKey');
				}}
			>
				{contentListNoTitle[state.noTitleKey]}
			</Card>
			</div>
			<Footer />
		</>
	)
}

export default IndexProfile
