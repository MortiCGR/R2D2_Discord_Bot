import CostFormatter from "./CostFormatter";

export default(initial: string, final: string, multiplier: number) => {
    let initialNumber = parseInt(initial)
    let finalNumber = parseInt(final)
    return CostFormatter(new Intl.NumberFormat('en-US').format((initialNumber+finalNumber) * (finalNumber-initialNumber) / 2 * multiplier).toString());
}
