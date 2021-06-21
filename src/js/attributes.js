import { PREP_CHARS } from "./prepare.js";
import { pie, select, arc } from "d3";

let chaValues = [];
let conValues = [];
let dexValues = [];
let intValues = [];
let strValues = [];
let wisValues = [];

PREP_CHARS.forEach(character => {
    chaValues.push(character.attributes.Cha[0]);
    conValues.push(character.attributes.Con[0]);
    dexValues.push(character.attributes.Dex[0]);
    intValues.push(character.attributes.Int[0]);
    strValues.push(character.attributes.Str[0]);
    wisValues.push(character.attributes.Wis[0]);
});

const DATA = [
    { name: 'Charisme', value: (chaValues.reduce((a, b) => a + b, 0) / chaValues.length) },
    { name: 'Constitution', value: (conValues.reduce((a, b) => a + b, 0) / conValues.length) },
    { name: 'Dexterité', value: (dexValues.reduce((a, b) => a + b, 0) / dexValues.length) },
    { name: 'Intelligence', value: (intValues.reduce((a, b) => a + b, 0) / intValues.length) },
    { name: 'Force', value: (strValues.reduce((a, b) => a + b, 0) / strValues.length) },
    { name: 'Sagesse', value: (wisValues.reduce((a, b) => a + b, 0) / wisValues.length) },
]

let getPieData = pie().value(d => d.value);
let pieData = getPieData(DATA);

const WIDTH = 500;
const HEIGHT = 500;

const svg = select('#pie_attributes')
    .append('svg')
    .attr("width", WIDTH)
    .attr("height", HEIGHT)
    .attr('viewBox', `0 0 ${WIDTH} ${HEIGHT}`)

const arcCreator = arc()
    .innerRadius(0) //Rayon interne
    .outerRadius(HEIGHT / 2); //Rayon externe

//Définition de la couleur
const color = ({ data }) => {
    switch (data.name) {
        case 'Charisme': return 'blue'
        case 'Constitution': return 'red'
        case 'Dexterité': return 'green'
        case 'Intelligence': return 'orange'
        case 'Force': return 'yellow'
        case 'Sagesse': return 'purple'
    }
}

//Centrer le cambembert via un groupe
const group = svg.append('g')
    .attr('transform', `translate(${WIDTH / 2}, ${HEIGHT / 2})`);

group.selectAll('path')
    .data(pieData)
    .enter()
    .append('path')
    .attr('d', arcCreator)
    .attr('fill', color);

group.selectAll('text')
    .data(pieData)
    .enter()
    .append('text')
    .attr('transform', d => `translate(${arcCreator.centroid(d)})`)
    .attr('text-anchor', 'middle')
    .attr('font-family', 'sans-serif')
    // .attr('font-size', '1.2rem')
    // .text(d => d.data.name)
    .text(function(d) { return d.data.name + ": " + Math.round(d.data.value) + "%" })
   