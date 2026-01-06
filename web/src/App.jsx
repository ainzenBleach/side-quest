import { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import './App.css'

function App() {
  const [task, setTask] = useState([]);

  const createTask = async (title) => {
      try {
        const response = await fetch("http://localhost:3001/api/tasks",{
          method:'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title:title, description: "Tarefa criada pelo react" })
        })   
      if(response.ok){
        const NewTask = await response.json();

        setTask([...task, NewTask])

      }

      } catch (error) {
        console.error("Erro ao criar tarefa:", error)
      }
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

  useEffect(() => {
    console.log("Buscando os dados")

    const fetchTask = async () => {
      try{
        const response = await fetch("http://localhost:3001/api/tasks");
        const data = await response.json();
        setTask(data);
      } 
      catch(error){
        console.error("Erro de conexão:", error);
    }

    }
    fetchTask();
  }, [])

  return (
    <>
      <div>
        <h1>Gerenciador de tarefas</h1>
        {/* Div para adicionar novas tarefas */}
        <TaskForm onAdd={createTask} />
        <ul>
          {/* Utilizando o map para mapear as tarefas e criar os itens na list ordenada*/}
          {task.map(task => (
            <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask}/>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
