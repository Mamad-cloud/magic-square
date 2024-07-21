import { CircularQueue, Queue } from "./queue"

export class Stack<T> {

    private arr: T[] = []

    constructor(...items: T[]) {
        const _items = items.reverse()
        this.arr.unshift(..._items)
    }

    public push(item: T) : void {
        this.arr.unshift(item)
    }

    public pop(): T | undefined{
        return this.arr.shift()
    }

    public contains(item: T): boolean {
        if ( this.arr.find(_item => _item === item ) !== undefined)
            return true
        else return false 
    }

    public isEmpty(): boolean {
        return this.arr.length === 0
    }
}




function main(): number {
    const q = new Queue(1, 2, 3, 4)
    console.log(q.dequeue())
    console.log(q.enqueue(5))
    console.log(q.dequeue())
    console.log(q)

    const cq = new CircularQueue(5)
    cq.enqueue('1')
    cq.enqueue('2')
    cq.enqueue('3')
    cq.enqueue('4')
    cq.enqueue('5')
    cq.enqueue('6')

    console.log({...cq})
    
    console.log(cq.dequeue())
    console.log(cq.dequeue())
    console.log(cq.dequeue())
    console.log(cq.dequeue())
    
    cq.enqueue('7')
    cq.enqueue('8')
    cq.enqueue('9')
    cq.enqueue('10')
    cq.enqueue('11')
    
    console.log(cq.dequeue())
    console.log(cq) 
    return 0;
}

main()