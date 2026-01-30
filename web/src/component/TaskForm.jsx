import { useState } from "react";

//style
import "./CSS/TaskForm.css";

function TaskForm ({onAdd}) {
    
    const [title, setTitle] = useState("")
    const [description, setdescription] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!title) return;

        onAdd(title, description)
        setTitle("")
        setdescription("")
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
            <button type="submit">Adicionar tarefa</button>
        </form>
    )
}


export default TaskForm