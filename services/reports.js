import GLOBALS from "../Globals"
const API = `${GLOBALS.API}/tasks`

export const getTasks = async () => { //checked
    const res = await fetch(API)
    return res.json()
}

export const getTask = async (id) => { //checked
    const res = await fetch(`${API}/${id}`)
    return await res.json()
}


export const saveTask = async (newTask) => {
    const res = await fetch(API, {
        method: 'POST',
        headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(newTask)
    })

    return res.status
}

export const deleteTask = async (id) => {
    await fetch(`${API}/${id}`, {
        method: 'DELETE',
        headers: {Accept: 'application/json', 'Content-Type': 'application/json'}
    })
}


export const updateTask = async (id, taskUpdate) => {
    const res = await fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(taskUpdate)
    })

    return res
}