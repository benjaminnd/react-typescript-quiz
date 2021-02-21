import React from 'react'
import { AnswerObject } from '../App'

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNum: number;
    totalQuestion: number;

}
const QuestionCard: React.FC<Props> = ({
    question,
    answers,
    callback,
    userAnswer,
    questionNum,
    totalQuestion
}) => {
    const getBtnClass = (answer: string) => {
        if (userAnswer?.answer === answer && userAnswer?.correctAnswer !== answer) {
            return "button-incorrect"
        }

        if (userAnswer?.correctAnswer === answer) {
            return "button-correct"
        }

        return "button-default"
    }
    return (
        <div className='card'>
            <p className="number">
                Question: {questionNum} / {totalQuestion}
            </p>
            <p dangerouslySetInnerHTML={{ __html: question }}></p>
            <div>
                {answers.map((answer) => (
                    <div className="buttonWrapper" key={answer}>
                        <button className={getBtnClass(answer)} disabled={userAnswer ? true : false} value={answer} onClick={callback}>
                            <span dangerouslySetInnerHTML={{ __html: answer }}></span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default QuestionCard
