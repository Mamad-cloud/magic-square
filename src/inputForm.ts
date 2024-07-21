import { createElemWithClasses } from "./utils"


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
    inputElem.max = '11'
    inputElem.step = '2'
  
    const submitBtn = <HTMLButtonElement>createElemWithClasses('input', undefined,
      'flex', 'items-center', 'justify-center', 'w-28', 'h-7', 'p-7', 'my-3', 'border-2',
      'border-black', 'rounded-md', 'hover:bg-[#eaeaea]', 'text-lg', 'transition-all'
    )
    submitBtn.type = 'submit'
    submitBtn.value = 'Create'
  
  
    inputFormElem.appendChild(label)
    inputFormElem.appendChild(inputElem)
    inputFormElem.appendChild(submitBtn)
  
    inputElem.onchange = changeCallback
    inputFormElem.onsubmit = submitCallback
  
    if (!keyboard) {
      inputElem.onkeydown = (_ev: KeyboardEvent) => {
        return false
      }
    }
  
    return inputFormElem
  
  }
  
  export { createInputFormElem }