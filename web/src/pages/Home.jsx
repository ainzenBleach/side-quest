import { useEffect, useState } from 'react'
import './CSS/Home.css'
import api from '../hooks/axiosApi'

const Home = () => {

  const [points, setPoints] = useState(0)


  useEffect(() => {
    api.get("/api/points")
    .then((res) => {
      setPoints(res.data)
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => {
      
    })
  },[])
  return (
    <div>
      <p>Meus pontos: {points}</p>
    </div>
  )
}

export default Home