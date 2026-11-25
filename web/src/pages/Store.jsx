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
      try {
        const res = await api.get("/api/store")
        if (!Array.isArray(res.data)) {
          throw new Error("A API /api/store não retornou uma lista de produtos.")
        }
        setProducts(res.data)
      } catch (err) {
        console.error("Erro ao carregar produtos:", err)
      } finally {
        setLoading(false)
      }
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

  const toggleProduct = async (id, status) => {
      api.put(`api/store/state/${id}`, {
        status:!status
      })
      let novaLista = products.map((product) =>
      product.id === id ? {
      ...product, status:!status
      } : product)
      setProducts(novaLista)
  }

  const deleteProduct = async (id) => {
    api.delete(`api/store/${id}`)
    let novaLista = products.filter((Product) => Product.id !== id)
    setProducts(novaLista)
  }
  
  const editProduct = async (id, data) => {
    try {
      await api.put(`/api/store/${id}`, data)
      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product.id === id ? { ...product, ...data } : product
        )
      )
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      
      <h1>Loja de itens</h1>

      <CardStore create={create}/>
      {loading && <p>Carregando dados...</p>}
      <ul>
        {
          products.map((product) => (
            <StoreItem key={product.id} product={product} onToggle={toggleProduct} onDelete={deleteProduct} onEdit={editProduct}/>
          ))
        }
      </ul>

    </div>
  )
}

export default Store
