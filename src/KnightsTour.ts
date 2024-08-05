import { Vector2 } from "./utils";

let n = 8
let m = 8

interface BoradNode {
    visited: boolean
    pos: Vector2
}

let board: BoradNode[][] = []
let knightPos: Vector2 | null = null
let path: BoradNode[] = []

// initialize board 
for( let i = 0; i < n; i++) {
    board.push([])
    for( let j = 0; j < m; j++) {
        board[i].push({ visited: false, pos: new Vector2(i, j)})
    }
}

// set knight in the middle of the board
knightPos = new Vector2(Math.floor(n / 2), Math.floor(m / 2))
board[knightPos.x][knightPos.y].visited = true

solve()


function solve(): void {
    while( step(knightPos, board) ) { }
    console.log(path)
}

function step(_knightPos: Vector2, _board: BoradNode[][]): boolean {
    let nextMove = getNextBestMove(_knightPos, _board)
    if ( nextMove ) {
        knightPos = move(_knightPos, nextMove)
        board[knightPos.x][knightPos.y].visited = true
        path.push(board[knightPos.x][knightPos.y])
        return true 
    }
    return false 
}

function getNextBestMove(pos: Vector2, board: BoradNode[][]): number {
    let bestMove: number = null
    
    let validMoves = getAllValidMoves(pos, board)
    let maxMoves = 0

    for( let i = 0; i < validMoves.length; i++) {
        let tmp = pos.clone()
        tmp = move(tmp, validMoves[i])
        let nextValid = getAllValidMoves(tmp, board)

        if( nextValid.length > maxMoves ) {
            maxMoves = nextValid.length
            bestMove = validMoves[i]
        }
    }

    return bestMove

}

function getAllValidMoves(pos: Vector2, board: BoradNode[][]): number[] {
    let validMoves = []
    
    for( let i = 1; i <= 8; i++) {
        
        let tmp = pos.clone()
        tmp = move(tmp, i)

        // check if the position would fall inside the board and if it's not visited
        if ( (tmp.x >= board.length || tmp.y >= board[0].length) || 
            ( tmp.x < 0 || tmp.y < 0 ) ||
            board[tmp.x][tmp.y].visited === true
        ) {
            continue
        }

        validMoves.push(i)
        
    }

    return validMoves
} 

function move(pos: Vector2, dir: number): Vector2 {
    let newPos = pos.clone()
    switch (dir) {
        case 1:
            // urr 
            newPos.add(-1, 2)
            break;
        case 2:
            // uul 
            newPos.add(-2, -1)
            break;
        case 3:
            // rrd 
            newPos.add(1, 2)
            break;
        case 4:
            // ddr 
            newPos.add(2, 1)
            break;
        case 5:
            // ddl 
            newPos.add(2, -1)
            break;
        case 6:
            // dll 
            newPos.add(1, -2)
            break;
        case 7:
            // ull 
            newPos.add(-1, -2)
            break;
        case 8:
            // uur 
            newPos.add(-2, 1)
            break;

        default:
            break;
    }

    return newPos
}

