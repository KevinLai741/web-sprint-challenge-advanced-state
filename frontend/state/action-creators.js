// ❗ You don't need to add extra action creators to achieve MVP

import { 
  MOVE_CLOCKWISE, 
  MOVE_COUNTERCLOCKWISE,
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  INPUT_CHANGE,
  RESET_FORM
} from "./action-types"

import axios from "axios"

const URL = 'http://localhost:9000/api/quiz'

export function moveClockwise() { 
  return { type: MOVE_CLOCKWISE }
}

export function moveCounterClockwise() { 
  return { type: MOVE_COUNTERCLOCKWISE }
}

export function selectAnswer(answerId) { 
  return { type: SET_SELECTED_ANSWER, payload: answerId }
}

export function setMessage(message) {
  return { type: SET_INFO_MESSAGE, payload: message}
 }

export function setQuiz(quiz) { 
  return { type: SET_QUIZ_INTO_STATE, payload: quiz }
}

export function inputChange({ id, value }) {
  return { type: INPUT_CHANGE, payload: { id, value }}
}

export function resetForm() { 
  return { type: RESET_FORM }
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    dispatch(setQuiz(null))
    axios.get(`${URL}/next`)
      .then(response => {
        dispatch(setQuiz(response.data))
      })
      .catch(err => {
        console.error(err)
        dispatch(setMessage(err.message))
      })
  }
}
export function postAnswer(quiz_id, answer_id) {
  return function (dispatch) {
    axios.post(`${URL}/answer`, { quiz_id, answer_id })
      .then(response => {
        dispatch(selectAnswer(null))
        dispatch(setMessage(response.data.message))
        dispatch(fetchQuiz())
      })
      .catch(err => {
        console.error(err)
        dispatch(setMessage(err.message))
      })
  }
}
export function postQuiz(form) {
  return function (dispatch) {
    const payload = { 
      question_text: form.newQuestion,
      true_answer_text: form.newTrueAnswer,
      false_answer_text: form.newFalseAnswer
     }
    axios.post(`${URL}/new`, payload)
    .then(response => {
      dispatch(setMessage(`Congrats: "${response.data.question}" is a great question!`))
      dispatch(resetForm())
    })
    .catch(err => {
      console.log(err)
      dispatch(setMessage(err.message))
    })
    
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
