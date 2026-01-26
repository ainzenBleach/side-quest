//Components
import TaskItem from './component/TaskItem';
import TaskForm from './component/TaskForm';

//Style
import './App.css'

//Hooks
import { useState, useEffect } from 'react';
import { useFetch } from './hooks/useFetch';

function App() {
  const url = "http://localhost:3001/api/tasks";

  const {data:tasks,fetchConfig, loading, error} = useFetch(url)

  const create = (title, description) => {
    const task = {
      title,
      description
    }
    fetchConfig(task, "POST")
  }

  const toggleTask = async (id, status) => {
      const data = {
        id,
        status
      }
      fetchConfig(data, "PUT")

  }

  const deleteTask = async (id) => {

    const data = {
      id
    }

    fetchConfig(data, "DELETE")
  }

  return (
    <>
      <div>
        <h1>Gerenciador de tarefas</h1>
        {/* Div para adicionar novas tarefas */}
        <TaskForm onAdd={create} />
        <div>
          {loading && <p>Carregando dados...</p>}
              <ul>
                {/* Utilizando o map para mapear as tarefas e criar os itens na list ordenada*/}
                {tasks && tasks.map((task) => (
                  <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask}/>
                ))}
              </ul>
        </div>
      </div>
    </>
  )
}

export default App
