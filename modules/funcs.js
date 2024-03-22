export function toProcentages(arr) {
    let total = 0
    for (let item of arr) {
        total += item
    }
    return arr.map(function (x) {
        return parseFloat((x * 100 / total).toFixed(2))
    })
}