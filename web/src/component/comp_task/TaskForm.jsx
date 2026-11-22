import { useState } from "react";

//style
import "../CSS/TaskForm.css";


function TaskForm ({onAdd,onChange}) {
    
    const [title, setTitle] = useState("")
    const [description, setdescription] = useState("")
    const [points, setpoints] = useState(0)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!title) return;

        const createdAt = new Date()

        onAdd(title, description, points, createdAt)
        setTitle("")
        setdescription("")
        setpoints(0)
        onChange()
    };

    return(
        <form action="" onSubmit={handleSubmit}>
            <button type="button" onClick={onChange}>Voltar</button>
            <label>
                <span>Title</span>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} name="title"/>
            </label>
            <label>
                <span>Description</span>
                <textarea className="textarea-task" type="text" value={description} onChange={(e) => setdescription(e.target.value)}></textarea>
            </label>
            <label>
                <span>Points</span>
                <input type="number" value={points} onChange={(e) => setpoints(e.target.value)} name="points"/> <br /> 
                
                <div style={{display:"flex", gap:"10px", marginBottom:"1.5rem"}}>
                <button type="button" onClick={() => setpoints(points - 10)}>-10</button> 
                <button type="button" onClick={() => setpoints(points - 50)}>-50</button>
                <button type="button" onClick={() => setpoints(points - 100)}>-100</button>
                <button type="button" onClick={() => setpoints(0)}>0</button>
                <button type="button" onClick={() => setpoints(points + 10)}>+10</button> 
                <button type="button" onClick={() => setpoints(points + 50)}>+50</button>
                <button type="button" onClick={() => setpoints(points + 100)}>+100</button>
                </div>
            </label>

            <button type="submit">Adicionar tarefa</button>
            

        </form>
    )
}


export default TaskForm