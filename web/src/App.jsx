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
      try {
        const response = await fetch(`http://localhost:3001/api/tasks/${id}`, {
          method: "PUT",
          headers:{
            'Content-Type': 'application/json'
          },
          body:
            JSON.stringify({
              status: !status
            })
        }
      )
      
      if(response.ok){
        setTask(task.map((taskAtual) =>{
          return (taskAtual.id === id) ? 
          {...taskAtual, status: !status}
          : taskAtual
        }))
      }
      } catch (error) {
        console.error("Falha na atualização", error)
      }
  }

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/tasks/${id}`, {
          method: "DELETE",
        }
      )
      if(response.ok){
        setTask(task.filter(task => task.id != id))
      }

    } 
    catch (error) {
      console.error("Falha na atualização", error)
    }
  }

  return (
    <>
      <div>
        <h1>Gerenciador de tarefas</h1>
        {/* Div para adicionar novas tarefas */}
        <TaskForm onAdd={create} />
        <div>
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
