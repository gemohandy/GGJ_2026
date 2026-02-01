/*
Substitutions:
{name} - swap with the speaker's name.
{!name} - swap with another person's name.

*/

let statements = [
    ["I am {name}", true],
    ["One plus one is two", true],
    ["I am not {!name}", true],
    ["{other} has {mask_detail}", true],
    ["One plus one is three", false],
    ["I am not {name}", false],
    ["I am {!name}", false],
    ["{other} has {!mask_detail}", false]
]

export default statements