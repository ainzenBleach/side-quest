import { useState } from "react";
import "./TaskItem.css";

function TaskForm ({onAdd}) {
    const [title, setTitle] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!title) return;

        onAdd(title)
        setTitle("")

    };

    return(
        <form action="" onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <button type="submit">Adicionar tarefa</button>
        </form>
    )
}


export default TaskForm