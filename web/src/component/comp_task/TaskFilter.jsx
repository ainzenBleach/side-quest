import React, { useEffect, useState } from 'react'
import Api from '../../hooks/axiosApi'

function TaskFilter({onFilter, onClear}) {

        const [filtroData, setFiltroData] = useState({ mes: "", ano: "" })
        const [selectData, setSelectData] = useState({
        mes: [],
        ano: []
        })

        useEffect(() => {
            async function monthAmount() {
                try {
                    const { data } = await Api.get("/api/tasks/month-amount")
                    const listaDataAno = [...new Set(data.map((item) => item.ano))]
                    const listaDatames = [...new Set(data.map((item) => item.mes))]

                    setSelectData({ mes: listaDatames, ano: listaDataAno })
                } catch (error) {
                    console.error(error)
                }
            }

            monthAmount()
        }, [])

        const clearFilter = () => {
            setFiltroData({ mes: "", ano: "" })
            onClear()
        }
  return (
    <div>
        <label name="filtro" style={{ display: "flex", gap: "1rem" }}>
                <select value={filtroData.ano} onChange={(e)=> setFiltroData({...filtroData, ano:e.target.value})} name="ano" id="Ano">
                    <option value="">Ano</option>
                    {selectData.ano.map((data) => {
                        return(
                            <option value={data} key={data}>{data}</option>
                        )
                    })}
                </select>

                <select value={filtroData.mes} onChange={(e)=> setFiltroData({...filtroData, mes:e.target.value})} name="mes" id="mes">
                    <option value="">Mês</option>
                    {selectData.mes.map((data) => {
                        return(
                            <option value={data} key={data}>{data}</option>
                        )
                    })}
                </select>
            </label>

            <div>
                <button type="button" disabled={!filtroData.mes || !filtroData.ano} onClick={() => onFilter(filtroData.mes, filtroData.ano)}>Aplicar filtro</button>
                <button type="button" onClick={clearFilter}>Limpar filtro</button>
            </div>
    </div>
  )
}

export default TaskFilter