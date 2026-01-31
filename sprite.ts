import {colors, hairs, eyes, mouths, base_mask} from "./mask_styles.ts"


class sprite{
    color_1 :string
    color_2 :string 
    color_3 :string 
    hair:string = ""
    eyes:string = ""
    mouth:string = ""
    ears:string = ""

    constructor(c1:string | null = null, c2 :string | null = null, c3:string | null = null, h:string | null = null, e:string | null = null, m:string | null = null){
        let index_1 = -1
        if(c1 === null){
            let iterator = colors.keys()
            index_1 = Math.floor(Math.random() * colors.size)
            console.log(index_1)
            for(let i = 0; i < index_1; i++){
                iterator.next()
            }
            this.color_1 = iterator.next().value as string
        }else{
            this.color_1 = c1
            let iterator = colors.keys()
            for(let i = 0; i < 8; i++){
                if(iterator.next().value == c1){
                    index_1 = i
                }
            }
        }
        
        let index_2 = -1
        if(c2 === null){
            let iterator = colors.keys()
            index_2 = Math.floor(Math.random() * colors.size)
            if(index_1 == index_2){
                index_2++
                index_2 = index_2 % 8
            }
            for(let i = 0; i < index_2; i++){
                iterator.next()
            }
            this.color_2 = iterator.next().value as string
        }else{
            this.color_2 = c2
            let iterator = colors.keys()
            for(let i = 0; i < 8; i++){
                if(iterator.next().value == c2){
                    index_2 = i
                }
            }
        }

        let index_3 = -1
        if(c3 === null){
            let iterator = colors.keys()
            index_3 = Math.floor(Math.random() * colors.size)
            while(index_1 == index_3 || index_2 == index_3){
                index_3++
                index_3 = index_3 % 8
            }
            for(let i = 0; i < index_3; i++){
                iterator.next()
            }
            this.color_3 = iterator.next().value as string
        }else{
            this.color_3 = c3
            let iterator = colors.keys()
            for(let i = 0; i < 8; i++){
                if(iterator.next().value == c3){
                    index_3 = i
                }
            }
        }

        if(h === null){
            let iterator = hairs.keys()
            let index = Math.floor(Math.random() * hairs.size)
            for(let i = 0; i < index; i++){
                iterator.next()
            }
            this.hair = iterator.next().value as string
        }else{
            this.hair = h
        }

        if(e === null){
            let iterator = eyes.keys()
            let index = Math.floor(Math.random() * eyes.size)
            for(let i = 0; i < index; i++){
                iterator.next()
            }
            this.eyes = iterator.next().value as string
        }else{
            this.eyes = e
        }

        if(m === null){
            let iterator = mouths.keys()
            let index = Math.floor(Math.random() * mouths.size)
            for(let i = 0; i < index; i++){
                iterator.next()
            }
            this.mouth = iterator.next().value as string
        }else{
            this.mouth = m
        }

    }

    draw(con:CanvasRenderingContext2D, x:number, y:number, width:number, height:number){
        let hair_func = hairs.get(this.hair)
        if(hair_func !== null && hair_func !== undefined){
            hair_func(con, x, y, width, height/6, this.color_1, this.color_2, this.color_3)
        }
        base_mask(con, x + width/16, y+height/8, 7 * width/8, 7*height/8, this.color_1, this.color_2, this.color_3)
        let eye_func = eyes.get(this.eyes)
        if(eye_func !== null && eye_func !== undefined){
            eye_func(con, x+width/8, y + 5 * height/16, 3 * width / 4, height/6, this.color_1, this.color_2, this.color_3)
        }
        let mouth_func = mouths.get(this.mouth)
        if(mouth_func !== null && mouth_func !== undefined){
            mouth_func(con, x+width/4, y + 5 * height/8, width / 2, height/5, this.color_1, this.color_2, this.color_3)
        }
    }
}

export default sprite