console.log("hello world");

import DATA from './dnd_chars_all.json';
const CHARS = Object.entries(DATA);

// console.log(CHARS
//     .map(([nom, data]) => ({...data, nom}))
//     .map(d => ({
//         race: d?.race.processedRace[0],
//         class: d?.class,
//         skills: d?.skills,
//         spells: d?.spells,
//         feats: d?.feats,
//         weapons: d?.weapons,
//         alignment: d.alignment.processedAlignment[0],
//         name: d.name.alias[0]
//     }))
// );

const PREP_CHARS = CHARS
    .map(([nom, data]) => ({...data, nom}))
    .map(d => ({
        race: d?.race.processedRace[0],
        class: d?.class.class,
        skills: d?.skills,
        spells: d?.spells,
        feats: d?.feats,
        weapons: d?.weapons,
        alignment: d.alignment.processedAlignment[0],
        name: d.name.alias[0]
    }))
    .filter(d => 
        d.race == 'Dragonborn' ||
        d.race == 'Dwarf' ||
        d.race == 'Elf' ||
        d.race == 'Gnome' ||
        d.race == 'Half-Elf' ||
        d.race == 'Halfling' ||
        d.race == 'Half-Orc' ||
        d.race == 'Human' ||
        d.race == 'Tiefling'
    )
    // .filter(d => 
    //     d.class == 'Barbarian' ||
    //     d.class == 'Bard' ||
    //     d.class == 'Cleric' ||
    //     d.class == 'Druid' ||
    //     d.class == 'Fighter' ||
    //     d.class == 'Monk' ||
    //     d.class == 'Paladin' ||
    //     d.class == 'Ranger' ||
    //     d.class == 'Rogue' ||
    //     d.class == 'Sorcerer' ||
    //     d.class == 'Warlock' ||
    //     d.class == 'Wizard'
    // )

console.log(PREP_CHARS);
