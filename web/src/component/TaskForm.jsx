import { useState } from "react";

//style
import "./TaskForm.css";

function TaskForm ({onAdd}) {
    const [title, setTitle] = useState("")
    const [describe, setdescribe] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!title) return;

        onAdd(title, describe)
        setTitle("")
        setdescribe("")
    };

    return(
        <form action="" onSubmit={handleSubmit}>
            <label>
                <span>Title</span>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} name="title"/>
            </label>
            <label>
                <span>Description</span>
                <textarea className="textarea-task" type="text" value={describe} onChange={(e) => setdescribe(e.target.value)}></textarea>
            </label>
            <button type="submit">Adicionar tarefa</button>
        </form>
    )
}


export default TaskForm