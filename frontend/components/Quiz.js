import React, { useEffect } from 'react'
//REDUX Imports:
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Quiz(props) {
  const { quiz, selectedAnswer, fetchQuiz, selectAnswer, postAnswer } = props

  useEffect(() => {
    !quiz && fetchQuiz()
  }, [])

  const selectHandler = id => {
    selectAnswer(id)
  }

  const submitHandler = () => {
    postAnswer(quiz.quiz_id, selectedAnswer)
  }

  return (
    <div id="wrapper">
      {
        quiz ? 
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              {
                quiz.answers.map(answer => 
                  <div className={answer.answer_id === selectedAnswer ? "answer selected" : "answer"} onClick={() => selectHandler(answer.answer_id)} key={answer.answer_id}>
                      {answer.text}
                      <button>{answer.answer_id === selectedAnswer ? "SELECTED" : "Select"}</button>
                  </div>
                )
              }
            </div>
            <button id="submitAnswerBtn" disabled={!selectedAnswer} onClick={submitHandler}>Submit answer</button>
          </>
         : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = state => {
  return { 
    quiz: state.quiz,
    selectedAnswer: state.selectedAnswer
   }
}

export default connect(mapStateToProps, actionCreators)(Quiz)

