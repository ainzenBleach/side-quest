//Style
import "./CSS/Store.css"

//Components
import StoreItem from '../component/comp_store/ProductItem'; 
import CardStore from '../component/comp_store/CardStore'

//Hooks
import api from "../hooks/axiosApi";
import { useEffect, useState } from "react";

const Store = () => {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    async function pegarTaks(){
      setLoading(true)
      api.get("/api/store")
      .then((res) => {
        setProducts(res.data)
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

  const create = async (title, description, cost_points) => {
    try {
          const product = {
          title,
          description,
          cost_points
        }

      await api.post("/api/store", product)
      setProducts([...products, product])
    } catch (error) {
      console.error(error)
    }
  }

  const toggleTask = async (id, status) => {
      api.put(`api/store/state/${id}`, {
        status:!status
      })
      let novaLista = products.map((product) =>
      product.id === id ? {
      ...product, status:!status
      } : product)
      setProducts(novaLista)
  }

  const deleteTask = async (id) => {
    api.delete(`api/store/${id}`)
    let novaLista = products.filter((task) => task.id !== id)
    setProducts(novaLista)
  }

  return (
    <div>
      
      <h1>Loja de itens</h1>

      <CardStore create={create}/>
      {loading && <p>Carregando dados...</p>}
      <ul>
        {
          products && products.map((product) => (
            <StoreItem key={product.id} product={product} onToggle={toggleTask} onDelete={deleteTask}/>
          ))
        }
      </ul>

    </div>
  )
}

export default Store
