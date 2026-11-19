//Style
import "./CSS/ListTask.css"

//Components
import TaskItem from '../component/comp_task/TaskItem';
import TaskForm from '../component/comp_task/TaskForm';

//Hooks
import api from "../hooks/axiosApi";
import { useEffect, useState } from "react";

const ListTask = () => {

  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    
    async function pegarTaks(){
      setLoading(true)
      api.get("/api/tasks")
      .then((res) => {
        setTasks(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
      .finally( () =>{
        setLoading(false)
      }
      )
      
    }

    pegarTaks()
  },[])

  const create = async (title, description, points) => {
    try {
          const task = {
          title,
          description,
          points
        }

      await api.post("/api/tasks", task)
      setTasks([task, ...tasks])
    } catch (error) {
      console.error(error)
    }
  }

  const toggleTask = async (id, status) => {
      api.put(`api/tasks/state/${id}`, {
        status:!status
      })
      let novaLista = tasks.map((task) =>
      task.id === id ? {
      ...task, status:!status
      } : task)
      setTasks(novaLista)
  }

  const deleteTask = async (id) => {
    api.delete(`api/tasks/${id}`)
    let novaLista = tasks.filter((task) => task.id !== id)
    setTasks(novaLista)
  }

  const filterTask = async (mes, ano) => {
      setLoading(true)
      api.get(`api/tasks/month/${mes}/${ano}`)
      .then((res)=> {
        setTasks(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
      .finally( () =>{
        setLoading(false)
      }
      )
  }

  return (
    <>
      <div>
        <h1>Gerenciador de tarefas</h1>
        {/* Div para adicionar novas tarefas */}
        <TaskForm onAdd={create} onFilter={filterTask}/>
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

export default ListTask