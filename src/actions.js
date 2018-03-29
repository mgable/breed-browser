import Search from './services.js';
import _ from 'underscore';

/*
 * action types
 */

 export const SUBMIT_ANSWER = 'SUBMIT_ANSWER'
 export const NEXT_QUESTION = 'NEXT_QUESTION'
 export const MAKE_QUIZ = 'MAKE_QUIZ'
 export const QUIZ_READY = 'QUIZ_READY'
 export const STATES = {START: "START", LOADED: "LOADED", FINISH: "FINISH"}

/*
 * action creators
 */

 export function submitAnswer(answer) {
 	return { type: SUBMIT_ANSWER, answer }
 }

  export function quizReady() {
 	return { type: QUIZ_READY }
 }

 export function nextQuestion() {
 	return { type: NEXT_QUESTION }
 }

 export function makeQuiz(quiz) {
 	return { type: MAKE_QUIZ, quiz }
 }


 export function fetchPosts() { 
 	return function (dispatch) { 
 		//dispatch(getData()) 
 		return _fetchData()
 		.then(
 			response => _makeQuiz(response),
 			error => console.log('An error occurred.', error)
 			)
 		.then(json => { dispatch(makeQuiz(json));dispatch(quizReady()) }
 			)
 	}
 }

 function _fetchData(){
 	return new Promise((resolve, reject) => {
 		Search.getBreeds().then((response) => {
 			resolve (response)
 		}, (error) => {
 			reject(error)
 		});	
 	});
 }

 const _makeQuiz = (breeds) => {
 	return new Promise((resolve, reject) => {
		var quiz = [], numOfQuestions = 4,
			rawBreedsList = Object.keys(breeds.message);

		while(numOfQuestions-- > 0){
			quiz.push(_makeQuestion(rawBreedsList));
		}

		Promise.all(quiz).then((response) => {
			resolve(response);
		}, (error) => {
			reject(error)
		})
		
 	});
}

const _makeQuestion = (rawBreedsList) => {
	return new Promise((resolve, reject) => {
		let breed = _pickRandomBreed(rawBreedsList),
			otherBreeds = _pickRandomBreed(rawBreedsList, 3, breed),
			choiceList = _makeChoiceList(breed, otherBreeds), 
			question = {
				choiceList,
				answer: _makeAnswer(choiceList, breed),
				image: null,
				response: null
			}

		_getImage(breed).then((image) => {
			question.image = image
			resolve(question);
		}, (error) => {
			reject(error);
		});
	});
}

const _getImage = (breed) => {
	return Search.getRandomBreedImage(breed).then((image) => {
		return image.message;
	});
}

const _makeChoiceList = (breed, otherBreeds) => {
	let breeds = [breed, ...otherBreeds],
		results = _.map(breeds, (breed, idx) => {
			return {text: breed, id: idx};
		});

	return _.shuffle(results);
}

const _makeAnswer = (choiceList, breed) => {
	var answer;

	for (let i = 0; i < choiceList.length; i++){
		if (choiceList[i].text === breed){
			answer = i;
			break;
		}
	}
	return answer;
}

const _pickRandomBreed = (_rawBreedsList, howMany = 1, omit) => {
	var results = [],
		total = howMany,
		rawBreedsList;

	if (omit){
		rawBreedsList = _.without(_rawBreedsList, omit);
	} else {
		rawBreedsList = _rawBreedsList.slice(0)
	}

	while(total--){
		var index = Math.floor((Math.random() * rawBreedsList.length)),
		item = rawBreedsList.splice(index, 1);
		results.push(item[0]);
	}

	if (howMany === 1){
		return results[0];
	}

	return results;
}