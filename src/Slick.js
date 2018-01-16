import React, { Component } from 'react';
import './App.css';
import "../node_modules/slick-carousel/slick/slick.css";
import "../node_modules/slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

class Slick extends Component {
	constructor(props){
		super(props);
		this.state = {breed: props.breed};
	}

	render () {
		var settings = {"infinite":true, "slidesToShow":3, "slidesToScroll":3, "arrows": true, "autoplay": true, "responsive": [{
			"breakpoint":640,
			"settings": {
				"arrows": false,
				"dots": true,
				"infinite": true,
				"slidesToShow": 1,
				"slidesToScroll": 1,
				"autoplay": true
			}
		}]};

		return (
			<div className="slick">
				<Slider {...settings}>
					{
						this.props.breedImages.map((image) => {
							var itemStyle = {
								color: 'white',
								backgroundImage: 'url(' + image + ')',
								WebkitTransition: 'all', // note the capital 'W' here
								msTransition: 'all' // 'ms' is the only lowercase vendor prefix
							};
							return <div key={image} className="carousel-item active" style={itemStyle}></div>
						})
					}
				</Slider>
				<img className="wait" alt="wait spinner" src="./ajax-loader.gif" />
			</div>
		);
	}
}

export default Slick;
