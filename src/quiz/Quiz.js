import React, { Component } from 'react';
import Slider from './Slider.js';
import Answers from './Answers.js';
import './Quiz.css';

class Quiz extends Component{
	render() {
		return (
			<div className="quiz">
				<h1>Quiz</h1>
				<Slider></Slider>
				<Answers></Answers>
			</div>
		);
	}
}

export default Quiz;