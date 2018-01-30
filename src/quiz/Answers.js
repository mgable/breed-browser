import React, { Component } from 'react';
import Answer from './Answer.js';
import _ from 'underscore';
import './Answers.css';

class Answers extends Component{
	constructor(props){
		console.info("answers initied");
		super(props);
		this.state = {answers: [], correct: "", userResponse: null};
	}

	makeQuestions(props){
		if (props.otherBreeds.length && props.breed){
			var answers = props.otherBreeds.slice(0);
			answers.push(props.breed);
			answers = _.shuffle(answers);
			this.setState({answers, correct:props.breed});
		}
	}

	isCorrectAnswer(response){
		var selectedAnswer = response.target.value;
		this.setState({userResponse: selectedAnswer});
		this.props.advance();
	}

	componentDidMount(){
		console.info("componentDidMoun: receving");
		this.makeQuestions(this.props);
	}

	componentWillReceiveProps(nextProps){
		console.info("componentWillReceiveProps");
		this.makeQuestions(nextProps);
	}

	render(){
		if((this.state.answers && this.state.answers.length && this.state.correct) || this.state.userResponse){
			console.info("Answers rendering");
			console.info(this.state.answers);
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
		} else {
			return null;
		}
	}
}

export default Answers;