import './TaskItem.css';
function TaskItem({task}){
    const statusClass = task.status ? 'status-done' : 'status-pending';

    return (
        // 3. Usando as classes do CSS
        <li className="task-card">
            <h3 className={`task-title ${statusClass}`}>
                {task.title}
            </h3>
            
            <p>{task.description}</p>
            
            <small className={statusClass}>
                Status: {task.status ? "Concluída" : "Pendente"}
            </small>
        </li>
    );
}

export default TaskItem