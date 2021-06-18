import React from 'react'
import { Card, Rate } from 'antd';
import { Link } from 'react-router-dom';

import '../Item/style.css'

const { Meta } = Card;

function index(props) {
	const { id, name, price, image, comments, avgStar } = props;
	return (
		<>
			<Link to={`/product/${id}`}>
				<div className="item-cart-product">
					<Card
						bordered={false}
						hoverable
						cover={
							<div style={{padding: "8px"}}>
								<div className="item-image">
									<picture>
										<img className="inside-image" alt={name} src={image} />
									</picture>
								</div>
							</div>
						}
					>
						<Meta
							title={name}
							description={
								(<div className="item-content">
									<div className="item-rate">
										<Rate disabled allowHalf style={{ fontSize: "12px", marginRight: "8px" }} defaultValue={avgStar} />
										<span className="item-comment" style={{ display: "inline-block" }}>{'\u00A0 \u00A0' + comments.length + " đánh giá"}</span>
									</div>
									<div className="item-price">
										{price && price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
									</div>

								</div>
								)
							}

						/>
					</Card>
				</div>
			</Link>

		</>
	)
}

export default index
