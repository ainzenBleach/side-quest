import { useEffect, useState } from "react";

//style
import "../CSS/TaskForm.css";
import api from "../../hooks/axiosApi";

function TaskForm ({onAdd, onFilter}) {

    const [filtroData, setFiltroData] = useState({})
    const [SelectData, setSelectData] = useState({
    mes: [],
    ano: []
    })
    
    const [title, setTitle] = useState("")
    const [description, setdescription] = useState("")
    const [points, setpoints] = useState(0)

    useEffect(()=>{

        const data = new Date()

        const mes = data.getMonth() + 1
        const ano = data.getFullYear()
       
        async function monthAmount(){
        api.get("api/tasks/month-amount")
        .then((res)=>{

            const data = res.data

            const listaDataAno = [...new Set(data.map((i) => i.ano))]
            const listaDatames = [...new Set(data.map((i) => i.mes))]

            setSelectData({mes:listaDatames,ano:listaDataAno})
        })
        .catch((err)=>{
            console.error(err) 
        })
        .finally(
            setFiltroData({mes,ano})
        )
        }

        monthAmount()

    },[])

    

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!title) return;

        onAdd(title, description, points)
        setTitle("")
        setdescription("")
        setpoints(0)
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
                <span>Points</span>
                <input type="number" value={points} onChange={(e) => setpoints(e.target.value)} name="points"/> <br /> 
                
                <div style={{display:"flex", gap:"10px", marginBottom:"1.5rem"}}>
                <button type="button" onClick={() => setpoints(points - 10)}>-10</button> 
                <button type="button" onClick={() => setpoints(points - 50)}>-50</button>
                <button type="button" onClick={() => setpoints(points - 100)}>-100</button>
                <button type="button" onClick={() => setpoints(0)}>0</button>
                <button type="button" onClick={() => setpoints(points + 10)}>+10</button> 
                <button type="button" onClick={() => setpoints(points + 50)}>+50</button>
                <button type="button" onClick={() => setpoints(points + 100)}>+100</button>
                </div>
            </label>

            <label name="filtro" className={{display:"flex", gap:"1rem"}}>
                <select onChange={(e)=> setFiltroData({...filtroData, ano:e.target.value})} name="ano" id="Ano">
                    <option value={filtroData.ano} defaultChecked> - </option>
                    {SelectData.ano.map((data) => {
                        return(
                            <option value={data} key={data}>{data}</option>
                        )
                    })}
                </select>

                <select onChange={(e)=> setFiltroData({...filtroData, mes:e.target.value})} name="mes" id="mes">
                    <option value={filtroData.mes} defaultChecked> - </option>
                    {SelectData.mes.map((data) => {
                        return(
                            <option value={data} key={data}>{data}</option>
                        )
                    })}
                </select>
            </label>

            <div>
                <button type="button" onClick={() => {onFilter(filtroData.mes, filtroData.ano)}}>Aplicar filtro</button>
            </div>

            <button type="submit">Adicionar tarefa</button>
            

        </form>
    )
}


export default TaskForm