import React from 'react';
import FontAwesome from 'react-fontawesome';
import 'font-awesome/css/font-awesome.css';
 
const Result = ({total, correct, wrong, current}) => {
	return (
		<div><span>Correct: {correct}</span>&nbsp;<span>Wrong: {wrong}</span>&nbsp;<span>Total: {current}/{total}</span></div>
	)
}
 
export default Result