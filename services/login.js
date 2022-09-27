import GLOBALS from "../Globals"
const API = `${GLOBALS.API}/login`

export const getLogins = async () => {
    const res = await fetch(API)
    return res.json()
}

export const userLogin = async (loginUser) => {
    const res = await fetch(`${API}/user`, {
        method: 'POST',
        headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(loginUser)
    })
    if (res.status !== 200) {
        return null
    }
    return res.json()
}


export const saveLogin = async (newTask) => {
    const res = await fetch(API, {
        method: 'POST',
        headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(newTask)
    })

    return res.status
}

export const deleteLogin = async (id) => {
    await fetch(`${API}/${id}`, {
        method: 'DELETE',
        headers: {Accept: 'application/json', 'Content-Type': 'application/json'}
    })
}


export const updateLogin = async (id, taskUpdate) => {
    const res = await fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(taskUpdate)
    })

    return res
}