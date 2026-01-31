import {zodiacs} from "./maskWearer.ts"

function main(): void{
    for(let sign of zodiacs){
        console.log(sign.make_statement(zodiacs))
    }
}

main()

export default {}