import { useState } from "react";

//style
import "./CSS/TaskForm.css";

function TaskForm ({onAdd}) {
    
    const [title, setTitle] = useState("")
    const [description, setdescription] = useState("")
    const [points, setpoints] = useState(0)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!title) return;

        onAdd(title, description, points)
        setTitle("")
        setdescription("")
        setpoints(0)
    };

    return(
        <form action="" onSubmit={handleSubmit}>
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
                <input type="number" value={points} onChange={(e) => setpoints(e.target.value)} name="points"/>
            </label>
            <button type="submit">Adicionar tarefa</button>
        </form>
    )
}


export default TaskForm