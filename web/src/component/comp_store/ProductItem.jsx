import { useState } from 'react'
import EditProduct from './EditProduct'

function ProductItem({product, onToggle, onDelete, onEdit}) {
  const [editing, setEditing] = useState(false)
  const statusClass = product.status ? 'status-done' : 'status-pending';

  const save = async (id, data) => {
      await onEdit(id, data)
      setEditing(false)
  }

    return (
        <li className="product-card">             
            <input type="checkbox" name="" id="" className={statusClass} onChange={() => onToggle(product.id, product.status)} checked={product.status == 1 ? true : false}/>

          <button type="button" onClick={() => setEditing(true)}>Editar</button>

            <button onClick={(e) => {
                e.stopPropagation();
                onDelete(product.id);
            }}>X</button>

          {editing ? (
              <EditProduct
                  product={product}
                  onSave={save}
                  onCancel={() => setEditing(false)}
              />
          ) : (
          <>
            <h3 className={`product-title ${statusClass}`}>
                {product.title}
            </h3>
            
            <p className={statusClass}>Points: {product.cost_points}</p>

            <p className={statusClass}>{product.description}</p>
            
            <small className={statusClass}>
                Status: {product.status ? "Concluída" : "Pendente"}
            </small>
            </>
            )}
        </li>
    );
}

export default ProductItem