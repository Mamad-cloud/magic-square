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
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    let msg = 'secret message hurray!'
    let key = 'thisismykey2343'

    imageData = embedData(msg, imageData)
    let hidden = extractData(msg.length* 8, imageData)

    ctx2.putImageData(imageData, 0, 0)
    console.log(binStrToText(hidden))

}

function binStrToText(binStr: string): string {
    let txt = ''
    for( let i = 0; i < binStr.length; i += 8) {
        const char = String.fromCharCode(parseInt(binStr.slice(i, i + 8), 2))
        txt += char
    }
    return txt

}

function extractData(msgLen: number, img: ImageData): string {
    let msgBin = ''
    let channelIdx = 0
    let channelCtr = 0

    for( let i = 0; i < msgLen; i++) {

        

        let channel = img.data[channelIdx].toString(2).padStart(8, '0')
        
        if( channelCtr === 2) {
            channelIdx += 2
            channelCtr = 0
        } else {
            channelIdx++
            channelCtr++
        }
        
        // the 8th bit is the XOR result between the message bit and the 7th bit of the rgb image component 
        // therefore the message bit would be the second operand of the XOR operation which resulted in the 8th bit 
        // 7th XOR ? = 8th 
        if ( (channel[6] === '1' && channel[7] === '1') || (channel[6] === '0' && channel[7] === '0')) {
            msgBin += '0'
        } else  {
            msgBin += '1'
        }

        
    }
    
    return msgBin
}

function embedData(msg: string, img: ImageData): ImageData {
    // bytes array 
    let msgBin: number[] = []
    for( let i = 0; i < msg.length; i++) {
        msgBin.push(msg.charCodeAt(i))
    }

    let channelIdx = 0
    let channelCtr = 0

    for( let i = 0; i < msgBin.length; i++) {
        let toProc = msgBin[i]
        // extract 8 bits of the msg byte 
        let msgBitCarrier = ''
        for( let j = 0; j < 8; j++) {
            msgBitCarrier = toProc.toString(2).padStart(8, '0')
            msgBitCarrier = msgBitCarrier[j] // go from MSB to LSB

            let channel = img.data[channelIdx].toString(2).padStart(8, '0')
            let ch7thBit = parseInt(channel[6], 2)
            
            // XOR 7th bit of the image rgb component with the messsage bit 
            let xorRes = ch7thBit ^ parseInt(msgBitCarrier, 2)
            
            // place result in 8th bit of the pixel channel
            let binRepr: string | string[] = img.data[channelIdx].toString(2).padStart(8, '0')
            binRepr = binRepr.split('')
            binRepr.pop()
            binRepr.push(xorRes.toString(2))
            binRepr = binRepr.join('')
            
            img.data[channelIdx] = parseInt(binRepr, 2)
            
            if ( channelCtr === 2) {
                channelIdx += 2
                channelCtr = 0
                
            } else {
                channelIdx++
                channelCtr++
            }  
        }
    }
    
    return img 
}

