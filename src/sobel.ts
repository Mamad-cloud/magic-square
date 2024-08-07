// 1: convert image to gray-scale 
// 2: apply little gausian blur
// 3: apply sobel kernel in x and y coords and take G = sqrt(Gx^2 + Gy^2)

const imageElem = <HTMLImageElement>document.createElement('img')
imageElem.src = 'image.png'
let ar = imageElem.width / imageElem.height

const canvas = document.createElement('canvas') as HTMLCanvasElement
canvas.width = 800 
canvas.height = 800 * (1 / ar)
let ctx = canvas.getContext('2d') as CanvasRenderingContext2D

const canvas2 = document.createElement('canvas') as HTMLCanvasElement
canvas2.width = 802 
canvas2.height = 802 * (1 / ar) + 2
let ctx2 = canvas2.getContext('2d') as CanvasRenderingContext2D

document.body.appendChild(canvas)
document.body.appendChild(canvas2)

// the sobel kernels 
let Sx = [
    [1, 0, -1],
    [2, 0, -2],
    [1, 0, -1]
]

let Sy = [
    [1, 2, 1],
    [0, 0, 0],
    [-1, -2, -1]
]

imageElem.onload = ( _ev ) => {
    ctx.drawImage(imageElem, 0, 0, canvas.width, canvas.height)

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const newImg = ctx.createImageData(imgData.width + 2, imgData.height + 2)
    // fill in alpha vals 
    for( let i = 0; i < newImg.data.length; i+=4) {
        newImg.data[i + 3] = 255
    }

    // copy old image into the new one 
    for( let i = 0; i < imgData.height; i++) {
        for( let j = 0; j < imgData.width * 4; j++) {
            newImg.data[(i + 1) * (newImg.width * 4) + (j + 4)] = imgData.data[i * (imgData.width * 4) + j]
        }
    }

    // apply gray-scale filter
    for( let i = 0; i < newImg.data.length; i+=4 ) {
        const average = Math.floor((newImg.data[i] + newImg.data[i + 1] + newImg.data[i + 2]) / 3)
        newImg.data[i] = average
        newImg.data[i + 1] = average
        newImg.data[i + 2] = average
        newImg.data[i + 3] = newImg.data[i + 3]
    }

    // convulve image with sobel operators 
    for( let i = 0; i <= newImg.height - 2; i++) {
        for( let j = 0; j <= (newImg.width - 3) * 4; j+=4) {

            let a0 = newImg.data[i * (newImg.width * 4) + j + 2]
            let a1 = newImg.data[i * (newImg.width * 4) + j + 2 + 4]
            let a2 = newImg.data[i * (newImg.width * 4) + j + 2 + 8]

            let b0 = newImg.data[(i + 1) * (newImg.width * 4) + j + 2]
            let b1 = newImg.data[(i + 1) * (newImg.width * 4) + j + 2 + 4]
            let b2 = newImg.data[(i + 1) * (newImg.width * 4) + j + 2 + 8]

            let c0 = newImg.data[(i + 2) * (newImg.width * 4) + j + 2]
            let c1 = newImg.data[(i + 2) * (newImg.width * 4) + j + 2 + 4]
            let c2 = newImg.data[(i + 2) * (newImg.width * 4) + j + 2 + 8]

            let mat = [
                [a0, a1, a2],
                [b0, b1, b2],
                [c0, c1, c2],
            ]


            let Gx = 0
            for( let i = 0; i < 3; i++) {
                for( let j = 0; j < 3; j++) {
                    Gx += mat[i][j] * Sx[2 - i][2 - j]
                }
            }

            
            let Gy = 0
            for( let i = 0; i < 3; i++) {
                for( let j = 0; j < 3; j++) {
                    Gy += mat[i][j] * Sy[2-i][2-j]
                }
            }

            let G = Math.sqrt(Gx * Gx + Gy * Gy) 


            newImg.data[(i + 1) * (newImg.width * 4) + j + 2 + 4] = G
            newImg.data[(i + 1) * (newImg.width * 4) + j + 2 + 3] = G
            newImg.data[(i + 1) * (newImg.width * 4) + j + 2 + 2] = G

        }
    }
    

    ctx2.putImageData(newImg, 0, 0)

}