// TODO: refractor this to be in a unified framework as the others 

let result: number[] = []


function isSafe(board: number[][], row: number, col: number): boolean {
    // Check this row on left side
    for (let i = 0; i < col; i++)
        if (board[row][i])
            return false

    // Check upper diagonal on left side
    let i = row
    let j = col
    while (i >= 0 && j >= 0) {
        if (board[i][j])
            return false
        i -= 1
        j -= 1
    }

    // Check lower diagonal on left side
    i = row
    j = col
    while (j >= 0 && i < 4) {
        if (board[i][j])
            return false
        i = i + 1
        j = j - 1
    }
    return true
}

function solveNQUtil(board: number[][], col: number): boolean {
    if (col == 4) {
        let v = []
        for (let i of board) {
            for (var j = 0; j < i.length; j++) {
                if (i[j] == 1)
                    v.push(j + 1)
            }
        }
        result.push(...v)
        return true
    }

    let res = false
    for (var i = 0; i < 4; i++) {
        if (isSafe(board, i, col)) {
            board[i][col] = 1
            res = solveNQUtil(board, col + 1) || res

            board[i][col] = 0
        }
    }
    return res
}


function solveNQ(n: number) {
    result = []
    let board = new Array(n);
    for (var i = 0; i < n; i++)
        board[i] = new Array(n).fill(0)

    solveNQUtil(board, 0)
    result.sort()
    return result
}

let n = 4
let res = solveNQ(n)
console.log(res)

