import React, { Component } from 'react';
import Answer from './Answer.js';
import _ from 'underscore';
import './Answers.css';

class Answers extends Component{
	constructor(props){
		console.info("answers initied");
		super(props);
		this.state = {answers: [], correct: "", userResponse: null, right: 0, wrong: 0};
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
		setTimeout(() => {
				this.setState({userResponse: null});
				this.props.advance();
		},1000);

	
		if (selectedAnswer === this.state.correct){
			console.info("CORRECT!");
			this.setState((prevState, props) => {
				return {right: ++prevState.right};
			});
		} else {
			console.info("WRONG!!!!");
			this.setState((prevState, props) => {
				return {wrong: ++prevState.wrong};
			});
		}
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
						{this.state.answers.map((answer, index) => {
							return <Answer finished={this.props.finished} key={answer + index} answer={answer} correct={this.state.correct} isCorrectAnswer={this.isCorrectAnswer.bind(this)} userResponse={this.state.userResponse}></Answer>
						})}
					</ul>
					<div>Correct: {this.state.right} Wrong: {this.state.wrong} Total: {this.props.total}</div>
				</div>
			);
		} else {
			return null;
		}
	}
}

export default Answers;