import React, { useState, useEffect } from 'react'
import "./OptionsPage.css"

interface Props {
    handleClick: (a:string, b:string, c:string) => void
    clearResult: () => void
    clearRecord: () => void
}

export default function OptionsPage({ handleClick, clearResult, clearRecord }: Props) {
    const [questionNumber, setQuestionNumber] = useState<string>("5")
    const [queType, setQueType] = useState<string>("")
    const [difficulty, setDifficulty] = useState<string>("")

    useEffect(()=>{
        clearResult()
        clearRecord()
    },[])

    function handleNumber(e: React.ChangeEvent<HTMLInputElement>) {
        let target = e.target
        setQuestionNumber(target.value)
    }
    function handleQueType(e: React.ChangeEvent<HTMLSelectElement>) {
        let target = e.target
        setQueType(target.value)
    }
    function handleDifficulty(e: React.ChangeEvent<HTMLSelectElement>){
        let target = e.target
        setDifficulty(target.value)
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        handleClick(questionNumber, queType, difficulty)
    }



    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    id="number-input"
                    name=""
                    type="number"
                    value={questionNumber}
                    min="1"
                    max="30"
                    onChange={handleNumber}
                    placeholder="Number of questions"
                />
                <span></span>
                <select onChange={handleQueType}>
                    <option className='select-items' value="">Any Type</option>
                    <option className='select-items' value="&type=multiple">Multiple Choice</option>
                    <option className='select-items' value="&type=boolean">True/False</option>
                </select>
                <select onChange={handleDifficulty}>
                    <option className='select-items' value="">Any Difficulty</option>
                    <option className='select-items' value="&difficulty=easy">Easy</option>
                    <option className='select-items' value="&difficulty=medium">Medium</option>
                    <option className='select-items' value="&difficulty=hard">Hard</option>
                </select>

                <button id="start-btn" type="submit">Start</button>

            </form>
        </>
    )
}