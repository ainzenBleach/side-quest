import { useEffect, useState } from "react";

export const useFetch = (url) => {

    //Informações das tarefas
    const [data, setdata] = useState([])

    //Atualização da task
    const [idTask,setIdTask] = useState(null)   

    // Config fetch
    const [config, setConfig] = useState(null)
    const [method, setMethod] = useState(null)
    const [callFetch, setCallFetch] = useState(false)

    // Corrigir erro
    const [error, setError] = useState(null) 
    // Processo de carregar
    const [loading, setLoading] = useState(null)     

    const fetchConfig = (data, method) => {
        
        // Configuração do metodo
        if(method === "POST"){
            setConfig({
                method,
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            setMethod(method)
        }else if(method === "PUT"){
            setIdTask(data.id)
            setConfig({
                method,
                headers:{
                'Content-Type': 'application/json'
                },
                body:
                JSON.stringify({
                    status: !data.status
                })
            })

            setMethod(method)
        }else if (method === "DELETE"){
            setIdTask(data.id)
            setConfig({
                method,
            })  
            setMethod(method)
        }
    }
    // Pegar os dados das tarefas
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await fetch(url)
                const json = await res.json()
                setdata(json)
            } catch (error) {
                setError("Houve algum erro ao carregar os dados")
            }
            setLoading(false)
        }
        fetchData();
    },[url, callFetch])

    useEffect(() => {
        
    const fetchRequest = async () => {

        let json = null

        if(method === "POST"){
            const res = await fetch(url, config)        
            json = await res.json()
        }else if(method === "PUT"){
            const updateUrl = `${url}/${idTask}`
            const res = await fetch(updateUrl, config)
            json = await res.json()
        }else if (method === "DELETE"){            
            const deleteUrl = `${url}/${idTask}`;
            const res = await fetch(deleteUrl, config);       
            json = await res.json();
        }

        setCallFetch(json)
    }
    fetchRequest()
    },[config, method, url])

    return {data, fetchConfig, loading, error}
}