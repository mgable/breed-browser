import React, { Component } from 'react';
import Correct from './Correct.js';

class Answer extends Component{
	render(){
		var correct = null;
		if (!this.props.finished){
			if((this.props.userResponse === this.props.answer) &&  (this.props.userResponse === this.props.correct)){
				correct = true;
			} else if ((this.props.userResponse === this.props.answer) && (this.props.userResponse !== this.props.correct)){
				correct = false;
			}
			return(
				<li className="answer">
					<label onClick={this.props.isCorrectAnswer}>
						<input type="radio" name="answer" value={this.props.answer}/>
						&nbsp;{this.props.answer}&nbsp;
					</label>
					<Correct correct={correct}/>
				</li>
			);
		} 

		return null;
	}
}

export default Answer;