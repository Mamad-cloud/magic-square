export class Queue<T> {
    private arr: T[] = []

    constructor(...items: T[]) {
        this.arr.push(...items)
    }

    public enqueue(item: T) {
        this.arr.push(item)
    }

    public dequeue() : T | undefined{
        return this.arr.shift()
    }

    public contains(item: T) {
        if ( this.arr.find( _item => _item === item)) return true
        else return false 
    }

    public isEmpty(): boolean {
        return this.arr.length === 0
    }

}

export class CircularQueue<T> {
    private arr: (T | null )[]
    private front: number 
    private rear: number 
    private capacity: number
    
    
    constructor(capacity: number) {
        this.capacity = capacity
        this.arr = Array(this.capacity).fill(null)
        this.front = -1 
        this.rear = -1 
    }


    private isFull(): boolean {
        return (this.front === 0 && this.rear === this.capacity - 1) || 
                ((this.rear + 1) % this.capacity === this.front )
    }

    private isEmpty(): boolean {
        return this.front === -1
    }

    public enqueue(item: T): void {
        if( this.isFull() ) {
            console.log('queue is full')
            return
        } else if (this.isEmpty()) {
            this.front = 0 
            this.rear = 0 
            this.arr[this.rear] = item
        } else if(this.rear === this.capacity-1 && this.front !== 0) {
            this.rear = 0 
            this.arr[this.rear] = item 
        } else {
            this.rear++ 
            this.arr[this.rear] = item 
        }
    }

    public dequeue(): T | null {
        if ( this.isEmpty()) {
            console.log('queue is empty')
            return null
        } else {
            const data: T = this.arr[this.front]!
            this.arr[this.front] = null

            if( this.front === this.capacity-1) {
                this.front = 0
            } else if (this.front === 0 && this.rear === 0) {
                this.front = -1
                this.rear = -1
            } else { 
                this.front++
            }

            return data
        }
    }

    public size(): number {
        return this.capacity
    }

}