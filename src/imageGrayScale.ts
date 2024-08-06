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

imageElem.onload = (_ev) => {
    ctx.drawImage(imageElem, 0, 0, canvas.width, canvas.height)

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    let newImg = ctx2.createImageData(imageData)
    let data = imageData.data
    // since it will be srgb 
    for( let i = 0; i<data.length; i+=4 ) {
        const average = Math.floor((data[i] + data[i + 1] + data[i + 2]) / 3)
        newImg.data[i] = average
        newImg.data[i + 1] = average
        newImg.data[i + 2] = average
        newImg.data[i + 3] = data[i + 3]
    }
    console.log(newImg)
    ctx2.putImageData(newImg, 0, 0)
}