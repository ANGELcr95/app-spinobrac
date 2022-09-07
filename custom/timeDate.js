export const timeDate = () => {
    // 2022-09-15 15:35:25
    let date = new Date();
    let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return formatted_date;
}


export const shortDate = (date) => {
    if (date) {
        const dateUtil = date.split('T')
        return dateUtil[0];
    }
}