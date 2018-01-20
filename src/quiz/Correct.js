import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import 'font-awesome/css/font-awesome.css';
import './Correct.css'

class Correct extends Component{
	render(){
		var correct = null;
		if (this.props.correct ){
			correct = <span className="yes">
						   <FontAwesome
								className='check'
								name='check'
						    />
					</span>
		} else if (this.props.correct === false){
			correct = <span className="no">
					<FontAwesome
						className='times'
						name='times'
					/>
				</span>
		}

		return(
			<span className="correct">
				{correct}
			</span>
		);
	}
}

export default Correct;