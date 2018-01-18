import React, { Component } from 'react';
import Slider from 'react-slick';
import './App.css';
import "../node_modules/slick-carousel/slick/slick.css";
import "../node_modules/slick-carousel/slick/slick-theme.css";

class Slick extends Component {
	constructor(props){
		super(props);
		this.state = {breed: props.breed};
	}

	render () {
		var settings = {"lazyLoad": 'ondemand', "slidesToShow":3, "slidesToScroll":3, "arrows": true, "autoplay": true, "responsive": [{
			"breakpoint":640,
			"settings": {
				"arrows": false,
				"dots": true,
				"infinite": true,
				"slidesToShow": 1,
				"slidesToScroll": 1,
				"autoplay": true,
				"lazyLoad": 'ondemand'
			}
		}]};

		// var settings = {"slidesToShow":1, "slidesToScroll":1,"lazyLoad": true}


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
							// return <div key={image} className="carousel-item active" style={itemStyle}></div>
							return <img src={image} className="carousel-item active" />
						})
					}
				</Slider>
				<img className="wait" alt="wait spinner" src="./ajax-loader.gif" />
			</div>
		);
	}
}

export default Slick;
