import React from "react";
import "./Question.css"

import { PQ } from "../App";
import { Result } from "../App"

interface Props {
    questionProps: PQ
    toggleSelect: (answer: string, id: string) => void
    triviaResult: Result
}

export default function Question({ toggleSelect, questionProps, triviaResult }: Props) {



    const displayAnswer = questionProps.answers.map(item => {

        let answerStyle:string = ""

        if (triviaResult.resultStyle) {
            if (item === questionProps.selectedAnswer) {
                answerStyle = "true--style"
            } else if (item === questionProps.correct_answer && item != questionProps.selectedAnswer) {
                answerStyle = "false--style"
            }
        }
        else {
            if (item === questionProps.selectedAnswer) {
                answerStyle = "selected--answer"
            } else {
                answerStyle = ""
            }
        }
        return (
            <div
                className={`answer-container ${answerStyle}`}
                onClick={() => { !triviaResult.resultStyle && toggleSelect(item, questionProps.id) }}>
                <p>{item}</p>
            </div>
        )
    })

    return (
        <div className="question-container">
            <div className="que-container">
                <h4>{questionProps.question}</h4>

            </div>
            <div className="answers-container">
                {displayAnswer}
            </div>
        </div>
    )
}