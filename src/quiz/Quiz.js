import { connect } from 'react-redux';
import { submitAnswer, nextQuestion } from '../actions';
import Layout from './components/Layout.jsx';
//import _ from 'underscore';

const getChoices = (state) => {
	//console.info(state);
	return state.quiz.questions[state.quiz.currentQuestion].choiceList
}

const getImage = (state) => {
	// console.info("the iamge");
	// console.info(state);
	return state.quiz.questions[state.quiz.currentQuestion].image
}

const getResponse = (state) => {
	// console.info("the response");
	// console.info(state);
	return state.quiz.questions[state.quiz.currentQuestion].response
}

const getCurrentQuestion = (state) => {
	// console.info("the response");
	// console.info(state);
	return state.quiz.questions[state.quiz.currentQuestion].response
}

const getCurrentSelection = (state) => {
	// console.info("the response");
	// console.info(state);
	return state.quiz.currentSelection
}

const getTotal = (state) => {
	return state.quiz.questions.length;
}

const getLoaded = (state) => {
	return state.quiz.status;
}

const getWrong = (state) => {
	return state.quiz.wrong;
}

const getCorrect = (state) => {
	return state.quiz.correct;
}

const getCurrent = (state) => {
	return state.quiz.currentQuestion + 1;
}

const mapStateToProps = state => {
	return {
		choices: getChoices(state),
		image: getImage(state),
		response: getResponse(state),
		current: getCurrent(state),
		currentQuestion: getCurrentQuestion(state),
		currentSelection: getCurrentSelection(state),
		total: getTotal(state),
		status: getLoaded(state),
		wrong: getWrong(state),
		correct: getCorrect(state)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onChoiceClick: id => {
			dispatch(submitAnswer(id));
			setTimeout(() => {
				dispatch(nextQuestion());
			}, 4000)
		}
	}
}


const QuizApp = connect(
	mapStateToProps,
	mapDispatchToProps
	)(Layout)

	export default QuizApp