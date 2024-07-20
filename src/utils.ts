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
}

export { createElemWithClasses, createSquareContainer, Vector2 }