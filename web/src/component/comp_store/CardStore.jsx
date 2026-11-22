import React, { useState } from 'react'
import StoreForm from './StoreForm';
import "../CSS/CardModel.css"

function CardStore({create}) {

    const [exibir, setExibir] = useState(false)

    function mudarCard(){
        setExibir(!exibir)
    }
        
  return (
    
    exibir ? (
        <div className='cardModel'>
            <StoreForm onAdd={create} onChangeCard={mudarCard}/> 
        </div>
    ) : (<button type='button' onClick={mudarCard}>Adicionar</button>)
    
    
  )
}

export default CardStore