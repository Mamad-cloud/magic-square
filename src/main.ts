import { createElemWithClasses, createSquareContainer } from "./utils"
import { createInputFormElem } from "./inputForm"
import MagicSquare from "./magicSquare"


function main() {

  const rootElem = <HTMLDivElement>document.getElementById('app-container')!
  let squareContainer: HTMLDivElement | null = null
  // let squares: HTMLElement[][] = []
  let solveBtn: HTMLButtonElement | null = null
  let stepBtn: HTMLButtonElement | null = null
  let magicSquare: MagicSquare | null = null
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
    magicSquare = null
    magicSquare = new MagicSquare(inputVal)
    magicSquare.squares = []
    magicSquare.initializeSquares(squareContainer)


    if (solveBtn === null) {
      solveBtn = <HTMLButtonElement>createElemWithClasses('button', undefined, '')
      solveBtn.innerText = 'solve'
      solveBtn.addEventListener('click', (_e) => {
        if (magicSquare)
          magicSquare.solveSquares()
      })
    }

    if (stepBtn === null) {
      stepBtn = <HTMLButtonElement>createElemWithClasses('button', undefined, '')
      stepBtn.innerText = 'step'
      stepBtn.addEventListener('click', (_e) => {
        if (magicSquare) {
          magicSquare.solveSquaresStep()

        }
      })
    }

    squareContainer.scrollIntoView({ behavior: 'smooth'})
    rootElem.appendChild(squareContainer)
    rootElem.appendChild(solveBtn)
    rootElem.appendChild(stepBtn)
  })

  rootElem.appendChild(inputElem)
  document.body.appendChild(rootElem)
}

main()