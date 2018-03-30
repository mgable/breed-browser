import React from 'react';
import './LineItem.css';

const LineItem = ({breeds, parent, onChoiceClick}) => {

	return (
		<ul>
			{breeds.map((breed) => {
				if (breed.subbreeds && breed.subbreeds.length){
					return ( <li onClick={(event) => onChoiceClick(breed.name, null, event)} key={breed.name}>{breed.name}
						<LineItem breeds={breed.subbreeds} onChoiceClick={onChoiceClick} parent={breed.name}></LineItem>
						</li>
					)
				} else {
					return <li onClick={(event) => onChoiceClick((parent || breed.name), breed, event)} key={breed.name || breed}>{breed.name || breed}</li>
				}
			})}
		</ul>
	);
}

/*
<ul>
				{this.props.breeds.map((breed) => {
					if (breed.subbreeds && breed.subbreeds.length){
						return ( <li onClick={(event) => this.props.setBreed(breed.name, event)} key={breed.name}>{breed.name}
							<LineItem breeds={breed.subbreeds} setBreed={(evt) => this.props.setBreed(evt, breed.name)}></LineItem>
							</li>
						)
					} else {
						return <li onClick={this.handleClick} key={breed.name || breed}>{breed.name || breed}</li>
					}
				})}
			</ul>
*/

export default LineItem;

/*
import React, { Component } from 'react';
import SearchField from './SearchField.js';
import LineItem from './LineItem';
import './Browser.css';
import _ from 'underscore';

const Browser = ({breeds, onChoiceClick}) => {
	// render(){
		// return null;
		// return (
		// 	<div className="main">
		// 		
		// 		<SearchField breed={this.props.breed} filterBreeds={this.props.filterBreeds}></SearchField>
		// 		<div className="breed-listing">
		// 			{this.props.breeds}
		// 		</div>
		// 	</div>
		// );
		var index = 0;
		return _.map(breeds, (breedsX, alpha) => {
			index++;
			return (
				<ul className="no-bullets" key={index.toString()}>
					<li><h2>{alpha.toUpperCase()}</h2></li>
					<LineItem breeds={breedsX} ></LineItem>
				</ul>
			);
		});
	// }
}

export default Browser;
*/