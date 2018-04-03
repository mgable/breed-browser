import { combineReducers } from 'redux'
import { SUBMIT_ANSWER, NEXT_QUESTION, MAKE_QUIZ, QUIZ_READY, STATES, MAKE_BREED_BROWSER, FILTER_BREEDS, SELECT_BREED, GroupByAlpha } from './actions'
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

const initialStateBreeds = {
	rawBreedsObj:{},
	breed: "random",
	breeds: [],
	images: [],
	sub: null
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
	}
*/

function makeQuiz(state, action){
	var questions = action.quiz
	return _.extend({}, state, {questions})
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

function breedbrowser(state = initialStateBreeds, action) {
	switch(action.type){
		case MAKE_BREED_BROWSER: return makeBreedBrowser(state, action)
		case FILTER_BREEDS:  return filterBreedsList(state, action)
		case SELECT_BREED: return selectBreed(state, action)
		default: return state
	}  
}

function filterBreedsList(state, action){
	if (action.term){
		var breedsList = {},
			re = new RegExp("\\b" + action.term),
			breeds = {}

		_.each(state.rawBreedsObj, (value, breed) => {
			var subBreedsList = [];

			if (re.test(breed)){
				_.extend(breedsList, {[breed]: value});
			}

			if (value.length){
				_.each(value, (sub) => {
					if (re.test(sub)){
						subBreedsList.push(sub)
					}
				})
			}

			if (subBreedsList.length){
				_.extend(breedsList, {[breed]: subBreedsList});
			}
		});

		breeds = GroupByAlpha(breedsList)

		
	} else {
		breeds = GroupByAlpha(state.rawBreedsObj)
	}

	return _.extend({}, state, {breeds});
}

function selectBreed(state, action){
	var breed = action.breed,
		sub = action.sub,
		images = action.images;
	return _.extend({}, state, {breed, sub, images});
}

function makeBreedBrowser(state, action){
	var rawBreedsObj = action.breedbrowser.rawBreedsObj,
		breeds = action.breedbrowser.breeds,
		images = action.breedbrowser.images;
	return _.extend({}, state, {rawBreedsObj, breeds, images});
}


function broadcastQuiz(state, action){
	var status = STATES.LOADED;
	return _.extend({}, state, {status});
}


function checkAnswer(state, action){
	var question = state.questions[state.currentQuestion],
		correct,
		wrong;

	question.response = (question.answer === action.answer) ? question.answer : false;
	if (question.response !== false) {
		correct = state.correct + 1;
		wrong = state.wrong;
	} else {
		correct = state.correct;
		wrong = state.wrong + 1;
	}
	var currentSelection = action.answer;
	return _.extend({}, state, {currentSelection, wrong, correct});
}

function advanceQuiz(state, action){
	var currentQuestion,
		currentSelection,
		status;

	if (state.currentQuestion < (state.questions.length - 1)){
		currentQuestion = state.currentQuestion + 1;
		currentSelection = null;
		console.info("next Question");
	} else {
		console.info("end");
		status = STATES.FINISH;
	}
	return _.extend({}, state, {currentQuestion, currentSelection, status});
}


 
const quizApp = combineReducers({
	quiz,
	breedbrowser
})
 
export default quizApp