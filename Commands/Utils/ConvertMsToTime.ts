export default (milliseconds : number) => {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    
    seconds = seconds % 60;
    minutes = minutes % 60;
    hours = hours % 24;
    
    return `${days} days, ${padTo2Digits(hours)} hours, ${padTo2Digits(minutes)} minutes`;
}

function padTo2Digits(num : number) {
    return num.toString().padStart(2, '0');
}