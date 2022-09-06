import React,{ useState, createContext } from "react";

export const StateContext = createContext()

export const StateProvider = (props) => {
    const [routedId, setRoutedId] = useState(null)
    const [change, setChange] = useState(null)

    const contextValue ={
        routedId,
        upRoutedId(routedId){
            setRoutedId(routedId)
        },
        change,
        upChange(change){
            setChange(change)
        }
    }

    return(
        <StateContext.Provider value={contextValue}>
            {props.children}
        </StateContext.Provider>
    )
}