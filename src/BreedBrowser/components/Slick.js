import React from 'react';
import Slider from 'react-slick';
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import './Slick.css';

const Slick = ({images}) => {
	var settings = {/*"lazyLoad": 'ondemand', */"slidesToShow":3, "slidesToScroll":3, "arrows": true, "autoplay": true, "responsive": [{
		"breakpoint":640,
		"settings": {
			"arrows": false,
			"dots": true,
			"infinite": true,
			"slidesToShow": 1,
			"slidesToScroll": 1,
			"autoplay": true,
			// "lazyLoad": 'ondemand'
		}
	}]};

	console.info("the imagews in slick");
	console.info(images);

	return (
		<div className="slick">
			<Slider {...settings}>
				{
					images.map((image) => {
						console.info(image);
						return <img alt="dog" key={image} src={image} className="carousel-item active" />
					})
				}
			</Slider>
			<img className="wait" alt="wait spinner" src="./ajax-loader.gif" />
		</div>
	);
}

export default Slick;
