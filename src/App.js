import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './Search.js';
import _ from 'underscore';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';

window.jQuery = $;
window.$ = $;

class App extends Component {
	constructor(props){
		super(props);
		this.state = {breed: props.breed, items: [], images: [], breeds: []};
	}

	updateIt(name){
		this.setState({name: name});
		this.getBreedImages(name)
	}

	search(){
		Search.getBreeds().then((response) => {
			this.setState({breeds: _formatBreedsList(_groupByAlpha(response))});
		});
	}

	getRandomBreedImages(howMany){
		Search.getRandomImages(howMany).then((response) => {
			this.setState({images: response});
		}, (error) => {
			console.error(error);
		});
	}

	getBreedImages(breed){
		if (breed === "random"){
			//this.getRandomBreedImages(10);
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
				<Display breed={this.state.breed} images={this.state.images} updateIt={this.updateIt.bind(this)}></Display>
				<Browser breed={this.state.breed} breeds={this.state.breeds} updateIt={this.updateIt.bind(this)}></Browser>
			</div>
		);
	}
}

function Display(props){
	return (
		<div className="display">
			<ul>
				{props.images.map((image) => {
			    	return <li key={image}><img src={image} /></li>
				})}
	  		</ul>
		</div>
	);
}

function Browser(props){
	return (
		<div className="main">
			<h2>Now showing {props.breed} pictures.</h2>
			<div className="breed-listing">
				{props.breeds}
			</div>
		</div>
	);
}

// {props.breeds.map((breed) => {
// 						return <li key={breed}>{breed}</li>
// 					})}			

function _groupByAlpha(breeds){
	return _.groupBy(_.map(breeds, function(val, key){
		return {name: key, subbreeds: val}
	}), function(item){
		return item.name && item.name.charAt(0);
	});
}

function _formatBreedsList(alphaBreedsObj){
	var index = 0;
	return _.map(alphaBreedsObj, (breeds, alpha) => {
		index++;
		return (
			<ul className="no-bullets" key={index.toString()}>
				<li><h2>{alpha.toUpperCase()}</h2></li>
				<LineItem breeds={breeds}></LineItem>
			</ul>
		);
	});
}

class LineItem extends Component{
	constructor(props) {
		super(props);
		console.info("line item");
		console.info(props);

		this.state = {breeds: props.breeds};
		this.handleClick = this.handleClick.bind(this);


	}

	handleClick(event) {
		console.info("I am the event");
		console.info(event.target.textContent);
		//this.props.setBreed(event.target.textContent);
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

//<SearchField breed={this.state.breed} filterBreeds={this.filterBreeds.bind(this)}></SearchField>
		  // <SearchField breed={this.state.breed} filterBreeds={this.filterBreeds.bind(this)}></SearchField>
		// <div className="breed-listing">
		//   {this.state.breedsList}
		// </div>

  // return (
  //   <div>
  //     <h5>{props.name}</h5>
  //     <ul>
  //       {props.items.map((item)=>{
  //         return <li key={item}><a onClick={(event) => {props.updateIt(event.target.textContent)}}>{item}</a></li>
  //       })}
  //     </ul>
  //   </div>
  // );
//}




// function App(props){
//   return (
//     <div>
//       <div>{console.info("hey!!!!")}</div>
//       <h1>{_formatName(props.name)}!</h1>
//     </div>
//   );
// }

export default App;
