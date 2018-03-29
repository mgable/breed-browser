import { connect } from 'react-redux'
import { submitAnswer } from '../actions'
import TodoList from '../components/ChoiceList'
 
const getChoices = (choiceList, index) => {
  return choiceList[index];
}
 
const mapStateToProps = state => {
  return {
    choices: getChoices(state.choiceList, state.currentQuestion)
  }
}
 
const mapDispatchToProps = dispatch => {
  return {
    onChoiceClick: index => {
      dispatch(submitAnswer(index))
    }
  }
}
 
const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
 
export default VisibleTodoList