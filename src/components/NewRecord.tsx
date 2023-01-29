import "./NewRecord.css"

interface Props {
    record:number
}

export default function NewRecord({record}:Props){

    return(
        <div className="record-container">
            <h1 id="record">New Best Record  %{record}</h1>
        </div>
    )
}