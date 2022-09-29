import GLOBALS from "../Globals"
const API = `${GLOBALS.API}/workers`

export const getWorkers = async () => {
    const res = await fetch(API)
    return res.json()
}

export const getWorker = async (dni) => { 
    const res = await fetch(`${API}/${dni}`)
    if (res.status === 203) {
        return res.status
    }
    return res.json()}

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
        method: 'DELETE',
        headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
    })
}

export const updateWork = async (dni, workerUpdate) => {

    let formData = new FormData();  
    let file = {uri: workerUpdate.file, type: 'multipart/form-data', name: 'worker.jpg'}; 
    try {
    if (workerUpdate.file){
        workerUpdate.file.includes('file:') && formData.append("file",file);
    }
    formData.append("name",workerUpdate.name);
    workerUpdate.password && formData.append("password",workerUpdate.password);
    workerUpdate.eps && formData.append("eps",workerUpdate.eps);
    workerUpdate.date_born && formData.append("date_born",workerUpdate.date_born);
    formData.append("api",GLOBALS.API);
    formData.append("role",workerUpdate.role);

        const res = await fetch(`${API}/${dni}`,{  
        method:'PUT',  
        headers:{  
            Accept: 'application/json','Content-Type':'multipart/form-data',  
        },  
        body:formData,  
    })
    return res
    } catch (error) {
        console.log(error);
    
    }
}