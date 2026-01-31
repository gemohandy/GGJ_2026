import {maskWearer} from "./maskWearer.ts"

class logic{
    active_value: (room:maskWearer[]) => boolean = ()=>{return true}
    can_be_modified: boolean = true
    modifier: (room:maskWearer[], index:number)=>(boolean | null) = ()=>{return null}
    identifier: number

    constructor(id: number, fn: ( room:maskWearer[])=> boolean, modifier: (room:maskWearer[], index:number)=>boolean|null = ()=>{return null}, cbm: boolean = true){
        this.identifier = id
        this.active_value = fn
        this.can_be_modified = cbm
        this.modifier = modifier
    }

    matches(other:logic){
        return other.identifier == this.identifier
    }

    getSelfValue(room:maskWearer[]){
        let val:boolean = this.active_value(room)
        if(!this.can_be_modified){
            return val
        }
        let index = -1
        for(let i = 0; i < room.length; i++){
            if(this.matches(room[i].logic)){
                index = i
                break
            }
        }
        for(let i = 0; i < room.length; i++){
            let mod = room[i].logic.modifier(room, index)
            if(mod !== null){
                val = mod
            }
        }
        return val
    }
}

export default logic