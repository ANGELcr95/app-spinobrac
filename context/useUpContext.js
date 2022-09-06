import { useContext } from "react";
import { StateContext } from "./StateContext";

const useUpContext = () => {
    const contextValue = useContext(StateContext) // el contexto que querremos consumir
    return contextValue;
}

export default useUpContext