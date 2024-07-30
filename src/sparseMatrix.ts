import { Vector2 } from "./utils";

class HashTable {
    public capacity: number 
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
                break
            }

        }

        console.log('element was not inserted')
    }

}



class Sparse {
    private size: Vector2 
    public nodes: Map<Vector2, number> = new Map()

    constructor(m: number, n: number) {
        this.size = new Vector2(m, n)
    }

    public insert(row: number, col: number, val: number) {
        if ( row < this.size.x && col < this.size.y) {
            this.nodes.set(new Vector2(row, col), val)
        }
    }

    public print(): void {
        let mat = ''
        for( let x = 0; x < this.size.x; x++) {
            let row = '|'
            for(let y = 0; y < this.size.y; y++) {
                let pos = new Vector2(x, y)
                if(this.nodes.has(pos)) {
                    row += `${this.nodes.get(pos)} `
                } else {
                    row += '0 '
                }
            }
            row += '|'
            mat += row + '\n'
        }
        console.log(mat)

        
    }

    public add( other: Sparse): Sparse {
        if ( other.size.x !== this.size.x || other.size.y !== this.size.y) {
            console.log('cannot add matrices of different sizes')
            return this
        }



        return this 
    }

}


const ht = new HashTable(100)
console.log(ht.hash(5, 5) % ht.capacity)


