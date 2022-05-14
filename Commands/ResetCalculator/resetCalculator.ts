export default () => {
    
    // offset date in UTC
    let dt = new Date("2022-04-10T16:00:00Z");
    let dOffset = dt.getTime();
    let d = new Date(); 
    // pass current date to UTC
    let dNowUTC =  Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds());
    
    // now - ( offset date + time from offset date until the start of the current season in milliseconds)
    let wavesResult = (1000 * 60 * 60 * 24 * 5) - (dNowUTC - (dOffset +(1000 * 60 * 60 * 24) * 5*Math.floor(Math.abs(dNowUTC - dOffset)/ (1000 * 60 * 60 * 24)/5)));
    let coloniesResult = (1000 * 60 * 60 * 24 * 10) - (dNowUTC - (dOffset +(1000 * 60 * 60 * 24) * 10*Math.floor(Math.abs(dNowUTC - dOffset)/ (1000 * 60 * 60 * 24)/10)));
    let hellResult = (1000 * 60 * 60 * 24 * 7) - (dNowUTC - (dOffset +(1000 * 60 * 60 * 24) * 7*Math.floor(Math.abs(dNowUTC - dOffset)/ (1000 * 60 * 60 * 24)/7)));

    let result = `Guild reset in ${convertMsToTime(wavesResult)}\n`
    result += `Hell Mode reset in ${convertMsToTime(hellResult)}\n`
    result += `Colonies reset in ${convertMsToTime(coloniesResult)}\n`
    return result
}

function convertMsToTime(milliseconds : number) {
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