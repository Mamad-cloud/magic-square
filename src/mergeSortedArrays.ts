const L = [1, 4, 6, 7, 9]
const R = [1, 2, 5, 8, 12]

const mergedLen = L.length + R.length
const merged = new Int32Array(mergedLen)


L.push(Infinity)
R.push(Infinity)

let i = 0
let j = 0

for( let k = 0; k < mergedLen; k++) {
    if ( L[i] <= R[j]) {
        merged[k] = L[i]
        i++
    } else {
        merged[k] = R[j]
        j++
    }
}

console.log(merged)


