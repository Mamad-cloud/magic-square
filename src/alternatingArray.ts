

function main() {
    const n = 3 // input this 

    let c = 1
    const arr = new Array<Int32Array>(
        new Int32Array([0, 0, 0]),
        new Int32Array([0, 0, 0]),
        new Int32Array([0, 0, 0]),
    )

    for (let i = 0; i < n; i++) {
        if (i % 2 == 1) {
            for (let j = n - 1; j >= 0; j--) {
                arr[i][j] = c
                c++
            }
        } else {
            for (let j = 0; j < n; j++) {
                arr[i][j] = c
                c++
            }
        }
    }

    console.log(arr)
}

main()



