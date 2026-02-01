import sprite from "./sprite.ts";
import * as styles from "./mask_styles.ts";
import logic from "./logic.ts";
import statements from "./statements.ts";
import zodiacs from "./zodiac_descriptions.ts";

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
        if(statement.includes("{name}")){
            statement = statement.replace("{name}", this.name)
        }
        if(statement.includes("{!name}")){
            let fake_name_index = Math.floor(Math.random() * zodiacs.length)
            let fake_name = zodiacs[fake_name_index][0]
            while(fake_name == this.name){
                fake_name_index++
                fake_name_index = fake_name_index % zodiacs.length
                fake_name = zodiacs[fake_name_index][0]
            }
            statement = statement.replace("{!name}", fake_name)
        }
        if(statement.includes("{other}")){
            let otherIndex = Math.floor(Math.random() * room.length);
            while(room[otherIndex].name == this.name){
                otherIndex ++
                otherIndex %= room.length
            }
            let otherName = room[otherIndex].name
            statement = statement.replace("{other}", otherName)
            let featureChoices = ["primary_color", "eyes", "hair", "mouth"]
            let feature = featureChoices[Math.floor(Math.random() * 4)]
            if(statement.includes("{mask_detail}")){
                switch(feature){
                    case "primary_color":
                        statement = statement.replace("{mask_detail}", "a " + room[otherIndex].sprite.color_1 + " colored mask")
                        break;
                    case "eyes":
                        statement = statement.replace("{mask_detail}", room[otherIndex].sprite.eyes + " eyes");
                        break;
                    case "hair":
                        statement = statement.replace("{mask_detail}", room[otherIndex].sprite.hair + " on top of their mask.");
                        break;
                    case "mouth":
                        statement = statement.replace("{mask_detail}", "a "+ room[otherIndex].sprite.mouth + " mouth")
                        break;
                }
            }
            else{
                let iterator:any, randomIndex:number, val:string|null
                switch(feature){
                    case "primary_color":
                        let colors = new Map(styles.colors)
                        colors.delete(room[otherIndex].sprite.color_1)
                        iterator = colors.keys()
                        randomIndex = Math.floor(Math.random() * colors.size)
                        val = null
                        for(let i = 0; i <= randomIndex; i++){
                            val = iterator.next().value
                        }
                        statement = statement.replace("{!mask_detail}", "a " + val + " colored mask")
                        break;
                    case "eyes":
                        let eyes = new Map(styles.eyes)
                        eyes.delete(room[otherIndex].sprite.eyes)
                        iterator = eyes.keys()
                        randomIndex = Math.floor(Math.random() * eyes.size)
                        val = null
                        for(let i = 0; i <= randomIndex; i++){
                            val = iterator.next().value
                        }
                        statement = statement.replace("{!mask_detail}", val + " eyes");
                        break;
                    case "hair":
                        let hair = new Map(styles.hairs)
                        hair.delete(room[otherIndex].sprite.hair)
                        iterator = hair.keys()
                        randomIndex = Math.floor(Math.random() * hair.size)
                        val = null
                        for(let i = 0; i <= randomIndex; i++){
                            val = iterator.next().value
                        }
                        statement = statement.replace("{!mask_detail}", val + " on their mask.");
                        break;
                    case "mouth":
                        let mouth = new Map(styles.mouths)
                        mouth.delete(room[otherIndex].sprite.mouth)
                        iterator = mouth.keys()
                        randomIndex = Math.floor(Math.random() * mouth.size)
                        val = null
                        for(let i = 0; i <= randomIndex; i++){
                            val = iterator.next().value
                        }
                        statement = statement.replace("{!mask_detail}", "a "+ val + " mouth")
                        break;
                }

            }
        }
        return statement
    }

    draw(con:CanvasRenderingContext2D, x:number, y:number, width:number, height:number){
        this.sprite.draw(con, x, y, width, height)
    }

    
}

export default maskWearer