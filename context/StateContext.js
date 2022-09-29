import React,{ useState, createContext } from "react";

export const StateContext = createContext()

export const StateProvider = (props) => {
    const [routedId, setRoutedId] = useState(null)
    const [title, setTitle] = useState(null)
    const [worker, setWorker] = useState(null)
    const [option, setOption] = useState(null)
    const [user, setUser] = useState({
        dni:12345678,
        name: 'Daniel Pantoa',
        file:'http://192.168.10.13:3000/static/img/resize-image1664319772226.jpg',
        role:'Administrativo'
    })

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
        },
        user,
        upUser(user){
            setUser(user)
        }
    }

    return(
        <StateContext.Provider value={contextValue}>
            {props.children}
        </StateContext.Provider>
    )
}