import React, { useState } from 'react'
import TaskForm from './TaskForm';
import "../CSS/CardModel.css"

function CardTask({create}) {

    const [exibir, setExibir] = useState(false)

    function mudarCard(){
        setExibir(!exibir)
    }
        
  return (
    
    exibir ? (
        <div className='cardModel'>
            <TaskForm onAdd={create} onChange={mudarCard}/> 
        </div>
    ) : (<button type='button' onClick={mudarCard}>Adicionar</button>)
    
    
  )
}

export default CardTask