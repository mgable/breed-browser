import React, { Component } from 'react';
import Correct from './Correct.js';

class Answer extends Component{
	render(){
		return(
			<li className="answer">Answer <Correct /></li>
		);
	}
}

export default Answer;