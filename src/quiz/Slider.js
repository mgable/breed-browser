import React, { Component } from 'react';
import "./Slider.css";

class Slider extends Component{
	render() {
		var itemStyle = {
			color: 'white',
			backgroundImage: 'url(' + this.props.breedImage + ')',
			WebkitTransition: 'all', // note the capital 'W' here
			msTransition: 'all' // 'ms' is the only lowercase vendor prefix
		};
		return (
			<div className="slider">
				<img className="wait" alt="wait spinner" src="./ajax-loader.gif" />
				<div className="image-holder" style={itemStyle}></div>
			</div>
		);
	}
}

export default Slider;

// <img alt="" src={this.props.breedImage} />