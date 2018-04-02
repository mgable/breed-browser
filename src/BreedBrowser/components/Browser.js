import React from 'react';
import LineItem from './LineItem';
import './Browser.css';
import _ from 'underscore';

const Browser = ({breed, breeds, onChoiceClick}) => {

	var index = 0,
		breedListings = _.map(breeds, (breedsList, alpha) => {
		index++;
		return (
			<ul className="no-bullets" key={index.toString()}>
				<li><h2>{alpha.toUpperCase()}</h2></li>
				<LineItem breeds={breedsList} onChoiceClick={onChoiceClick} ></LineItem>
			</ul>
		);
	});

	return <div className="breed-listing">{breedListings}</div>
	
}

export default Browser;

