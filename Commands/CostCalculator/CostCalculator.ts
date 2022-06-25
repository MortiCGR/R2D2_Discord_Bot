import CostFormatter from "./CostFormatter";

export default(initial: string, final: string, multiplier: number) => {
    let initialNumber = parseInt(initial);
    initialNumber = initialNumber === 0 ? 1 : initialNumber;
    let finalNumber = parseInt(final)

    let cost = 0
    if (finalNumber <= initialNumber){
        return cost.toString()
    }

    cost = (initialNumber+finalNumber) * (finalNumber-initialNumber) / 2 * multiplier;
    return CostFormatter(new Intl.NumberFormat('en-US').format(cost).toString());
}
