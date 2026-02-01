import maskWearer from "./maskWearer.ts"
import sprite from "./sprite.ts"
import logic from "./logic.ts"

let baseTrueFunction = ()=>{return true}
let baseFalseFunction = ()=>{return false}
let baseRandomFunction = ()=>{return (Math.random() > 0.5)}

let zodiacs:maskWearer[] = [
    new maskWearer(new sprite(), new logic(0, baseTrueFunction), "Aries"),
    new maskWearer(new sprite(), new logic(0, baseFalseFunction), "Taurus"),
    new maskWearer(new sprite(), new logic(0, baseTrueFunction), "Gemini"),
    new maskWearer(new sprite(), new logic(0, baseRandomFunction), "Cancer"),
    new maskWearer(new sprite(), new logic(0, baseTrueFunction), "Leo"),
    new maskWearer(new sprite(), new logic(0, baseFalseFunction), "Virgo"),
    new maskWearer(new sprite(), new logic(0, baseRandomFunction), "Scorpio"),
    new maskWearer(new sprite(), new logic(0, baseTrueFunction), "Sagitarius"),
    new maskWearer(new sprite(), new logic(0, baseRandomFunction), "Capricorn"),
    new maskWearer(new sprite(), new logic(0, baseTrueFunction), "Pisces"),
    new maskWearer(new sprite(), new logic(0, baseFalseFunction), "Aquarius")
]

let guesses:string[] = []
let options = ["", "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Scorpio", "Sagitarius", "Capricorn", "Pisces", "Aquarius"]

let dropdownOpen = -1

let current_index = 0
let statements:string[] = []
let archive:string[][] = []
let game_state = "grid"

let canvas = document.getElementById("game-canvas") as HTMLCanvasElement
let openBook = document.getElementById("open-book-asset") as HTMLImageElement
let closedBook = document.getElementById("closed-book-asset") as HTMLImageElement

let context = canvas.getContext("2d") as CanvasRenderingContext2D

function setup(): void{
    let currentIndex = zodiacs.length
    let randomIndex:number
    while(currentIndex !== 0){
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        let temp:maskWearer = zodiacs[currentIndex]
        zodiacs[currentIndex] = zodiacs[randomIndex]
        zodiacs[randomIndex] = temp
    }

    let i = 1
    for(let sign of zodiacs){
        statements.push(sign.make_statement(zodiacs))
        guesses.push("")
        i++
    }
    
    drawPage()
}

setup()

function drawPage(){
    context.clearRect(0,0,4000, 2250)
    context.fillStyle = "#7c5525"
    context.fillRect(0,0,4000,2250)
    console.log(game_state)
    switch(game_state){
        case "grid":
            drawGrid();
            break;

        case "statement":
            drawStatement(current_index)
            break;

        case "identify":
            drawIdentifyBook()
            break;

        case "score":
            drawIdentifyBook()
            context.fillStyle = "#00000044"
            context.fillRect(0,0,4000, 2500)
            drawScore()
            break;
    }
}

function drawGrid(){
    let side_length = 600
    let gap = 225
    let left = 100
    let top = 0
    for(let i = 0; i < zodiacs.length; i++){
        let x = i % 4
        let y = Math.floor(i/4)
        let left_offset = (side_length + gap) * x
        let top_offset = (side_length + gap) * y
        zodiacs[i].draw(context, left + left_offset, top + top_offset, side_length, side_length)
    }
    let left_offset = (side_length + gap) * 3
    let top_offset = (side_length + gap) * 2
    drawNextButton(left + left_offset, top + top_offset, side_length, side_length)
    context.drawImage(closedBook, left + 4 * (side_length + gap), top + 2 * (side_length + gap), side_length, side_length)
}

function drawNextButton(x:number, y:number, w:number, h:number){
    context.save()
    context.fillStyle = "#DDDD99"
    context.lineWidth = Math.ceil(Math.min(w/75, h/75))
    context.strokeStyle = "#000000"
    context.fillRect(x, y+h/3, w, h/3)
    context.strokeRect(x, y+h/3, w, h/3)
    context.fillStyle = "#DD2222"
    context.beginPath()
    context.moveTo(x+w/6, y+3*h/8)
    context.lineTo(x+w/2, y+15*h/32)
    context.lineTo(x+w/2, y+3*h/8)
    context.lineTo(x+5*w/6, y+h/2)
    context.lineTo(x+w/2, y+5*h/8)
    context.lineTo(x+w/2, y+17*h/32)
    context.lineTo(x+w/6, y+5*h/8)
    context.closePath()
    context.fill()
    context.stroke()

    context.restore()
}

function drawStatement(i:number){
    zodiacs[i].draw(context, 1250, 375, 1500, 1500)
    context.fillStyle="#FFBB88"
    context.fillRect(750, 2000, 2500, 200)
    context.fillStyle = "#000000";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "75px sans-serif"
    context.fillText(statements[i], 2000, 2100, 2500)
    drawBackButton(200, 0, 600, 600)
}

function drawBackButton(x:number, y:number, w:number, h:number){
    context.save()
    context.fillStyle = "#DDDD99"
    context.lineWidth = Math.ceil(Math.min(w/75, h/75))
    context.strokeStyle = "#000000"
    context.fillRect(x, y+h/3, w, h/3)
    context.strokeRect(x, y+h/3, w, h/3)
    context.fillStyle = "#DD2222"
    context.beginPath()
    context.moveTo(x+w/6, y+h/2)
    context.lineTo(x+w/3, y+3*h/8)
    context.lineTo(x+w/3, y+15*h/32)
    context.lineTo(x+5*w/6, y+15*h/32)
    context.lineTo(x+5*w/6, y+17*h/32)
    context.lineTo(x+w/3, y+17*h/32)
    context.lineTo(x+w/3, y+5*h/8)
    context.closePath()
    context.fill()
    context.stroke()

    context.restore()
}

function processClick(event:MouseEvent){
    let mouse_x = event.x
    let mouse_y = event.y
    let canvas_rect = canvas.getBoundingClientRect()
    let canvas_width = canvas_rect.width
    let canvas_height = canvas_rect.height
    let canvas_top = canvas_rect.top
    let canvas_left = canvas_rect.left
    mouse_x = (mouse_x - canvas_left)/canvas_width * 4000
    mouse_y = (mouse_y - canvas_top)/canvas_height * 2250
    let side_length:number = 0, left:number = 0, top:number = 0
    switch(game_state){
        case "grid":
            side_length = 600
            let gap = 225
            left = 200
            top = 0
            let grid_x = Math.floor((mouse_x - left) /(side_length + gap))
            let grid_y = Math.floor((mouse_y - top)/(side_length + gap))
            current_index = 4 * grid_y + grid_x
            if(grid_x < 4 && current_index != 11){
                game_state = "statement"
            }else if(grid_x == 4 && grid_y == 2){
                game_state = "identify"
            }
            break 

        case "statement":
            if(mouse_x >= 200 && mouse_y >= 200 && mouse_x <= 800 && mouse_y <= 400){
                game_state = "grid"
            }
            break

        case "identify":
            if(mouse_x >= 200 && mouse_y >= 100 && mouse_x <= 800 && mouse_y <= 300){
                game_state = "grid"
            }
            side_length = 350
            let x_gap = 533
            let y_gap = 200
            left = 500
            top = 750
            let row = Math.floor((mouse_y - top) / (side_length + y_gap))
            let column = Math.floor((mouse_x - left) / (side_length + x_gap))
            if(mouse_x <= left + column * (x_gap + side_length) + side_length && mouse_y <= top + row * (y_gap + side_length)+100){
                let index = 4 * row + column
                if(index < 11){
                    dropdownOpen = index
                }
            }else if(mouse_x > left + 3*(side_length + x_gap) && mouse_x < left + 3*(side_length+x_gap) + side_length && mouse_y < top + 2 * (side_length + y_gap) && mouse_y > 3 * (side_length + y_gap)){
                game_state = "score"
            }else{
                top = 350
                if(mouse_y > top && mouse_y < top + 3 * (side_length + y_gap) - 50){
                    let row = Math.floor((mouse_y - top)/((3 * (side_length + y_gap) - 50)/12))
                    if(mouse_x > left + side_length + 50 && mouse_x < left + side_length + x_gap - 50){
                        guesses[dropdownOpen] = options[row]
                    }else if(mouse_x > left + 3 * side_length + 2 * x_gap + 50 && mouse_x < left + 3 * (side_length + x_gap) - 50){
                        guesses[dropdownOpen] = options[row]
                    }
                }
                dropdownOpen = -1
            }
            break

    }
    drawPage()
}

function drawIdentifyBook(){
    context.drawImage(openBook, 0, 0)
    drawBackButton(200, -100, 600, 600)
    let side_length = 350
    let x_gap = 533
    let y_gap = 200
    let left = 500
    let top = 350
    for(let i = 0; i < zodiacs.length; i++){
        let x = i % 4
        let y = Math.floor(i/4)
        let left_offset = (side_length + x_gap) * x
        let top_offset = (side_length + y_gap) * y
        zodiacs[i].draw(context, left + left_offset, top + top_offset, side_length, side_length)
        drawDropdownOuter(left+left_offset, top+top_offset+side_length+y_gap/4, side_length, 100, i)
    }
    drawSubmitButton(left + (side_length + x_gap) * 3, top + (side_length + y_gap) * 2, side_length, side_length + 3 * y_gap / 4);
    if(dropdownOpen > -1){
        context.save()
        context.strokeStyle = "#dcbd67"
        context.fillStyle = "#FFE08A"
        context.lineWidth = 10
        let page = Math.floor(dropdownOpen/2) % 2
        let page_offset = 2 * (side_length + x_gap) * page
        let side_of_page = dropdownOpen % 2
        let row = Math.floor(dropdownOpen/4)
        if(side_of_page == 0){
            context.beginPath()
            context.moveTo(left+page_offset * page + side_length, top+row*(side_length+y_gap) + y_gap/4 + side_length)
            context.lineTo(left+page_offset * page + side_length + 50, top+row*(side_length+y_gap) + y_gap/4 + side_length + 50)
            context.lineTo(left+page_offset * page + side_length, top+row*(side_length+y_gap) + y_gap/4 + side_length + 100)
            context.fill()
            context.stroke()
            context.closePath()
        }else{
            context.beginPath()
            context.moveTo(left+page_offset * page + side_length + x_gap, top+row*(side_length+y_gap) + y_gap/4 + side_length)
            context.lineTo(left+page_offset * page + side_length + x_gap - 50, top+row*(side_length+y_gap) + y_gap/4 + side_length + 50)
            context.lineTo(left+page_offset * page + side_length + x_gap, top+row*(side_length+y_gap) + y_gap/4 + side_length + 100)
            context.fill()
            context.stroke()
            context.closePath()
        }
        context.fillRect(left + page_offset * page + side_length + 50, top, x_gap-100, 3 * (side_length + y_gap) - 50)
        context.strokeRect(left + page_offset * page + side_length + 50, top, x_gap-100, 3 * (side_length + y_gap) - 50)
        let dropdownOptionHeight = (3 * (side_length + y_gap) - 50)/12
        context.fillStyle = "#000000"
        context.font = "60px sans-serif"
        context.textAlign = "center";
        context.textBaseline = "middle";
        for(let i=1; i < options.length; i++){
            context.beginPath()
            context.moveTo(left + page_offset * page + side_length + 50, top + i * dropdownOptionHeight)
            context.lineTo(left + page_offset * page + side_length + x_gap - 50, top + i * dropdownOptionHeight)
            context.closePath()
            context.stroke()
            context.fillText(options[i], left + page_offset * page + side_length + x_gap/2, top + (i + 0.5) * dropdownOptionHeight)
        }
        context.restore()
    }
}

function drawDropdownOuter(x:number, y:number, w:number, h:number, index:number){
    context.save()
    context.strokeStyle = "#dcbd67"
    context.fillStyle = "#FFE08A"
    context.lineWidth = 10
    context.fillRect(x,y,w,h)
    context.strokeRect(x,y,w,h)
    context.fillStyle = "#000000"
    context.font = "60px sans-serif"
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(guesses[index], x+w/2, y+h/2)
    context.restore()
}

function drawSubmitButton(x:number, y:number, w:number, h:number){
context.save()
    context.strokeStyle = "#dcbd67"
    context.fillStyle = "#FFE08A"
    context.lineWidth = 10
    context.fillRect(x,y,w,h)
    context.strokeRect(x,y,w,h)
    context.fillStyle = "#000000"
    context.font = "80px sans-serif"
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("SUBMIT", x+w/2, y+h/2)
    context.restore()
}

function drawScore(){
    context.save()
    context.strokeStyle = "#000000"
    context.fillStyle = "#FFFFFF"
    context.fillRect(1000, 250, 2000, 1750)
    context.strokeRect(1000, 250, 2000, 1750)
    context.fillStyle = "#000000"
    context.font = "80px sans-serif"
    context.textAlign = "center";
    context.textBaseline = "middle";
    let score = 0
    for(let i = 0; i < guesses.length; i++){
        if(guesses[i] == zodiacs[i].name){
            score++
        }
    }
    context.fillText("You got " + score.toString() + " out of 11 correct!", 2000, 1125)


    context.restore()
}

declare global{
    interface Window{
        processClick: (e:MouseEvent)=>void
    }
}

window.processClick = processClick


export default {}