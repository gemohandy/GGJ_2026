import sprite from "./sprite.ts";
import logic from "./logic.ts";
import statements from "./statements.ts";

class maskWearer{
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

    draw(con:CanvasRenderingContext2D, x:number, y:number, width:number, height:number){
        this.sprite.draw(con, x, y, width, height)
    }

    
}

export default maskWearer