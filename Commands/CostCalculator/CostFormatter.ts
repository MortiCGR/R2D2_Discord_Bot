export default (cost: string) => {
    let costList = cost.split(",")

    let costFormatted = cost + " gold"
    let costRounded = new Intl.NumberFormat('en-US').format(parseInt(costList[0]) + Math.round(parseInt(costList[1])/100)/10)

    if (costList.length == 4) {
        costFormatted += ` (${costRounded}B)`
    }

    if (costList.length == 5) {
        costFormatted += ` (${costRounded}T)`
    }

    if (costList.length == 6) {
        costFormatted += ` (${costRounded}Q)` 
    }
    
    return costFormatted;
}