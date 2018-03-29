import { combineReducers } from 'redux'
import { SUBMIT_ANSWER, NEXT_QUESTION, MAKE_QUIZ, QUIZ_READY, STATES } from './actions'
import _ from 'underscore'

 
const initialState = {
	status: STATES.START,
	current: 1,
	currentQuestion: 0,
	currentSelection: null,
	wrong: 0,
	correct: 0,
	questions: [{
		choiceList: [], 
		answer: null,
		image: null,
		response: null
	}]
}
/*
	{
		choiceList: [
		{text: "Doberman", id: 1},
		{text: "Scottish Terrier", id: 2},
		{text: "Akira", id: 3},
		{text: "Hound", id: 4},
		], 
		answer: 2,
		image: "https://dummyimage.com/150x250/000/fff",
		response: null
	},{
		choiceList: [
		{text: "Saint Bernard", id: 1},
		{text: "Germany Shepard", id: 2},
		{text: "Golden Retriever", id: 3},
		{text: "Great Dane", id: 4},
		], 
		answer: 0,
		image: "https://dummyimage.com/150x250/CCC/FFF",
		response: null
	}
*/

function makeQuiz(state, action){
	state.questions = action.quiz
	return _.extend({}, state)
}
 
function quiz(state = initialState, action) {
	switch(action.type){
		case SUBMIT_ANSWER: return checkAnswer(state, action)
		case NEXT_QUESTION: return advanceQuiz(state, action)
		case MAKE_QUIZ: return makeQuiz(state, action)
		case QUIZ_READY: return broadcastQuiz(state, action)
		default: return state
	}  
}

function broadcastQuiz(state, action){
	state.status = STATES.LOADED;
	return _.extend({}, state);
}


function checkAnswer(state, action){
	var question = state.questions[state.currentQuestion]
	question.response = (question.answer === action.answer) ? question.answer : false;
	if (question.response !== false) {
		state.correct += 1;
	} else {
		state.wrong += 1;
	}
	state.currentSelection = action.answer;
	return _.extend({}, state);
}

function advanceQuiz(state, action){
	if (state.currentQuestion < (state.questions.length - 1)){
		state.currentQuestion += 1;
		state.currentSelection = null;
		console.info("next Question");
	} else {
		console.info("end");
		state.status = STATES.FINISH;
	}
	return _.extend({}, state);
}


 
const quizApp = combineReducers({
	quiz
})
 
export default quizApp