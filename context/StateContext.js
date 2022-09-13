import React,{ useState, createContext } from "react";

export const StateContext = createContext()

export const StateProvider = (props) => {
    const [routedId, setRoutedId] = useState(null)
    const [title, setTitle] = useState(null)
    const [worker, setWorker] = useState(null)
    const [option, setOption] = useState(null)

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
        },
        option,
        upOption(option){
            setOption(option)
        }
    }

    return(
        <StateContext.Provider value={contextValue}>
            {props.children}
        </StateContext.Provider>
    )
}