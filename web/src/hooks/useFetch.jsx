import { useEffect, useState } from "react";

export const useFetch = (url) => {

    //Informações das tarefas
    const [data, setdata] = useState([])

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
        }
        fetchData();
    },[url, callFetch])

    useEffect(() => {
        
    const fetchRequest = async () => {
        if(method === "POST"){
            const res = await fetch(url, config)        
            const json = await res.json()  
            setCallFetch(json)
        }    
    }
    fetchRequest()
    },[config, method, url])

    return {data, fetchConfig, loading, error}
}
