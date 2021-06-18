import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Header from '../commom/Header';
import Footer from '../commom/Footer';
import './style.css'

function Index() {
	const [seconds, setSeconds] = useState(10);

	useEffect(() => {
		const interval = setInterval(() => {
			setSeconds(seconds => seconds - 1);
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		
		<>
			<Header/>
				<div className="wrap-not-found">
					<h1>
						Not found
					</h1>
					<p>
						Trang không tồn tại. Sẽ chuyển về trang chủ trong  
						<span style={{display: "inline-block", margin: "0 12px"}}>
							{seconds === 0 ? window.location.replace("http://localhost:3000/") : seconds}
						</span>
						s
					</p>
					<Link to="/">
						<button className="btn-not-found">
							Go Home  
						</button>
					</Link>
				</div>
			<Footer/>
		</>
	)
}

export default Index
