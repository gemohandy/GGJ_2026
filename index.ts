import {zodiacs} from "./maskWearer.ts"

let current_index = 0
let statements:string[] = []

let canvas = document.getElementById("game-canvas") as HTMLCanvasElement
let context = canvas.getContext("2d") as CanvasRenderingContext2D

function setup(): void{
    for(let sign of zodiacs){
        statements.push(sign.make_statement(zodiacs))
    }
    
    drawStatement(current_index)
}

 setup()

function nextStatement():void{
    current_index++
    while(current_index >= statements.length){
        current_index -= statements.length
    }
    drawStatement(current_index)
}

function drawStatement(i:number){
    context.clearRect(0,0,4000, 2250)
    zodiacs[i].draw(context, 1250, 375, 1500, 1500)
    context.fillStyle="#FFBB88"
    context.fillRect(750, 2000, 2500, 200)
    context.fillStyle = "#000000";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "75px sans-serif"
    context.fillText(statements[i], 2000, 2100, 2500)
}

declare global{
    interface Window{
        nextStatement: ()=>void
    }
}

window.nextStatement = nextStatement;

export default {}