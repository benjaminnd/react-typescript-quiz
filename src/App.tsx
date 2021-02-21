import { loadavg } from 'os';
import React, { useState, useEffect } from 'react';
import { fetchQuizData } from './API'
import { Difficulty, QuestionState } from './API'
//components
import QuestionCard from './components/QuestionCard'
import './App.css'


export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;
const App = () => {
  const [Loading, setLoading] = useState(false)
  const [Questions, setQuestions] = useState<QuestionState[]>([])
  const [Number, setNumber] = useState(0)
  const [UserAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [Score, setScore] = useState(0)
  const [GameOver, setGameOver] = useState(true);

  useEffect(() => {
    console.log(Questions)
    console.log(UserAnswers.length, TOTAL_QUESTIONS)
  }, [Loading])

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    try {
      const newQuestions = await fetchQuizData(
        TOTAL_QUESTIONS,
        Difficulty.EASY
      );

      setQuestions(newQuestions)
      setScore(0);
      setUserAnswers([]);
      setNumber(0)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }

  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!GameOver) {
      //Users answers
      const answer = e.currentTarget.value;
      //Check answer again correct value
      const correct = Questions[Number].correct_answer === answer

      //Add score if answer is correct
      if (correct) setScore(prev => prev + 1)
      //Save answer in the array for user answer
      const answerObject: AnswerObject = {
        question: Questions[Number].question,
        answer,
        correct,
        correctAnswer: Questions[Number].correct_answer
      }

      setUserAnswers(prev => [...prev, answerObject])

    }
  }


  //Move on to next question if not the last question
  const nextQuestion = () => {
    const nextQuestion = Number + 1
    if (nextQuestion == TOTAL_QUESTIONS) {
      setGameOver(true)
    } else {
      setNumber(nextQuestion)
    }
  }

  return (
    <>
      <div className="App">
        <h1>React Quizz</h1>
        {(GameOver || UserAnswers.length === TOTAL_QUESTIONS) && (<button className="start" onClick={startTrivia}>Start</button>)}
        {!GameOver && <p className="score">Score: {Score}</p>}
        {Loading && <p>Loading questions...</p>}
        {!Loading && !GameOver && (<QuestionCard
          questionNum={Number + 1}
          totalQuestion={TOTAL_QUESTIONS}
          question={Questions[Number].question}
          answers={Questions[Number].answers}
          userAnswer={UserAnswers ? UserAnswers[Number] : undefined}
          callback={checkAnswer}
        />)}
        {!GameOver && !Loading && UserAnswers.length === Number + 1 && Number !== TOTAL_QUESTIONS - 1 && (

          <button className="next" onClick={nextQuestion}>Next</button>
        )}
      </div>
    </>
  );
}

export default App;



