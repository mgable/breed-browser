import React, { Component } from 'react';
import Answer from './Answer.js';

class Answers extends Component{
	render(){
		return(
			<div className="answers">
				<h3>Answers</h3>
				<ul>
					<Answer></Answer>
				</ul>
			</div>
		);
	}
}

export default Answers;