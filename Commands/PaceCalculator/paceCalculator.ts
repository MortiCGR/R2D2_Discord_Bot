export default (waves: string) => {

    let wavesNumber = parseInt(waves)
    
    // offset date in UTC
    let dt = new Date("2021-05-30T15:00:00Z");
    let dOffset = dt.getTime();
    let d = new Date(); 
    // pass current date to UTC
    let dNowUTC =  Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds());
    
    // now - ( offset date + time from offset date until the start of the current season in milliseconds)
    let result = (dNowUTC - (dOffset +(1000 * 60 * 60 * 24) * 5*Math.floor(Math.abs(dNowUTC - dOffset)/ (1000 * 60 * 60 * 24)/5)))/(1000 * 60 * 60 * 24);

    let pace = Math.floor(wavesNumber / (result*24) * 120);

    return pace.toString()
}