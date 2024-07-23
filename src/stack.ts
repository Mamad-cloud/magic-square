import { decimalToBinary, thirdLargest, thirdLargestSP, Vector2 } from "./utils"

export class Stack<T> {

    private arr: T[] = []

    constructor(...items: T[]) {
        const _items = items.reverse()
        this.arr.unshift(..._items)
    }

    public push(item: T): void {
        this.arr.unshift(item)
    }

    public pop(): T | undefined {
        return this.arr.shift()
    }

    public top(): T {
        return this.arr[0]
    }

    public at(index: number) {
        return this.arr[index]
    }

    public getSize(): number {
        return this.arr.length
    }

    public contains(item: T): boolean {
        return this.arr.find(_item => _item === item) !== undefined

    }

    public isEmpty(): boolean {
        return this.arr.length === 0
    }

    public print(): void {
        let stack = ""

        for (let i = this.arr.length - 1; i >= 0; i--) {
            if (i === this.arr.length - 1)
                stack += `[${this.arr[i]}]`
            else stack += `[${this.arr[i]}] ->`
        }

        console.log(stack)
    }
}


interface MazeNode {
    type: 'wall' | 'exit' | 'path'
    visited: boolean
    pos: Vector2
}

class MazeMap {
    public map: number[][] = []
    public dims: Vector2 = new Vector2(0, 0)

    constructor(x: number, y: number, ...map: number[]) {
        this.dims.set(x, y)

        for (let i = 0; i < x; i++) {
            this.map.push([])
            for (let j = 0; j < y; j++) {
                this.map[i].push(map[i * y + j])
            }
        }
    }

    public print(): void {
        let maze = ""
        for (let i = 0; i < this.dims.x; i++) {
            let row = ""
            row += "| "
            for (let j = 0; j < this.dims.y; j++) {
                if (j !== this.dims.y - 1)
                    row += `${this.map[i][j]} | `
                else row += `${this.map[i][j]}`
            }
            row += " |"

            maze += `${row}\n`
        }
        console.log(maze)
    }
}

class Maze {
    public size: Vector2 = new Vector2(0, 0)
    public nodes: MazeNode[][] = []
    public exitPos: Vector2 | null = null
    public startPos: Vector2 | null = null

    // maybe init with mazeMap object which is essentially a 2d string | int array 
    constructor(mazeMap: MazeMap) {
        this.size.set(mazeMap.dims.x, mazeMap.dims.y)

        this.initializeNodes()
        this.boundWithWalls()
        this.applyMap(mazeMap)
    }

    private initializeNodes(): void {
        // add 2 for the boundary wall nodes 
        for (let i = 0; i < this.size.x + 2; i++) {
            this.nodes.push([])
            for (let j = 0; j < this.size.y + 2; j++) {
                const node: MazeNode = { type: 'path', visited: false, pos: new Vector2(i, j) }
                this.nodes[i].push(node)
            }
        }
    }

    private boundWithWalls(): void {
        // bound top and bottom
        for (let i = 0; i < this.size.y + 2; i++) {
            this.nodes[0][i].type = 'wall'
            this.nodes[this.size.x + 1][i].type = 'wall'
        }

        // bound left and right
        for (let i = 1; i < this.size.x + 1; i++) {
            this.nodes[i][0].type = 'wall'
            this.nodes[i][this.size.y + 1].type = 'wall'
        }

    }

    private applyMap(mazeMap: MazeMap): void {
        for( let i = 1; i < this.size.x + 1; i++ ) {
            for ( let j = 1; j < this.size.y + 1; j++) {
                if ( mazeMap.map[i-1][j-1] === 1)
                    this.nodes[i][j].type = 'wall'
            }
        }
    }

    public setStart(pos: Vector2): void {
        if( this.startPos ) return
        this.startPos = pos.clone()
        this.nodes[pos.x][pos.y].type = 'path'

    }

    public setExit(pos: Vector2) : void {
        if( this.exitPos ) return
        this.exitPos = pos.clone()
        this.nodes[pos.x][pos.y].type = 'exit'
    }

    public print(): void {
        let maze = ""
        for (let i = 0; i < this.size.x + 2; i++) {
            let row = ""
            row += "["
            for (let j = 0; j < this.size.y + 2; j++) {
                if (j === this.size.y + 1) row += `${this.nodes[i][j].type}`
                else row += `${this.nodes[i][j].type}, `
            }
            row += "]"

            maze += `${row}\n`
        }

        console.log(maze)
    }

}

class MouseInMaze {
    private pos: Vector2 = new Vector2(0, 0)
    public maze: Maze
    public path: Stack<MazeNode> = new Stack()

    constructor(maze: Maze) {
        this.maze = maze
        this.pos.copy(maze.startPos!)
        this.maze.nodes[this.pos.x][this.pos.y].visited = true
        this.path.push(this.maze.nodes[this.pos.x][this.pos.y])
    }

    public getOut(): boolean {
        let res = false
        while(!this.path.isEmpty() && !res) { 
            res = this.step()
        }
        return false
    }

    /**
     * Returns false if not at exit
     */
    public step(): boolean {
        let nextNeighbour = this.nextValidNeighbour()
        
        if(nextNeighbour) {
            if(this.maze.nodes[nextNeighbour.x][nextNeighbour.y].type === 'exit') {
                console.log('Got Out!')
                this.path.push(this.maze.nodes[nextNeighbour.x][nextNeighbour.y])
                this.printSolution()
                return true
            }

            this.maze.nodes[nextNeighbour.x][nextNeighbour.y].visited = true
            this.path.push(this.maze.nodes[nextNeighbour.x][nextNeighbour.y])
            this.pos.copy(this.path.top().pos)

        } else {
            console.log('dead end')
            console.log('falling back')
            this.path.pop()
            this.pos.copy(this.path.top().pos)
        }

        return false
    }

    private nextValidNeighbour(): Vector2 | null {
        let validCandidate = null
        for(let dir = 0; dir < 4; dir++) {
            validCandidate = this.nextNeighbour(dir)
            if( validCandidate && this.isValid(validCandidate)) {
                return validCandidate
            }

        }
        return null
    }

    private isValid(pos: Vector2): boolean {
        return this.maze.nodes[pos.x][pos.y].type !== 'wall' && this.maze.nodes[pos.x][pos.y].visited === false
    }

    private nextNeighbour(dir: number): Vector2 | null {
        let candidate: Vector2 | null = null

        switch (dir) {
            case 0:
                candidate = this.goRight()
                break;
            case 1:
                candidate = this.goDown()
                break;
            case 2:
                candidate = this.goLeft()
                break;
            case 3: 
                candidate = this.goUp()
                break;
            default:
                break;
        }

        return candidate
    }

    private goRight(): Vector2 {
        const candidate = this.pos.clone()
        candidate.add(0, 1)
        return candidate
    }

    private goDown():Vector2 {
        const candidate = this.pos.clone()
        candidate.add(1, 0)
        return candidate
    }

    private goLeft(): Vector2 {
        const candidate = this.pos.clone()
        candidate.add(0, -1)
        return candidate
    }

    private goUp(): Vector2 {
        const candidate = this.pos.clone()
        candidate.add(-1, 0)
        return candidate
    }

    private printSolution(): void {
        const len = this.path.getSize()
        let stack = ""

        for (let i = len - 1; i >= 0 ; i--) {
            if (i === 0)
                stack += `[${this.path.at(i).pos.x}, ${this.path.at(i).pos.y}]`
            else stack += `[${this.path.at(i).pos.x}, ${this.path.at(i).pos.y}] ->`
        }

        console.log(stack)

    }


}

const mazeMap = new MazeMap(4, 4,
    0, 0, 0, 0,
    0, 1, 1, 1,
    0, 0, 1, 1,
    1, 0, 0, 0,
)


const maze = new Maze(mazeMap)
maze.setStart(new Vector2(0, 1))
maze.setExit(new Vector2(maze.size.x, maze.size.y+1))
maze.print()

const mouse = new MouseInMaze(maze)
mouse.getOut()

console.log(decimalToBinary(31))
console.log(thirdLargest([3, 2, 1]))
console.log(thirdLargestSP([3, 2, 1]))
