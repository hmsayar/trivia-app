import { useState, useEffect } from "react";
import "./Timer.css"

interface Props {
    handleResult:()=>void
    queCount:number
}

export default function Timer({handleResult, queCount}:Props){
    const [time, setTime] = useState<number>(queCount*10)

    useEffect(()=>{
        const timer = setTimeout(() => {
            setTime(prev => prev - 1);
          }, 1000);
          if (time === 0) {
            clearTimeout(timer);
            handleResult()
          }
          return () => clearTimeout(timer);
    },[time])

    return(
        <h1 id="timer">{time}</h1>
    )
}