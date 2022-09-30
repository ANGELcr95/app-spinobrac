import GLOBALS from "../Globals"
const API = `${GLOBALS.API}/activities`

export const getActivities = async () => {
    const res = await fetch(API)
    return res.json()
}

export const getActivity= async (id) => {
    const res = await fetch(`${API}/${id}`)
    return await res.json()
}

export const saveActivity= async (newActivity) => {
    const res = await fetch(API, {
        method: 'POST',
        headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(newActivity)
    })

    return res.status
}

export const deleteActivity= async (id) => {
    await fetch(`${API}/${id}`, {
        method: 'DELETE',
        headers: {Accept: 'application/json', 'Content-Type': 'application/json'}
    })
}


export const updateActivity= async (id, taskUpdate) => {
    const res = await fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(taskUpdate)
    })

    return res
}