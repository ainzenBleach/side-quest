import './CSS/TaskItem.css';
function TaskItem({task, onToggle, onDelete}){
    const statusClass = task.status ? 'status-done' : 'status-pending';

    return (
        //Usando as classes do CSS
        <li className="task-card" onClick={() => onToggle(task.id, task.status)}> 
            <h3 className={`task-title ${statusClass}`}>
                {task.title}
            </h3>
            
            <p className={statusClass}>{task.description}</p>
            
            <small className={statusClass}>
                Status: {task.status ? "Concluída" : "Pendente"}
            </small>
            <button onClick={(e) => {
                e.stopPropagation();
                onDelete(task.id);
            }}>X</button>
        </li>
    );
}

export default TaskItem