import { Vector2, createElemWithClasses } from "./utils"

export default class MagicSquare {

    constructor(size: number) {
        this.size = size
        this.squares = []

        this.pos = new Vector2(0, Math.floor(size / 2))
        this.c = 1
    }


    initializeSquares(squareContainer: HTMLElement): void {
        // this.size = inputVal

        for (let i = 0; i < this.size; i++) {
            this.squares.push([])
            const row = createElemWithClasses('div', undefined,
                'flex', 'flex-row', 'gap-2', 'w-full', 'h-full',
                'bg-red-900'
            )

            for (let j = 0; j < this.size; j++) {
                const elem = createElemWithClasses('div', undefined,
                    'flex', 'justify-center', 'items-center',
                    'h-full', 'w-full', 'text-xl', 'bg-white'
                )
                elem.innerText = `0`

                this.squares[i].push(elem)
                row.appendChild(elem)
            }

            squareContainer.appendChild(row)
        }
    }

    solveSquares() {
        this.c = 1
        this.pos.set(0, Math.floor(this.size / 2))

        while (!this.isFilled()) {
            this.solveSquaresStep()
        }
    }

    isFilled() : boolean {
        if ( this.c <= this.size * this.size) return false
        return true
    }

    solveSquaresStep() {
        let newX = this.pos.x
        let newY = this.pos.y
        let c = this.c

        let oldX = newX
        let oldY = newY

        if (this.squares[newX][newY].innerText === '0') {
            this.squares[newX][newY].innerText = c.toString()
            oldX = newX
            oldY = newY
            c++
        } else {
            newX = this.goUp(oldX, this.squares.length - 1)
            newY = this.goRight(oldY, this.squares.length - 1)

            if (this.squares[newX][newY].innerText !== '0') {
                newX = this.goDown(oldX, this.squares.length - 1)
                newY = oldY
            }
        }

        this.pos.x = newX
        this.pos.y = newY
        this.c = c
    }


    goUp(x: number, limit: number) {
        x -= 1
        if (x < 0) x = limit
        return x
    }

    goRight(y: number, limit: number) {
        y += 1
        if (y > limit) y = 0
        return y
    }

    goDown(x: number, limit: number) {
        x += 1
        if (x > limit) x = 0
        return x
    }

    public size: number
    public squares: HTMLElement[][]

    private pos: Vector2
    private c: number

}