import { Vector2 } from "./utils";

class HashTable {
    public capacity: number 
    public size: number
    private table: Int32Array
    

    constructor( capacity: number ) {
        this.capacity = capacity
        this.table = new Int32Array(capacity).fill(Infinity)
    }

    public has(n1: number, n2: number): boolean {
        return this.table[this.hash(n1, n2) % this.capacity] !== Infinity 
    }

    public hash(n1: number, n2: number): number {
        return Math.abs(n1 ^ 9897172938 * n2 ^ 3244362342) 
    }

    public insert(n1: number, n2: number, val: number) {
        for ( let i = 0; i < this.capacity; i++) {
            
            const tryIdx = this.hash(n1, n2) % this.capacity
            
            if ( this.table[tryIdx] === Infinity) {
                this.table[tryIdx] = val
                this.size++
                break
            }

        }

        console.log('element was not inserted')
    }

}

// TODO: add multiplication and transpose 

/**
 * trivial implementation for a sparse matrix 
 * uses 2D array to store the matrix none zero vals 
 * matRepr = row: 0 1 2 3
 *           col: 3 4 1 0 
 *           val: 1 5 3 2
 */ 
class SparseTrivial {
    public size: number
    public dim: Vector2
    private capacity: number 
    private matRepr: Array<Array<number>> 
    
    constructor(rows: number, cols: number, capacity: number = 100) {
        this.dim = new Vector2(rows, cols)
        this.capacity = capacity
        this.size = 0

        // three arrays for row, col, val
        this.matRepr = Array<Array<number>>(3)
        for( let i = 0; i < 3; i++) {
            this.matRepr[i] = new Array(this.capacity)
        }
    }

    public static fromArray(arr: Array<Array<number>>): SparseTrivial {
        let dim = new Vector2(arr.length, arr[0].length)
        let newMat = new SparseTrivial(dim.x, dim.y)

        // construct matrix 
        let k = 0
        for( let i = 0; i < dim.x; i++) {
            for( let j = 0; j < dim.y; j++) {
                if( arr[i][j] !== 0) {
                    newMat.matRepr[0][k] = i
                    newMat.matRepr[1][k] = j
                    newMat.matRepr[2][k] = arr[i][j]
                    k++
                    newMat.size++
                }
            }
        }
        
        return newMat 
    }

    public insert(row: number, col: number, val: number): boolean {
        if( row > this.dim.x || col > this.dim.y) {
            console.log('out of bounds of the matrix')
            return false
        }
        

        this.matRepr[0][this.size] = row
        this.matRepr[1][this.size] = col
        this.matRepr[2][this.size] = val
        this.size++

        return true
    }

    public add(other: SparseTrivial): SparseTrivial {
        if ( this.dim.x !== other.dim.x || this.dim.y !== other.dim.y) {
            console.log('matrices of different dimensions cannot be added together!')
            return this
        }

        let newMat = new SparseTrivial(this.dim.x, this.dim.y)

        let thisPos = 0
        let otherPos = 0

        while( thisPos < this.size && otherPos < other.size ) {
            // if other row and col is smaller
            if ( this.matRepr[0][thisPos] > other.matRepr[0][otherPos] ||
                (this.matRepr[0][thisPos] === other.matRepr[0][otherPos] && this.matRepr[1][thisPos] > other.matRepr[1][otherPos])
            ) {
                newMat.insert(other.matRepr[0][otherPos], other.matRepr[1][otherPos], other.matRepr[2][otherPos])
                otherPos++
            } 
            // if this row and col is smaller             
            else if ( this.matRepr[0][thisPos] < other.matRepr[0][otherPos] ||
                (this.matRepr[0][thisPos] === other.matRepr[0][otherPos] && 
                this.matRepr[1][thisPos] < other.matRepr[1][otherPos])
            ) {
                newMat.insert(this.matRepr[0][thisPos], this.matRepr[1][thisPos], this.matRepr[2][thisPos])
                thisPos++
            } 
            // if they are equal 
            else {
                let addedVal = this.matRepr[2][thisPos] + other.matRepr[2][otherPos]
                if ( addedVal !== 0 ) 
                    newMat.insert(this.matRepr[0][thisPos], this.matRepr[1][thisPos], addedVal)
                
                thisPos++
                otherPos++
            }

            
            

        }

        // exhaust the remaining elements 
        while( thisPos < this.size ) {
            newMat.insert(this.matRepr[0][thisPos], this.matRepr[1][thisPos], this.matRepr[2][thisPos])
            thisPos++
        }
        
        while( otherPos < other.size ) {
            newMat.insert(other.matRepr[0][otherPos], other.matRepr[1][otherPos], other.matRepr[2][otherPos])
            otherPos++
        }


        return newMat
    }


    public printRepr(): void {
        let rows = 'rows: '
        let cols = 'cols: '
        let vals = 'vals: '

        for( let i = 0; i < this.size; i++) {
            rows += `${this.matRepr[0][i]}, `
            cols += `${this.matRepr[1][i]}, `
            vals += `${this.matRepr[2][i]}, `
        }

        console.log(rows + '\n' + cols + '\n' + vals)
    }
}

const arr: Array<Array<number>> = [
    [0, 1, 0],
    [2, 0, 0],
    [0, 3, 0],
]

const arr2: Array<Array<number>> = [
    [0, 0, 3],
    [1, 0, 0],
    [0, 2, 0],
]

let sparse = SparseTrivial.fromArray(arr)
let sparse2 = SparseTrivial.fromArray(arr2)

sparse = sparse.add(sparse2)
sparse.printRepr()