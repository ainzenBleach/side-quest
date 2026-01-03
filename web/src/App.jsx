import { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import './App.css'


function App() {
  const [task, setTask] = useState([]);

  useEffect(() => {
    console.log("Buscando os dados")
  }, [])

  return (
    <>
      <div>
        <h1>Gerenciador de tarefas</h1>
        <ul>
          {/* Utilizando o map para mapear as tarefas e criar os itens na list ordenada*/}
          {task.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
