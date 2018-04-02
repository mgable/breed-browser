import React from 'react';
import LineItem from './LineItem';
import './Browser.css';
import _ from 'underscore';

const Browser = ({breed, breeds, onChoiceClick}) => {
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
	// }
}

export default Browser;

/*
setBreed={props.updateIt.bind(props)}

import React from 'react';
import FontAwesome from 'react-fontawesome';
import 'font-awesome/css/font-awesome.css';
import './Choice.css'
 
const Choice = ({onClick, text, response, index, currentSelection}) => {
	var klass, correct;
	if (response === false && index === currentSelection) {
		klass = 'wrong'
		correct = <span className="no">
				<FontAwesome
					className='times'
					name='times'
				/>
			</span>
	} else if (response === index){
		klass = 'correct'
		correct = <span className="yes">
			   <FontAwesome
					className='check'
					name='check'
			    />
		</span>
	} else {
		klass ='not-answered'
	}

	return (
		<li className={klass}  onClick={onClick}>
			<label>
				<input checked={index === currentSelection} type="radio" name="question"  value={text}/>&nbsp;{text} {correct}
			</label>
		</li>
	)
}
 
export default Choice

*/