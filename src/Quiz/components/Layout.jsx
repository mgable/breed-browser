import React from 'react';
import ChoiceList from './ChoiceList.jsx';
import './Layout.css'
import finished from '../../billpaxtongameoveraliens.jpg'
import Results from './Results.jsx';
import { STATES } from '../../actions';
 
const Layout = ({image, response, total, status, correct, current, wrong, ...rest}) => {
	var itemStyle = {
		color: 'white',
		backgroundImage: 'url(' + image + ')',
		WebkitTransition: 'all', // note the capital 'W' here
		msTransition: 'all' // 'ms' is the only lowercase vendor prefix
	};

	if (status === STATES.LOADED){
		return (
			<div className="quiz-holder">
				<h1>Quiz</h1>
				<img className="wait" alt="wait spinner" src="./ajax-loader.gif" />
				<div className="image-holder" style={itemStyle}></div>
				<h3>Answers</h3>
				<ChoiceList response={response} {...rest}></ChoiceList>
				<Results total={total} correct={correct} wrong={wrong} current={current}></Results>
			</div>
		)
	} else if (status === STATES.FINISH){
		return (
			<div className="quiz-holder">
				<h1>Quiz</h1>
				<div className="image-holder"><img className="game-over" alt="game over" src={finished} /></div>
				<div>Game Over Man!</div>
				<Results total={total} correct={correct} wrong={wrong} current={current}></Results>
			</div>
		)
	} else {
		return null;
	}
}
 
 
export default Layout