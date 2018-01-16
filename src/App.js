import React, { Component } from 'react';
import './App.css';
import Search from './Search.js';
import _ from 'underscore';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import Slick from "./Slick.js";

window.jQuery = $;
window.$ = $;

class App extends Component {
	constructor(props){
		super(props);
		this.state = {breed: props.breed, images: [], breeds: [], rawBreedsList: []};
		this.filterBreeds = this.filterBreeds.bind(this);
	}

	updateIt(breed){
		this.setState({breed});
		this.getBreedImages(breed);
	}

	search(){
		Search.getBreeds().then((response) => {
			this.setState({rawBreedsList: response});
			this.setState({breeds: _formatBreedsList(_groupByAlpha(response), this)});
		});
	}

	getRandomBreedImages(howMany){
		Search.getRandomImages(howMany).then((response) => {
			this.setState({images: response});
		}, (error) => {
			console.error(error);
		});
	}

	filterBreeds(input){
		var bl = {},
			re = new RegExp(input);

		_.each(this.state.rawBreedsList, (value, breed) => {

			if (re.test(breed)){
				_.extend(bl, {[breed]: value});
			}
		});

		this.setBreedsList(bl);
	}

	setBreedsList = function(list){
		var alphaBreedsObj =_groupByAlpha(list),
			breedsList = _formatBreedsList(alphaBreedsObj, this);

		this.setState({breeds: breedsList});
	}


	getBreedImages(breed){
		if (breed === "random"){
			this.getRandomBreedImages(10);
		} else {
			Search.getBreedImages(breed).then((breedImages) => {
				breedImages.length = 10;
				this.setState({images: breedImages});
			});
		}
	}

	componentDidMount() {
		this.search();
		this.getBreedImages(this.state.breed);
	}

	render(){
		return (
			<div className="App">
				<Slick breedImages={this.state.images} breed={this.state.breed}></Slick>
				<Browser breed={this.state.breed} breeds={this.state.breeds} filterBreeds={this.filterBreeds}></Browser>
			</div>
		);
	}
}

function Browser(props){
	return (
		<div className="main">
			<h2>Now showing {props.breed} pictures.</h2>
			<SearchField breed={props.breed} filterBreeds={props.filterBreeds}></SearchField>
			<div className="breed-listing">
				{props.breeds}
			</div>
		</div>
	);
}	

function _groupByAlpha(breeds){
	return _.groupBy(_.map(breeds, function(val, key){
		return {name: key, subbreeds: val}
	}), function(item){
		return item.name && item.name.charAt(0);
	});
}

function _formatBreedsList(alphaBreedsObj, props){
	var index = 0;
	return _.map(alphaBreedsObj, (breeds, alpha) => {
		index++;
		return (
			<ul className="no-bullets" key={index.toString()}>
				<li><h2>{alpha.toUpperCase()}</h2></li>
				<LineItem breeds={breeds} setBreed={props.updateIt.bind(props)}></LineItem>
			</ul>
		);
	});
}

class LineItem extends Component{
	constructor(props) {
		super(props);
		this.state = {breeds: props.breeds};
		this.handleClick = this.handleClick.bind(this);


	}

	handleClick(event) {
		this.props.setBreed(event.target.textContent);
	}

	render(){
		return (
			<ul>
				{this.props.breeds.map((breed) => {
					return <li onClick={this.handleClick} key={breed.name}>{breed.name}</li>
				})}
			</ul>
		);
	}
}

class SearchField extends Component {
	constructor(props) {
		super(props);
		this.state = {breed: props.breed};
		this.clearSearch = this.clearSearch.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		var value = event.target.value;
		this.setState({breed: value});
		this.props.filterBreeds(value);
	}

	clearSearch(){
		this.setState({breed: ""});
		this.props.filterBreeds("");
	}

	render() {
		return (
			<div className="search-wrapper">
				<form onSubmit={this.handleSubmit}>
					<label htmlFor="search">Search breeds:&nbsp;
						<input type="text" name="focus" required className="search-box search" onChange={this.handleChange} id="search" value={this.state.breed} placeholder="search" />
						<button onClick={this.clearSearch} className="close-icon" type="reset" />
					</label>
				</form>
			</div>
		);
	}
}

export default App;
