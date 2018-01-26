import React from 'react'
import Slick from "./Slick.js";
import Browser from './Browser.js';
import LineItem from './LineItem.js';
import Search from './Search.js';
import _ from 'underscore';


class BreedBrowser extends React.Component {
	constructor(props){
		super(props);
		this.state = {breed: "random", images: [], breeds: [], rawBreedsObj: {}, sub: ""};
		this.filterBreeds = this.filterBreeds.bind(this);
	}

	updateIt(breed, sub){
		console.info("looing for breed");
		console.info(breed);
		// console.info(event);
		// if (event){
		// 	event.preventDefault();
		// 	event.stopPropagation();
		// }
		if (sub && typeof sub === "string"){
			console.info("looking for sub breed");
			console.info(sub);
			this.setState({sub});
		} else {
			sub = false;
		}
		this.setState({breed});
		this.getBreedImages(breed, sub);
	}

	search(response){
		this.setState({rawBreedsList: response});
		this.setState({breeds: _formatBreedsList(_groupByAlpha(response), this)});
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

		// return breedsList;
		this.setState({breeds: breedsList });
	}


	getBreedImages(breed, sub){
		if (breed === "random"){
			this.getRandomBreedImages(10);
		} else if (sub){
			Search.getSubBreedImages(sub, breed).then((breedImages) => {
				breedImages.length = 10;
				this.setState({images: breedImages});
			});
		} else {
			Search.getBreedImages(breed).then((breedImages) => {
				breedImages.length = 10;
				this.setState({images: breedImages});
			});
		}
	}

	componentDidMount() {
		this.search(this.props.rawBreedsObj);
		this.getRandomBreedImages(10);
	}

	render(){
		return (
			<div className="App">
				<Slick breedImages={this.state.images} breed={this.state.breed}></Slick>
				<Browser sub={this.state.sub} breed={this.state.breed} breeds={this.state.breeds} filterBreeds={this.filterBreeds}></Browser>
			</div>
		);
	}
}

function _groupByAlpha(breeds){
	return _.groupBy(_.map(breeds, function(val, key){
		return {name: key, subbreeds: val};
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

export default BreedBrowser;