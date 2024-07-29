
interface ScoreItem {
    index: number, 
    score: number,
}

let n = 8
let generation = 0
let population: Array<Int32Array> = []
const scores: Array<ScoreItem> = []
const finalSolutions = new Map<number, Int32Array>()
let converged = false 

function time(func: (...any) => any, ...funcArgs: any[]) {
    const startTime = performance.now()

    const retVal = func(...funcArgs)

    const endTime = performance.now()
    const elapsed = endTime - startTime

    console.log(`${func.name} called with ${funcArgs}`)
    console.log(`terminted in ${elapsed} ms`)

    return retVal
}


function initGeneration0(size: number): void {
    generation = 0

    for (let i = 0; i < size; i++) {
        population.push(new Int32Array(n).fill(-1))
        for (let j = 0; j < n; j++) {
            let rndIdx
            let found = false
            while (!found) {
                rndIdx = Math.floor(Math.random() * n)
                if (population[i][rndIdx] === -1) {
                    population[i][rndIdx] = j
                    found = true
                }
            }


        }
    }
}

function fitness(solution: Int32Array): number {
    let numberOfAttcks = 0

    // TODO: there is a more optimized way of doing this no needing this array 
    let board = Array<Int32Array>(n)
    for (let i = 0; i < n; i++) {
        board[i] = new Int32Array(n).fill(0)
    }

    for (let x = 0; x < n; x++) {
        let queen = solution[x]
        for (let y = 0; y < n; y++) {
            if (queen === y) {
                board[x][y] = 1
                break;
            }
        }
    }

    // check down for each queen 
    for (let row = 0; row < n; row++) {
        let queen = solution[row]
        for (let _row = row + 1; _row < n; _row++) {
            if (board[_row][queen] === 1) numberOfAttcks++
        }
    }

    // check left 
    for (let row = 0; row < n; row++) {
        let queen = solution[row]
        for (let col = queen - 1; col >= 0; col--) {
            if (board[row][col] === 1) numberOfAttcks++
        }
    }

    // check up-left diagonal 
    for (let row = 0; row < n; row++) {
        let queen = solution[row]
        for (let i = row - 1, j = queen - 1; i >= 0 && j >= 0; i--, j-- ) {
            if (board[i][j] === 1) numberOfAttcks++
        }
    }

    // check down-left diagonal 
    for (let row = 0; row < n; row++) {
        let queen = solution[row]
        for (let i = row + 1, j = queen - 1; i < n && j >= 0; i++, j-- ) {
            if (board[i][j] === 1) numberOfAttcks++
        }
    }

    return numberOfAttcks
}

// TODO: Maybe return the number of scores and check for bounds 
function populateFitnessScores(): void {

    for( let i = 0; i < population.length; i++) {
        let newScore: ScoreItem = {index: i, score: fitness(population[i])}
        scores.push(newScore)
    }
}

function survivalOfTheFittest(size: number): Array<Int32Array> {

    if( size > population.length ) {
        console.log('size should be less than population size')
        return 
    }

    populateFitnessScores()
    scores.sort( (a: ScoreItem, b: ScoreItem) => a.score - b.score)

    const fittest: Array<Int32Array> = [] 

    for( let i = 0; i < size; i++) {
        if(scores[i].score === 0 && !finalSolutions.has(scores[i].index)) {
            finalSolutions.set(scores[i].index, population[scores[i].index])
            converged = true
        } 
        fittest.push(population[scores[i].index])
    }

    return fittest
}

function printScores(): void {
    for( let i = 0; i < population.length; i++) {
        console.log(`${i}: ${population[i]} -> ${scores[i].score}`)
    }
}

function mate(parent1: Int32Array, parent2: Int32Array, crossoverPoint: number): Array<Int32Array> {
    if ( crossoverPoint >= parent1.length ) return [parent1, parent2]

    let child1 = new Int32Array([...parent1.slice(0, crossoverPoint), ...parent2.slice(crossoverPoint, parent2.length)])
    let child2 = new Int32Array([...parent2.slice(0, crossoverPoint), ...parent1.slice(crossoverPoint, parent1.length)])
    
    return [child1, child2]

}

function mutateGene(individual: Int32Array): void {
    
    const rndAlleleIdx = Math.floor(Math.random() * n)
    const rndAlleleVal = Math.floor(Math.random() * n)

    individual[rndAlleleIdx] = rndAlleleVal

}

function nextGeneration(): void {
    
    let prevPopSize = population.length
    population = survivalOfTheFittest( Math.floor(prevPopSize / 2) )

    for( let i = 0; i < prevPopSize / 2; i += 2) {
        const rndVar = Math.random()
        const mutationRate = 0.002

        const cop = Math.floor( Math.random() * n)
        
        if ( i + 1 !== prevPopSize ) {
            let children = mate(population[i], population[i + 1], cop)
            
            if( rndVar < mutationRate) {
                const rndIdx = Math.floor(Math.random() + 0.5)
                mutateGene(children[rndIdx])            
            }
            population.push( children[0], children[1] )
        } else {
            population.push(new Int32Array(population[i].buffer))
        }

    }
    generation++
    
}

function solveNQueen(maxGenerations: number = 500): void {
    
    let i = 0
    while( !converged && i < maxGenerations ) {
        nextGeneration()
        i++
    }

    if ( i !== maxGenerations)
        console.log(`Converged on the ${generation}th generation with ${finalSolutions.size} solutions`)
    else console.log(`could not find solution in ${i} generations`)
}


initGeneration0(100)
time(solveNQueen, 1000)