function createElemWithClasses(
  type: keyof HTMLElementTagNameMap,
  options?: ElementCreationOptions,
  ...classes: string[]
): HTMLElement {
  const _elem = document.createElement(type, options)
  _elem.className = classes.join(' ')
  return _elem
}

function createInputFormContainer(): HTMLFormElement {
  return <HTMLFormElement>createElemWithClasses('form', undefined,
    "flex", "flex-col", "pt-5", "w-full",
    'items-center'
  )
}

function createInputFormElem(
  keyboard: boolean = false, 
  changeCallback: (ev: Event) => void,
  submitCallback: (ev: SubmitEvent) => void,
): HTMLFormElement {

  const inputFormElem = createInputFormContainer()

  const label = <HTMLHeadingElement>createElemWithClasses('h3', undefined, 'text-xl', 'py-7')
  label.innerText = "input N for N x N Magic Square!"
  
  const inputElem = <HTMLInputElement>createElemWithClasses('input', undefined,
    'flex', 'text-center', 'p-2', 'h-12', 'w-32', 'border-2', 'border-black', 'rounded-md', 'caret-transparent', 
    'cursor-pointer'
  )
  inputElem.placeholder = 'N'
  inputElem.type = 'number'
  inputElem.value = Number(3).toString()
  inputElem.min = '3'
  inputElem.max = '9'
  inputElem.step = '2'
  
  inputElem.onchange = changeCallback
  
  if (!keyboard) {
    inputElem.onkeydown = (_ev: KeyboardEvent) => {
      return false
    }
  }
  
  const submitBtn = <HTMLButtonElement>createElemWithClasses('input', undefined,
    'flex', 'items-center', 'justify-center', 'w-28', 'h-7', 'p-7', 'my-3', 'border-2', 
    'border-black', 'rounded-md','hover:bg-[#eaeaea]', 'text-lg', 'transition-all'
  )
  submitBtn.type = 'submit'
  submitBtn.value = 'Create'
  

  inputFormElem.appendChild(label)
  inputFormElem.appendChild(inputElem)
  inputFormElem.appendChild(submitBtn)

  inputFormElem.onsubmit = submitCallback
  
  return inputFormElem
  
}


function createSquareContainer( size: number) : HTMLDivElement {
  const container = <HTMLDivElement>createElemWithClasses('div', undefined, 
    'flex', 'flex-col', 'gap-2', 'p-2',
    'justify-center', 'items-center')
  container.style.width = `${size}px`
  container.style.height = `${size}px`
  container.style.backgroundColor = '#323232'
  return container
}

function initializeSquares(inputVal: number, squares: HTMLElement[][], squareContainer: HTMLElement) : void {
  let x = inputVal
  let y = inputVal

  for ( let i = 0; i < x; i++) {
    squares.push([])
    const row = createElemWithClasses('div', undefined, 
      'flex', 'flex-row', 'gap-2', 'w-full', 'h-full',
      'bg-red-900'
    )
    
    for ( let j = 0; j < y; j++) {
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


function main() {

  const rootElem = <HTMLDivElement>document.getElementById('app-container')!
  let squareContainer: HTMLDivElement | null = null
  let squares: HTMLElement[][] = []
  
  let inputVal = 3
  const inputElem = <HTMLFormElement>createInputFormElem(false, (ev: Event) => {
    // @ts-expect-error
    inputVal = ev.target.value
  }, (ev: SubmitEvent) => {
    ev.preventDefault()
  
    if ( squareContainer ) {
      rootElem.removeChild(squareContainer)
      squareContainer = null
    }

    squareContainer = createSquareContainer(inputVal * 100)

    squares = []
    initializeSquares(inputVal, squares, squareContainer)
    
    rootElem.appendChild(squareContainer)
  })

  rootElem.appendChild(inputElem)
  document.body.appendChild(rootElem)
}

main()