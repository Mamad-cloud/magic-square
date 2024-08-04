function createElemWithClasses(
    type: keyof HTMLElementTagNameMap,
    options?: ElementCreationOptions,
    ...classes: string[]
  ): HTMLElement {
    const _elem = document.createElement(type, options)
    _elem.className = classes.join(' ')
    return _elem
}


function createSquareContainer(size: number): HTMLDivElement {
    const container = <HTMLDivElement>createElemWithClasses('div', undefined,
      'flex', 'flex-col', 'gap-2', 'p-2',
      'justify-center', 'items-center')
    container.style.width = `${size}px`
    container.style.height = `${size}px`
    container.style.backgroundColor = '#323232'
    return container
}


class Vector2 {
  public x : number 
  public y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  set(x: number, y: number) : void {
    this.x = x
    this.y = y
  }

  add(x: number, y: number) : void {
    this.x += x
    this.y += y
  }

  copy(other: Vector2) {
    this.x = other.x
    this.y = other.y
  }

  clone(): Vector2 {
    return new Vector2(this.x, this.y)
  }
}

function decimalToBinary(N: number) {
  let binary = '';

  while (N > 0) {
      binary = (N % 2) + binary;
      N = Math.floor(N / 2);
  }

  return binary;
}

function thirdLargest(arr: number[]): number | null {
  
  if ( arr.length < 3 ) {
    console.log('enter array with atleast 3 elements')
    return null
  }
  
  let first = -Infinity
  let second = -Infinity
  let third = -Infinity

  for( let i = 0; i < arr.length; i++) {
    if ( arr[i] > first) {
      let tmp = first
      first = arr[i]
      second = tmp
    }
  }

  for(let i = 0; i < arr.length; i++) {
    if( arr[i] > second && arr[i] < first) {
      let tmp = second
      second = arr[i]
      third = tmp
    }
  }

  for(let i = 0; i < arr.length; i++) {
    if( arr[i] > third && arr[i] < second) {
      third = arr[i]
    }
  }


  return third

}


function thirdLargestSP(arr: number[]): number | null {
  
  if ( arr.length < 3 ) {
    console.log('enter array with atleast 3 elements')
    return null
  }
  
  let first = arr[0]
  let second = -Infinity
  let third = -Infinity

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > first) {

      third = second;
      second = first;
      first = arr[i];

    } else if (arr[i] > second) {

      third = second;
      second = arr[i];

    } else if (arr[i] > third) third = arr[i];
  }

  return third
}



export { createElemWithClasses, createSquareContainer, Vector2, decimalToBinary, thirdLargest, thirdLargestSP }