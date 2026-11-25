import { useState } from 'react'

function EditProduct({ product, onSave, onCancel }) {
  const [title, setTitle] = useState(product.title)
  const [description, setDescription] = useState(product.description || '')
  const [costPoints, setCostPoints] = useState(product.cost_points)

  const salvar = (e) => {
    e.preventDefault()

    if (!title.trim()) return

    onSave(product.id, {
      title: title.trim(),
      description: description.trim(),
      cost_points: Number(costPoints),
      status: product.status
    })
  }

  return (
    <form onSubmit={salvar}>
      <label>
        <span>Title</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          name="title"
        />
      </label>

      <label>
        <span>Description</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          name="description"
        />
      </label>

      <label>
        <span>costPoints</span>
        <input
          type="number"
          value={costPoints}
          onChange={(e) => setCostPoints(e.target.value)}
          name="costPoints"
        />
      </label>

      <button type="submit">Salvar</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  )
}

export default EditProduct