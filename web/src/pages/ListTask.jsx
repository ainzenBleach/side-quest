//Style
import "./CSS/ListTask.css"

//Components
import TaskItem from '../component/comp_task/TaskItem';


//Hooks
import api from "../hooks/axiosApi";
import { useCallback, useEffect, useState } from "react";
import CardTask from "../component/comp_task/CardTask";
import TaskFilter from "../component/comp_task/TaskFilter";

const ListTask = () => {

  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)

  const loadTasks = useCallback(async () => {
    setLoading(true)
    try {
      const res = await api.get("/api/tasks")
      setTasks(res.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadTasks()
  }, [loadTasks])

  const create = async (title, description, points, createdAt) => {
    try {
          const task = {
          title,
          description,
          points,
          createdAt
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
      api.get(`/api/tasks/month/${mes}/${ano}`)
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
        <CardTask create={create} />
        <TaskFilter onFilter={filterTask} onClear={loadTasks}/>
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