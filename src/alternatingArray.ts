
function createAlternatingArray(size: number, start: number = 1) : Array<Int32Array> {
    let _start = start
    const arr = new Array<Int32Array>(size)
    
    for ( let i = 0; i < size; i++) 
        arr[i] = new Int32Array(size).fill(0)

    console.log(arr)

    for (let i = 0; i < size; i++) {
        if (i % 2 == 1) {
            for (let j = size - 1; j >= 0; j--) {
                arr[i][j] = _start
                _start++
            }
        } else {
            for (let j = 0; j < size; j++) {
                arr[i][j] = _start
                _start++
            }
        }
    }

    return arr
}


function main() {
    const n = 5 // input this 

    let c = 3
    const arr = createAlternatingArray(n, c)
    
    console.log(arr)
}

main()



