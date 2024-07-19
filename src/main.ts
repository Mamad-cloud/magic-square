import { createElemWithClasses, createSquareContainer } from "./utils"
import { createInputFormElem } from "./inputForm"



function initializeSquares(inputVal: number, squares: HTMLElement[][], squareContainer: HTMLElement): void {
  let x = inputVal
  let y = inputVal

  for (let i = 0; i < x; i++) {
    squares.push([])
    const row = createElemWithClasses('div', undefined,
      'flex', 'flex-row', 'gap-2', 'w-full', 'h-full',
      'bg-red-900'
    )

    for (let j = 0; j < y; j++) {
      const elem = createElemWithClasses('div', undefined,
        'flex', 'justify-center', 'items-center',
        'h-full', 'w-full', 'text-xl', 'bg-white'
      )
      elem.innerText = `0`
      squares[i].push(elem)
      row.appendChild(elem)
    }

    squareContainer.appendChild(row)
  }
}

function goUp(x: number, limit: number) {
  x -= 1
  if (x < 0) x = limit
  return x
}

function goRight(y: number, limit: number) {
  y += 1
  if (y > limit) y = 0
  return y
}

function goDown(x: number, limit: number ) {
  x += 1 
  if ( x > limit) x = 0
  return x
}

function isFilled(squares: HTMLElement[][]): boolean {
  for (let i = 0; i < squares.length; i++) {
    for (let j = 0; j < squares.length; j++) {
      if (squares[i][j].innerText === '0') {
        return false
      }
    }
  }
  return true
}

function solveSquaresStep(squares: HTMLElement[][], x: number, y: number, c: number) {
  let newX = x
  let newY = y

  let oldX = newX
  let oldY = newY

  if (squares[newX][newY].innerText === '0') {
    squares[newX][newY].innerText = c.toString()
    oldX = newX
    oldY = newY
    c++
  } else {
    newX = goUp(oldX, squares.length - 1)
    newY = goRight(oldY, squares.length - 1)

    if ( squares[newX][newY].innerText !== '0') {
      newX = goDown(oldX, squares.length - 1)
      newY = oldY
    }
  }

  return { newX, newY, c}
}

function solveSquares(squares: HTMLElement[][]) {

  let c = 1

  let newX = 0
  let newY = Math.floor(squares.length / 2)

  let oldX = newX
  let oldY = newY

  while( !isFilled(squares) ) {
    oldX = newX
    oldY = newY
    const ret = solveSquaresStep(squares, oldX, oldY, c)
    newX = ret.newX
    newY = ret.newY
    c = ret.c
  }
}


function main() {

  const rootElem = <HTMLDivElement>document.getElementById('app-container')!
  let squareContainer: HTMLDivElement | null = null
  let squares: HTMLElement[][] = []
  let solveBtn: HTMLButtonElement | null = null

  let inputVal = 3
  const inputElem = <HTMLFormElement>createInputFormElem(false, (ev: Event) => {
    // @ts-expect-error
    inputVal = ev.target.value
  }, (ev: SubmitEvent) => {
    ev.preventDefault()

    if (squareContainer) {
      rootElem.removeChild(squareContainer)
      squareContainer = null
    }

    squareContainer = createSquareContainer(inputVal * 100)

    squares = []
    initializeSquares(inputVal, squares, squareContainer)


    if (solveBtn === null) {
      solveBtn = <HTMLButtonElement>createElemWithClasses('button', undefined, '')
      solveBtn.innerText = 'solve'
      solveBtn.addEventListener('click', (_e) => {
        solveSquares(squares)
      })
    }
    
    squareContainer.scrollIntoView({ behavior: 'smooth'})
    rootElem.appendChild(squareContainer)
    rootElem.appendChild(solveBtn)
  })

  rootElem.appendChild(inputElem)
  document.body.appendChild(rootElem)
}

main()