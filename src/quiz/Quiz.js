import React, { Component } from 'react';
import Slider from './Slider.js';
import Answers from './Answers.js';
import Search from '../Search.js';
import './Quiz.css';

class Quiz extends Component{
	constructor(props){
		super(props);
		console.info(props);
	}

	search(){
		Search.getRandomBreedImage('malamute').then((image) => {
			console.info(image);
		})
	}

	componentDidMount() {
		this.search();
	}

	render() {
		return (
			<div className="quiz">
				<h1>Quiz</h1>
				{Object.keys(this.props.rawBreedsObj)}
				<Slider></Slider>
				<Answers></Answers>
			</div>
		);
	}
}

export default Quiz;