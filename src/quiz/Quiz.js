import React, { Component } from 'react';
import Slider from './Slider.js';
import Answers from './Answers.js';
import Search from '../Search.js';
import _ from 'underscore';
import './Quiz.css';

class Quiz extends Component{
	constructor(props){
		console.info("quiz inited");
		super(props);
		this.state = {breedImage: "", breed: "", quiz:[], total: 5, finished: false}
	}

	search(breed){
		if(breed){
			return Search.getRandomBreedImage(breed).then((image) => {
				return image;
			});
		}
	}

	componentDidMount() {
		console.info("Quiz componentDidMount");

		if (this.props && this.props.rawBreedsObj && !_.isEmpty(this.props.rawBreedsObj)){
			var quiz = this.makeQuiz(this.state.total),
				firstQuestion = quiz.pop();

			this.search(firstQuestion.breed).then((image)=> {
				this.setState({quiz});
				this.setState({breedImage: image, ...firstQuestion});
			})			
		}
	}

	advance(){
		if (this.state.quiz.length){
			var question = this.state.quiz.pop();

			//setTimeout(() => {
				this.search(question.breed).then((image) => {
					this.setState({breedImage: image, ...question});
				})
			//}, 1000);
			
		} else {
			console.info("FINISHED!!!!!");
			//setTimeout(() => {
				this.setState({"finished": true});
			//},1000);
		}
	}

	render() {
		if(this.state.breedImage && this.state.otherBreeds && this.state.breed){
			console.info("quiz rendered");
			return (
				<div className="quiz">
					<h1>Quiz</h1>
					<Slider breedImage={this.state.breedImage}></Slider>
					<Answers finished={this.state.finished} total={this.state.total} advance={this.advance.bind(this)} otherBreeds={this.state.otherBreeds} breed={this.state.breed}></Answers>
				</div>
			);
		} else {
			return null;
		}
	}

	makeQuiz(numOfQuestions = 1){
		var quiz = [],
			rawBreedsList = Object.keys(this.props.rawBreedsObj),
			breed,
			otherBreeds;

		while(numOfQuestions-- > 0){
			breed = _pickRandomBreed(rawBreedsList);
			otherBreeds = _pickRandomBreed(rawBreedsList, 3, breed);
			quiz.push({breed, otherBreeds});
		}
			
		return quiz;
	}
}

function _pickRandomBreed(rawBreedsList, howMany = 1, omit){
	var results = [],
		total = howMany;

	if (omit){
		rawBreedsList = _.without(rawBreedsList, omit);
	}

	while(total--){
		var index = Math.floor((Math.random() * rawBreedsList.length)),
			item = rawBreedsList.splice(index, 1);
		results.push(item[0]);
	}

	if (howMany === 1){
		return results[0];
	}

	return results;
}

export default Quiz;