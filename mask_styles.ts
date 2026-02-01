export let colors = new Map<string, string>([
    ["Red", "#FF0000"],
    ["Orange", "#FF8800"],
    ["Yellow", "#FFFF00"],
    ["Green", "#00DD22"],
    ["Blue", "#0000FF"],
    ["Purple", "#BB00FF"],
    ["Black", "#333333"],
    ["White", "#DDDDDD"]
])

function smoothHair(context: CanvasRenderingContext2D, x:number, y:number, w:number, h:number, color_1:string, color_2:string, color_3:string):void{
    /*context.save()
    context.fillStyle = colors.get(color_1) as string
    context.fillRect(x, y, w,h)
    context.restore()
    */
}

function featherHair(context: CanvasRenderingContext2D, x:number, y:number, w:number, h:number, color_1:string, color_2:string, color_3:string):void{
    context.save()
    context.lineWidth = Math.ceil(Math.min(w/75, h/12))
    context.strokeStyle="#000000"
    context.beginPath()
    context.moveTo(x+w/2, y+h)
    context.bezierCurveTo(x, y+h, x+w/4, y, x+w/2, y+h)
    context.fillStyle = colors.get(color_3) as string
    context.fill()
    context.stroke()
    context.beginPath()
    context.moveTo(x+w/2, y+h)
    context.bezierCurveTo(x+w, y+h, x+3*w/4, y, x+w/2, y+h)
    context.fillStyle = colors.get(color_3) as string
    context.fill()
    context.stroke()
    context.beginPath()
    context.moveTo(x+w/2, y+h)
    context.bezierCurveTo(x+w/4, y, x+(3*w)/4, y, x+w/2, y+h)
    context.fillStyle = colors.get(color_2) as string
    context.fill()
    context.stroke()

    context.restore()
}

function hornHair(context: CanvasRenderingContext2D, x:number, y:number, w:number, h:number, color_1:string, color_2:string, color_3:string):void{
    context.save()
    context.lineWidth = Math.ceil(Math.min(w/75, h/12))
    context.strokeStyle="#000000"
    context.fillStyle = color_2
    context.beginPath()
    context.moveTo(x+w/4, y+h)
    context.bezierCurveTo(x+3*w/16, y+h/2, x+3*w/16, y+h/2, x+3*w/16, y)
    context.bezierCurveTo(x+w/4, y+h/2, x+w/4, y+3*h/4, x+7*w/16, y+h)
    context.closePath()
    context.fill()
    context.stroke()
    context.beginPath()
    context.moveTo(x+3*w/4, y+h)
    context.bezierCurveTo(x+13*w/16, y+h/2, x+13*w/16, y+h/2, x+13*w/16, y)
    context.bezierCurveTo(x+3*w/4, y+h/2, x+3*w/4, y+3*h/4, x+9*w/16, y+h)
    context.closePath()
    context.fill()
    context.stroke()


    context.restore()
}

export let hairs = new Map<string, (context: CanvasRenderingContext2D, x:number, y:number, w:number, h:number, color_1:string, color_2:string, color_3:string)=>void>([
    ["nothing", smoothHair],
    ["feathers", featherHair],
    ["horns", hornHair]
])

function circle_eyes(context: CanvasRenderingContext2D, x:number, y:number, w:number, h:number, color_1:string, color_2:string, color_3:string):void{
    context.save()
    let radius = Math.min(h/2, w/6)
    context.strokeStyle = "#000000"
    context.lineWidth = Math.ceil(Math.min(w/75, h/12))
    context.fillStyle = colors.get(color_2) as string
    context.beginPath()
    context.arc(x+w/4, y+h/2, radius, 0, 2 * Math.PI)
    context.fill()
    context.stroke()
    context.beginPath()
    context.arc(x+3 * w/4, y+h/2, radius, 0, 2 * Math.PI)
    context.fill()
    context.stroke()
    context.restore()
}

function angry_eyes(context: CanvasRenderingContext2D, x:number, y:number, w:number, h:number, color_1:string, color_2:string, color_3:string):void{
    context.save()
    let radius = Math.min(5 * h/8, w/6)
    context.strokeStyle = "#000000"
    context.lineWidth = Math.ceil(Math.min(w/75, h/12))
    context.fillStyle = colors.get(color_2) as string
    context.beginPath()
    context.arc(x+9*w/32, y+3*h/8, radius, Math.PI/8, 5 * Math.PI / 4)
    context.closePath()
    context.fill()
    context.stroke()
    context.beginPath()
    context.arc(x+23*w/32, y+3*h/8, radius, -Math.PI/4, 7 * Math.PI/8)
    context.closePath()
    context.fill()
    context.stroke()
    context.restore()
}

function triangle_eyes(context: CanvasRenderingContext2D, x:number, y:number, w:number, h:number, color_1:string, color_2:string, color_3:string):void{
    context.save()
    context.strokeStyle = "#000000"
    context.lineWidth = Math.ceil(Math.min(w/75, h/12))
    context.fillStyle = colors.get(color_2) as string
    context.beginPath()
    context.moveTo(x+3*w/16, y+h)
    context.lineTo(x+5*w/16, y)
    context.lineTo(x+7*w/16, y+h)
    context.closePath()
    context.fill()
    context.stroke()
    context.beginPath()
    context.moveTo(x+9*w/16, y+h)
    context.lineTo(x+11*w/16, y)
    context.lineTo(x+13*w/16, y+h)
    context.closePath()
    context.fill()
    context.stroke()
    context.restore()
}

export let eyes = new Map<string, (context: CanvasRenderingContext2D, x:number, y:number, w:number, h:number, color_1:string, color_2:string, color_3:string)=>void>([
    ["circular", circle_eyes],
    ["angry", angry_eyes],
    ["triangular", triangle_eyes]
])

function smile_mouth(context: CanvasRenderingContext2D, x:number, y:number, w:number, h:number, color_1:string, color_2:string, color_3:string):void{
    context.save()
    context.strokeStyle = "#000000"
    context.lineWidth = Math.ceil(Math.min(w/75, h/12))
    context.fillStyle = color_3
    context.beginPath()
    context.moveTo(x,y)
    context.bezierCurveTo(x+w/3, y+h/4, x+2*w/3, y+h/4, x+w, y)
    context.bezierCurveTo(x+2*w/3, y+h, x+w/3, y+h, x, y)
    context.fill()
    context.stroke()
    context.restore()
}

function frown_mouth(context: CanvasRenderingContext2D, x:number, y:number, w:number, h:number, color_1:string, color_2:string, color_3:string):void{
    context.save()
    context.strokeStyle = "#000000"
    context.lineWidth = Math.ceil(Math.min(w/75, h/12))
    context.fillStyle = color_3
    context.beginPath()
    context.moveTo(x,y+7*h/8)
    context.bezierCurveTo(x+w/3, y+5*h/8, x+2*w/3, y+5*h/8, x+w, y+7*h/8)
    context.bezierCurveTo(x+2*w/3, y, x+w/3, y, x, y+7*h/8)
    context.fill()
    context.stroke()
    context.restore()
}

function tooth_mouth(context: CanvasRenderingContext2D, x:number, y:number, w:number, h:number, color_1:string, color_2:string, color_3:string):void{
    context.save()
    context.strokeStyle = "#000000"
    context.lineWidth = Math.ceil(Math.min(w/75, h/12))
    context.fillStyle = color_3
    context.beginPath()
    context.moveTo(x, y+h/3)
    context.lineTo(x+w/6, y)
    context.lineTo(x+2*w/6, y+h/3)
    context.lineTo(x+3*w/6, y)
    context.lineTo(x+4*w/6, y+h/3)
    context.lineTo(x+5*w/6, y)
    context.lineTo(x+w, y+h/3)
    context.lineTo(x+5*w/6, y+h)
    context.lineTo(x+4*w/6, y+3*h/4)
    context.lineTo(x+3*w/6, y+h)
    context.lineTo(x+2*w/6, y+3*h/4)
    context.lineTo(x+1*w/6, y+h)
    context.lineTo(x, y+h/3)
    context.closePath()
    context.fill()
    context.stroke()

    context.restore()
}

export let mouths = new Map<string, (context: CanvasRenderingContext2D, x:number, y:number, w:number, h:number, color_1:string, color_2:string, color_3:string)=>void>([
    ["smiling", smile_mouth],
    ["frowning", frown_mouth],
    ["snarling", tooth_mouth]
])

export let ears = new Map<string, (context: CanvasRenderingContext2D, x:number, y:number, w:number, h:number, color_1:string, color_2:string, color_3:string)=>void>([

])

export function base_mask(context: CanvasRenderingContext2D, x:number, y:number, w:number, h:number, color_1:string, color_2:string, color_3:string):void{
    context.save()
    context.strokeStyle = "#000000"
    context.fillStyle = colors.get(color_1) as string
    context.lineWidth = Math.ceil(Math.min(w/75, h/75))
    context.beginPath()
    context.moveTo(x, y + h/8)
    context.bezierCurveTo(x+w/8, y, x+7*w/8, y, x+w, y+h/8)
    context.bezierCurveTo(x+w, y+3*h/4, x+3*w/4, y+7*h/8, x+w/2, y+h)
    context.bezierCurveTo(x+w/4, y+7*h/8, x, y+3*h/4, x, y+h/8)
    context.fill()
    context.stroke()
    context.restore()
}