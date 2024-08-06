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
canvas2.width = 800 
canvas2.height = 800 * (1 / ar)
let ctx2 = canvas2.getContext('2d') as CanvasRenderingContext2D

document.body.appendChild(canvas)
document.body.appendChild(canvas2)

// the sobel kernels 
let Gx = [
    [1, 0, -1],
    [2, 0, -2],
    [1, 0, -1]
]

let Gy = [
    [1, 2, 1],
    [0, 0, 0],
    [-1, -2, -1]
]

imageElem.onload = ( _ev ) => {
    ctx.drawImage(imageElem, 0, 0, canvas.width, canvas.height)

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const newImg = ctx.createImageData(imgData.width + 2, imgData.height + 2)
    console.log(imgData.width, imgData.height)

    for( let i = 0; i < imgData.height; i++) {
        for( let j = 0; j < imgData.width * 4; j++) {
            newImg.data[(i + 4) * (imgData.width * 4) + (j + 4)] = imgData.data[i * (imgData.width * 4) + j]
        }
    }
    

    ctx2.putImageData(newImg, 0, 0)

}