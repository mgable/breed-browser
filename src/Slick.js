import React, { Component } from 'react';
import './App.css';
import './index.css';
import $ from 'jquery';
import _ from 'underscore';
import "../node_modules/slick-carousel/slick/slick.css";
import "../node_modules/slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import Search from "./Search.js";

window.jQuery = $;
window.$ = $;

// require('../node_modules/bootstrap/dist/js/bootstrap.min.js');
// require('../node_modules/bootstrap/dist/css/bootstrap.min.css');



class Slick extends Component {
	constructor(props){
		console.info('slick!!!');
		console.info(props);
		super(props);

		this.state = {/*dogImages: props.breedImages,*/ breed: props.breed};
	}

	// componentDidMount() {
	// 	console.info("here!");
	// 	Search.getRandomImages(10).then((response) => {
	// 		this.setState({dogImages: response});
	// 		console.info("set dog images");
	// 		console.info(response);
	// 	}, (error) => {
	// 		console.error(error);
	// 	});
 // 	}

 	changeImage(breed){
 		console.info("fiid");
 		console.info(breed);
 		Search.getBreedImages(breed).then((breedImages) => {
			breedImages.length = 10;
			console.info(breedImages);
			// breeds = breedImages;
			console.info("rerender");
			this.setState({dogImages: breedImages});
		});
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
				<img className="wait" src="./ajax-loader.gif" />
			</div>
		);
	}
}

//				<button onClick={this.changeImage.bind(this, this.state.breed)}>change</button>

export default Slick;
