import "./ProgressHeader.css"

interface Props {
    style:string
    record:number
}

export default function ProgressHeader({style,record}: Props){

    return(
        <div style={{right:`${style}`}} className='progress-header' >
            <p id="header-record"> 
            Best Score  %{record}
           </p>
        </div>
    )
}