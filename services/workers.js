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

export const updateWork = async (dni, workerUpdate) => {

    let formData = new FormData();  
    let file = {uri: workerUpdate.file, type: 'multipart/form-data', name: 'worker.jpg'};  
    
    workerUpdate.file && formData.append("file",file);
    formData.append("name",workerUpdate.name);
    workerUpdate.eps && formData.append("eps",workerUpdate.eps);
    workerUpdate.date_born && formData.append("date_born",workerUpdate.date_born);
    formData.append("api",GLOBALS.API);
    console.log(formData);
    
    
    const res = fetch(`${API}/${dni}`,{  
    method:'PUT',  
    headers:{  
        'Content-Type':'multipart/form-data',  
    },  
    body:formData,  
    })  
   
    return res

}