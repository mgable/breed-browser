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