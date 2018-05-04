import { call, put } from 'redux-saga/effects'
import { fetchData, MAKE_BREED_BROWSER, MAKE_QUIZ, QUIZ_READY, makeBreedBrowser, makeQuiz } from './actions'

function* fetchPost(){ 
	var quiz,
		data = yield call(fetchData),
		breedbrowser = yield call(makeBreedBrowser, data.message);
	
	yield put({type: MAKE_BREED_BROWSER, breedbrowser});
	quiz = yield call(makeQuiz, data);
	yield put({type: MAKE_QUIZ, quiz});
	yield put({type: QUIZ_READY});
}

export default function* rootSaga(){
	yield fetchPost();
}