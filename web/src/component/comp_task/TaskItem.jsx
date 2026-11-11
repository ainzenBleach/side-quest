import '../CSS/TaskItem.css';
function TaskItem({task, onToggle, onDelete}){
    const statusClass = task.status ? 'status-done' : 'status-pending';

    return (
        //Usando as classes do CSS
        <li className="task-card"> 

            
            <input type="checkbox" name="" id="" className={statusClass} onChange={() => onToggle(task.id, task.status)} checked={task.status == 1 ? true : false}/>

            <button onClick={(e) => {
                e.stopPropagation();
                onDelete(task.id);
            }}>X</button>
            <h3 className={`task-title ${statusClass}`}>
                {task.title}
            </h3>
            
            <p className={statusClass}>Points: {task.points}</p>

            <p className={statusClass}>{task.description}</p>
            
            <small className={statusClass}>
                Status: {task.status ? "Concluída" : "Pendente"}
            </small>
            
        </li>
    );
}

export default TaskItem