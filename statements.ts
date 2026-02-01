/*
Substitutions:
{name} - swap with the speaker's name.
{!name} - swap with another person's name.
{other} - Another person in the room.
  {mask_detail} - A detail about {other}'s mask
  {!mask_detail} - A FALSE detail about {other}'s mask
*/

let statements = [
    ["I am {name}", true],
    ["One plus one is two", true],
    ["I am not {!name}", true],
    ["{other} has {mask_detail}", true],
    ["{other} has {mask_detail}", true],
    ["One plus one is three", false],
    ["I am not {name}", false],
    ["I am {!name}", false],
    ["{other} has {!mask_detail}", false],
    ["{other} has {!mask_detail}", false]
]

export default statements