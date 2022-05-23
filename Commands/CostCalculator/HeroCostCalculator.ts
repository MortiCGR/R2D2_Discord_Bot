import CostFormatter from "./CostFormatter"

export default (initial: string, final: string) => {

    let initialNumber = parseInt(initial)
    let finalNumber = parseInt(final)

    let cost = 0

    if (finalNumber <= initialNumber){
        return cost.toString()
    }

    let multiplier = GetMultiplier(finalNumber)
    if (GetMultiplier(initialNumber) === multiplier) {
        cost = calculateCost(initialNumber, finalNumber, multiplier);
    }
    else {
        let costIntervals = [
            { level: 1, maxLevel: 21, cost: 250 },
            { level: 21, maxLevel: 41, cost: 500 },
            { level: 41, maxLevel: 61, cost: 750 },
            { level: 61, maxLevel: 81, cost: 1000 },
            { level: 81, maxLevel: 101, cost: 1250 },
            { level: 101, maxLevel: 121, cost: 1500 },
            { level: 121, maxLevel: 141, cost: 1750 },
            { level: 141, maxLevel: 161, cost: 2000 },
            { level: 161, maxLevel: 181, cost: 2250 },
            { level: 181, maxLevel: 201, cost: 2500 },
            { level: 201, maxLevel: 5001, cost: 3000 },
            { level: 5001, maxLevel: 9999, cost: 4000 },
            { level: 10000, maxLevel: 100000000, cost: 5000 },
        ]
        let tempInitialLevel = initialNumber

        let i = 0
        while (i < costIntervals.length || tempInitialLevel < finalNumber) {
            let element = costIntervals[i]

            if ((between(initialNumber, element.level, element.maxLevel) || between(tempInitialLevel, element.level, element.maxLevel))) {
                let maxLevel = element.maxLevel < finalNumber ? element.maxLevel : finalNumber

                cost += calculateCost(tempInitialLevel, maxLevel, element.cost)
                tempInitialLevel = maxLevel
                
                if (maxLevel+1 === 10000)
                {
                    cost += 40000000
                    tempInitialLevel = maxLevel+1
                }

            }
            else if (element.level >= 10000) {
                cost += calculateCost(tempInitialLevel, finalNumber, element.cost)
            }
            
            i++
        }
    }

    return CostFormatter(new Intl.NumberFormat('en-US').format(cost).toString())
}


function calculateCost(initial: number, final: number, multiplier: number) {
    return (initial+final) * (final-initial) / 2 * multiplier;
}

function GetMultiplier(x: number) {  
    if (between(x, 1, 20)) {
        return 250
    }
    else if (between(x, 21, 40)) {
        return 500
    }
    else if (between(x, 41, 60)) {
        return 750
    }
    else if (between(x, 61, 80)) {
        return 1000
    }
    else if (between(x, 81, 100)) {
        return 1250
    }
    else if (between(x, 101, 120)) {
        return 1500
    }
    else if (between(x, 121, 140)) {
        return 1750
    }
    else if (between(x, 141, 160)) {
        return 2000
    }
    else if (between(x, 161, 180)) {
        return 2250
    }
    else if (between(x, 181, 200)) {
        return 2500
    }
    else if (between(x, 201, 5000)) {
        return 3000
    }
    else if (between(x, 5001, 9999)) {
        return 4000
    }
    else if (x >= 10000) {
        return 5000
    }

    return 0
}

function between(x: number, min: number, max: number) {
    return x >= min && x <= max;
}

  