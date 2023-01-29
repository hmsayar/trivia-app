import { useState, useEffect } from 'react'
import './App.css'
import OptionsPage from './components/OptionsPage'
import { decode } from 'html-entities';
import Question from './components/Question';
import ProgressHeader from './components/ProgressHeader';
import Timer from './components/Timer';
import useLocalStorage from './hooks/useLocalStorage';
import NewRecord from './components/NewRecord';


interface Q {
  category: string
  correct_answer: string
  difficulty: string
  incorrect_answers: string[]
  question: string
  type: string
}

export interface PQ extends Q {
  id: string
  isTrue: boolean,
  answers: string[]
  selectedAnswer: string
}

export interface Result {
  resultStyle: boolean
  trueNumber: number
}


function App() {
  const [questions, setQuestions] = useState<PQ[] | []>([])
  const [headerStyle, setHeaderStyle] = useState<string>("100%")
  const [result, setResult] = useState<Result>({ resultStyle: false, trueNumber: 0 })
  const [newRecord, setNewRecord] = useState<boolean>(false)
  const [record, setRecord] = useLocalStorage<number>("record", 0);




  useEffect(() => {

    setHeaderStyle((prev: string): string => {
      let value: number = (questions as any).reduce((acc: number, current: PQ): number => {
        if (current.selectedAnswer) {
          return (acc = acc + 1)
        } return acc
      }, 0)

      let updatedHeader: number = Math.floor((100 - (value / questions.length) * 100))

      return (updatedHeader.toString() + "%")
    })
  }, [questions])

  useEffect(()=>{
    if(result.resultStyle){
      if(Math.floor((result.trueNumber/questions.length)*100) > record){
        setRecord(()=> (Math.floor((result.trueNumber/questions.length)*100)))
        setNewRecord(true)
      }
    }
  },[result])



  function handleClick(queNum: string, queType: string, difficulty: string) {
      fetch(`https://opentdb.com/api.php?amount=${queNum}${queType}${difficulty}`)
        .then(res => res.json())
        .then(data => processData(data.results))
  }

  function processData(data: Array<Q>) {

    setQuestions(data.map((question: Q): PQ => {

      const answersArray = []

      for (let i = 0; i < question.incorrect_answers.length; i++) {
        answersArray.push(decode(question.incorrect_answers[i]))
      }
      answersArray.push(decode(question.correct_answer))

      let currentIndex = answersArray.length, randomIndex;

      while (currentIndex != 0) {


        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [answersArray[currentIndex], answersArray[randomIndex]] = [
          answersArray[randomIndex], answersArray[currentIndex]];
      }

      return ({
        ...question,
        question: decode(question.question),
        id: crypto.randomUUID(),
        answers: answersArray,
        isTrue: false,
        selectedAnswer: "",
      })
    }))
  }


  function toggleSelect(answer: string, id: string) {
    setQuestions(prev => prev.map(question => {

      let updatedQuestion: PQ

      if (question.id === id) {
        if (question.correct_answer === answer) {
          updatedQuestion = { ...question, isTrue: true, selectedAnswer: answer }
        } else {
          updatedQuestion = { ...question, isTrue: false, selectedAnswer: answer }
        }
      } else {
        updatedQuestion = { ...question }
      }
      return updatedQuestion
    }))
  }

  function handleResult() {

    let trueCount = 0
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].isTrue) {
        trueCount++
      }
    }
    setResult({ resultStyle: true, trueNumber: trueCount })

  }

  function clearResult(){
    setResult({ resultStyle: false, trueNumber: 0 })
  }

  function clearRecord(){
    setNewRecord(false)
  }



  const queElements = questions.map(que => <Question triviaResult={result} toggleSelect={toggleSelect} questionProps={que} />)

  return (
    <div className="App">
      {
        questions.length>0 ?
          <>
            <ProgressHeader record={record} style={headerStyle} />
            {!result.resultStyle && <Timer handleResult={handleResult} queCount={questions.length} />}
            {newRecord && <NewRecord record={record} />}
            {queElements}

            {
              result.resultStyle ?
                <div className='result-container'>

                  <h4 className="score">You scored {result.trueNumber}/{questions.length} correct answer</h4>

                  <button
                    className="result--button"
                    onClick={() => setQuestions([])}
                  >
                    Play Again
                  </button>

                </div> :

                <button
                  className="result--button"
                  onClick={handleResult}
                >
                  Check Answers
                </button>

            }
          </> :

          <OptionsPage clearRecord={clearRecord} clearResult={clearResult} handleClick={handleClick} />

      }
    </div>
  )
}

export default App
