import { useState } from "react";


function StoreForm({onAdd}) {
      const [title, setTitle] = useState("")
      const [description, setdescription] = useState("")
      const [costPoints, setCostPoints] = useState(0)
  
      const handleSubmit = (e) => {
          e.preventDefault()
          if(!title) return;
  
          onAdd(title, description, costPoints)
          setTitle("")
          setdescription("")
          setCostPoints(0)
      };
  
      return(
          <form action="" onSubmit={handleSubmit}>
              <label>
                  <span>Title</span>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} name="title"/>
              </label>
              <label>
                  <span>Description</span>
                  <textarea className="textarea-task" type="text" value={description} onChange={(e) => setdescription(e.target.value)}></textarea>
              </label>
              <label>
                  <span>costPoints</span>
                  <input type="number" value={costPoints} onChange={(e) => setCostPoints(e.target.value)} name="costPoints"/> <br /> 
                  
                  <div style={{display:"flex", gap:"10px", marginBottom:"1.5rem"}}>
                  <button type="button" onClick={() => setCostPoints(costPoints - 10)}>-10</button> 
                  <button type="button" onClick={() => setCostPoints(costPoints - 50)}>-50</button>
                  <button type="button" onClick={() => setCostPoints(costPoints - 100)}>-100</button>
                  <button type="button" onClick={() => setCostPoints(0)}>0</button>
                  <button type="button" onClick={() => setCostPoints(costPoints + 10)}>+10</button> 
                  <button type="button" onClick={() => setCostPoints(costPoints + 50)}>+50</button>
                  <button type="button" onClick={() => setCostPoints(costPoints + 100)}>+100</button>
                  </div>
              </label>
              <button type="submit">Adicionar Produto</button>
          </form>
      )
}

export default StoreForm