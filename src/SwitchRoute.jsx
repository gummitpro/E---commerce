import React from 'react'
import {Route, Router, Switch} from 'react-router-dom'

import history from './utils/history'
import Home from './pages/Home/Home.jsx'

import Login from './pages/Login/Login.jsx'
import Register from './pages/Register/Register.jsx'
import Cart from './pages/Cart'
import DetailProduct from './pages/DetailProduct/Detail'
import AdminProduct from './pages/Admin/AdminProduct'
import AdminUser from './pages/Admin/AdminUser'
import AdminOrder from './pages/Admin/AdminOrder'
import Admin from './pages/Admin'

import AdminAccount from './pages/Admin/AdminAccount' 

import Payment from './pages/Payment/Index.jsx'
import PaymentSuccess from './pages/PaymentSuccess/Index.jsx'
import Search from './pages/Search/Index.jsx'
import InforPerson from './pages/Profile/IndexProfile.jsx'
import NotFound from './pages/NotFound/Index.jsx'


function SwitchRoute() {
	return (
		<Router history={history}>
			<Switch>
				<Route exact path="/" component={Home}/>
				<Route exact path="/dang-nhap" component={Login}/>
				<Route exact path="/product/:id" component={DetailProduct}/>
				<Route exact path="/dang-ky" component={Register}/>
				<Route exact path="/gio-hang" component={Cart}/>
				<Route exact path="/admin" component={Admin}/>
				<Route exact path="/admin-order" component={AdminOrder}/>
				<Route exact path="/admin-product" component={AdminProduct}/>
				<Route exact path="/admin-user" component={AdminUser}/>
				<Route exact path="/admin-account" component={AdminAccount}/>

				<Route exact path="/thanh-toan" component={Payment}/>
				<Route exact path="/thanh-toan-thanh-cong" component={PaymentSuccess}/>
				<Route exact path="/search" component={Search} />
				<Route exact path="/thong-tin-ca-nhan" component={InforPerson} />
				<Route component={NotFound} />
			</Switch>
		</Router>
	)
}

export default SwitchRoute
