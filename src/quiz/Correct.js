import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import 'font-awesome/css/font-awesome.css';
import './Correct.css'

class Correct extends Component{
	render(){
		return(
			<span className="correct">
				<span className="yes">
					   <FontAwesome
							className='check'
							name='check'
					    />
				</span>
				<span className="no">
					<FontAwesome
						className='times'
						name='times'
					/>
				</span>
			</span>
		);
	}
}

export default Correct;