export const timeDate = (dat) => {
    // 2022-09-15 15:35:25
    let date = new Date();
    let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    if (dat){
      let day = dat.getDate()
      let month = dat.getMonth() + 1
      
      if (parseInt(day) < 9){
        day = "0"+ day
      }

      if (parseInt(month) < 10){
        month = "0"+ month
      }
        
        date = dat
        formatted_date = date.getFullYear() + "-" + month + "-" + day;
    }
    
    return formatted_date;
}

export const shortDate = (date) => {
    if (date) {
        const dateUtil = date.split('T')
        return dateUtil[0];
    }
}


export const mostrarSaludo = ()=>{
    let text
    let date = new Date(); 
    let hour = date.getHours();
   
    if(hour >= 0 && hour < 12){
      text = "Buenos Días";
    }
   
    if(hour >= 12 && hour < 18){
      text = "Buenas Tardes";
    }
   
    if(hour >= 18 && hour < 24){
      text = "Buenas Noches";
    }

    return text
}