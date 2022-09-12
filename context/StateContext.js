import React,{ useState, createContext } from "react";

export const StateContext = createContext()

export const StateProvider = (props) => {
    const [routedId, setRoutedId] = useState(null)
    const [title, setTitle] = useState(null)
    const [worker, setWorker] = useState(null)

    const contextValue ={
        routedId,
        upRoutedId(routedId){
            setRoutedId(routedId)
        },
        title,
        upTitle(title){
            setTitle(title)
        },
        worker,
        upWorker(worker){
            setWorker(worker)
        }
    }

    return(
        <StateContext.Provider value={contextValue}>
            {props.children}
        </StateContext.Provider>
    )
}