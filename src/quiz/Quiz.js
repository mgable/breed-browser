import React, { Component } from 'react';
import Slider from './Slider.js';
import Answers from './Answers.js';
import Search from '../Search.js';
import _ from 'underscore';
import './Quiz.css';

class Quiz extends Component{
	constructor(props){
		super(props);
		this.state = {breedImage: "", breed: ""}
	}

	search(breed){
		if(breed){
			Search.getRandomBreedImage(breed).then((image) => {
				this.setState({breedImage: image})
			});
		}
	}

	componentDidMount() {
		var rawBreedsList = Object.keys(this.props.rawBreedsObj),
			breed = _pickRandomBreed(rawBreedsList),
			otherBreeds = _pickRandomBreed(rawBreedsList, 3, breed);

		this.setState({breed, otherBreeds});
		this.search(breed);
	}

	componentWillReceiveProps(nextProps){
		var rawBreedsList = Object.keys(nextProps.rawBreedsObj),
			breed = _pickRandomBreed(rawBreedsList),
			otherBreeds = _pickRandomBreed(rawBreedsList, 3, breed);
		
		this.setState({breed, otherBreeds});
		this.search(breed);
	}

	render() {
		return (
			<div className="quiz">
				<h1>Quiz</h1>
				<Slider breedImage={this.state.breedImage}></Slider>
				<Answers otherBreeds={this.state.otherBreeds} breed={this.state.breed}></Answers>
			</div>
		);
	}
}

function _pickRandomBreed(rawBreedsList, howMany = 1, omit){
	var results = [],
		total = howMany;

	if (omit){
		rawBreedsList = _.without(rawBreedsList, omit);
	}

	while(total--){
	 results.push(rawBreedsList[Math.floor((Math.random() * rawBreedsList.length))]);
	}

	if (howMany === 1){
		return results[0];
	}

	return results;
}

export default Quiz;