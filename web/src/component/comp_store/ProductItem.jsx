import React from 'react'

function productItem({product, onToggle, onDelete}) {
  const statusClass = product.status ? 'status-done' : 'status-pending';

    return (
        //Usando as classes do CSS
        <li className="product-card">             
            <input type="checkbox" name="" id="" className={statusClass} onChange={() => onToggle(product.id, product.status)} checked={product.status == 1 ? true : false}/>

            <button onClick={(e) => {
                e.stopPropagation();
                onDelete(product.id);
            }}>X</button>
            <h3 className={`product-title ${statusClass}`}>
                {product.title}
            </h3>
            
            <p className={statusClass}>Points: {product.cost_points}</p>

            <p className={statusClass}>{product.description}</p>
            
            <small className={statusClass}>
                Status: {product.status ? "Concluída" : "Pendente"}
            </small>
            
        </li>
    );
}

export default productItem