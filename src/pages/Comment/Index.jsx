import React, {useState} from 'react'
import {Rate} from 'antd';

import './style.css'

function Index(props) {
	// const[ arrColorr, setArrColorr] = useState("#b6cff5");
	// let arrColor = [
	// 						"#b6cff5", "#98d7e4", "#e3d7ff", "#fbd3e0", 
	// 						"#f2b2a8", "#4986e7", "#2da2bb", "#b99aff", "#f691b2",
	// 						"#ffad48", "#cca6ac", "#ff7537", "#16a765"
	// 					]
	// var rand = arrColor[Math.floor(Math.random() * arrColor.length)];
	const {currentTime, inforComment} = props
	
	function getFirstWord(str) {
		var splitStr = str.toLowerCase().split(' ');
		for (var i = 0; i < splitStr.length; i++) {
			 splitStr[i] = splitStr[i].charAt(0).toUpperCase();     
		}
		return splitStr.join(''); 
	}

	return (
		<>
			<div className="comment">
				<div className="comment-avatar">
					{getFirstWord(inforComment.name)}
				</div>
				<div className="comment-content">
					<div className="comment-name">
						{inforComment.name}
					</div>
					<div className="comment-star">
						<Rate disabled defaultValue={inforComment.countStar} />
						<span className="comment-time">{currentTime}</span>
					</div>
					<div className="comment-text">
						{inforComment.contentComment}
					</div>
				</div>
			</div>
		</>
	)
}

export default Index
