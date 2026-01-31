import sprite from "./sprite.ts";
import logic from "./logic.ts";
import statements from "./statements.ts";

export class maskWearer{
    sprite:sprite
    logic:logic
    name:string=""
    constructor(s:sprite, l:logic, n:string){
        this.sprite  = s
        this.logic = l
        this.name = n
    }

    make_statement(room:maskWearer[]){
        let statement_truth = this.logic.getSelfValue(room)
        let potential_statements = []
        for(let statement of statements){
            if(statement_truth == statement[1]){
                potential_statements.push(statement[0] as string)
            }
        }
        let statement_index = Math.floor(Math.random() * potential_statements.length)
        let statement = potential_statements[statement_index] 
        return statement.replace("{name}", this.name)
    }
}

let defaultSprite:sprite = new sprite()
let baseTrueFunction = ()=>{return true}
let baseFalseFunction = ()=>{return false}
let baseRandomFunction = ()=>{return (Math.random() > 0.5)}

export let zodiacs:maskWearer[] = [
    new maskWearer(defaultSprite, new logic(0, baseTrueFunction), "Aries"),
    new maskWearer(defaultSprite, new logic(0, baseFalseFunction), "Taurus"),
    new maskWearer(defaultSprite, new logic(0, baseTrueFunction), "Gemini"),
    new maskWearer(defaultSprite, new logic(0, baseRandomFunction), "Cancer"),
    new maskWearer(defaultSprite, new logic(0, baseTrueFunction), "Leo"),
    new maskWearer(defaultSprite, new logic(0, baseFalseFunction), "Virgo"),
    new maskWearer(defaultSprite, new logic(0, baseRandomFunction), "Scorpio"),
    new maskWearer(defaultSprite, new logic(0, baseTrueFunction), "Sagitarius"),
    new maskWearer(defaultSprite, new logic(0, baseRandomFunction), "Capricorn"),
    new maskWearer(defaultSprite, new logic(0, baseTrueFunction), "Pisces"),
    new maskWearer(defaultSprite, new logic(0, baseFalseFunction), "Aquarius")
]