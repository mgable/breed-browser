import React, { Component } from 'react';
import Answer from './Answer.js';
import _ from 'underscore';
import './Answers.css';

class Answers extends Component{
	constructor(props){
		super(props);
		this.state = {answers: [], correct: "", userResponse: null};
	}

	makeQuestions(props){
		console.info("here!");
		if (props.otherBreeds.length && props.breed){
			console.info("I have the answers");
			console.info(props);
			var answers = props.otherBreeds.slice(0);
			answers.push(props.breed);
			answers = _.shuffle(answers);
			this.setState({answers, correct:props.breed});
		}
	}

	isCorrectAnswer(response){
		var selectedAnswer = response.target.value;
		this.setState({userResponse: selectedAnswer});
	}

	componentWillReceiveProps(props){
		this.makeQuestions(props);
	}

	render(){
		return(
			<div className="answers">
				<h3 className="title">Answers</h3>
				<ul>
					{this.state.answers.map((answer) => {
						return <Answer key={answer} answer={answer} correct={this.state.correct} isCorrectAnswer={this.isCorrectAnswer.bind(this)} userResponse={this.state.userResponse}></Answer>
					})}
				</ul>
			</div>
		);
	}
}

export default Answers;