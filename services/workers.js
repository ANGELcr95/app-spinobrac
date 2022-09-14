import GLOBALS from "../Globals"
const API = `${GLOBALS.API}/workers`

export const getWorkers = async () => {
    const res = await fetch(API)
    return await res.json()
}

export const getWorker = async (dni) => {
    const res = await fetch(`${API}/${dni}`)
    if (res.status === 203) {
        return res.status
    }
    return res.json()
}

export const saveWork = async (newTask) => {
    const res = await fetch(API, {
        method: 'POST',
        headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(newTask)
    })

    return res.json
}

export const deleteWork = async (dni) => {
    await fetch(`${API}/${dni}`, {
        method: 'DELETE'
    })
}

export const updateWork = async (dni, taskUpdate) => {
    const res = await fetch(`${API}/${dni}`, {
        method: 'PUT',
        headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(taskUpdate)
    })

    return res
}