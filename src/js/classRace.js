import { PREP_CHARS } from "./prepare.js";
import { select, sum, scaleLinear, max } from "d3";

const races = ['Dragonborn', 'Dwarf', 'Elf', 'Gnome', 'Half-Elf', 'Halfling', 'Half-Orc', 'Human', 'Tiefling'];
const classes = ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard'];

//Préparation des données
let matrixData = [];
let raceCounter = 0;
races.forEach(race => {

    //Récupérer tous les personnages d'une race donnée
    let tempArray = [];
    PREP_CHARS.forEach(CHAR => {
        if (CHAR.race == race) {
            tempArray.push(CHAR);
        }
    });

    //Compter le nombre de personnages d'une race donnée ayant une certaine classe
    let counter = 0;
    let classCounter = 0;
    classes.forEach(classs => {
        tempArray.forEach(CHAR => {
            if (CHAR.class == classs) {
                counter++;
            }
        })

        let data = {
            y: raceCounter,
            x: classCounter,
            count: counter
        }

        counter = 0;
        classCounter++;
        matrixData.push(data);
    })
    raceCounter++;
})

//Initialisation
const margin = { top: 20, right: 20, bottom: 0, left: 80 },
    width = 900 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom,
    gridSize = Math.floor(width / classes.length * 0.95);


//Construction du SVG
let maingroup = select('#heatmap_classRace')
    .append("svg")
    .attr("class", "svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Intégration des deux axes
let raceLabels = maingroup.selectAll(".raceLabel")
    .data(races)
    .enter().append("text")
    .text(function (d) { return d; })
    .attr("x", 0)
    .attr("y", function (d, i) { return i * gridSize; })
    .attr("transform", "translate(-6," + gridSize / 2 + ")")
    .style("text-anchor", "end");

var classLabels = maingroup.selectAll(".classLabel")
    .data(classes)
    .enter().append("text")
    .text(function (d) { return d; })
    .attr("x", function (d, i) { return i * gridSize; })
    .attr("y", 0)
    .attr("transform", "translate(" + gridSize / 2 + ", -6)")
    .style("text-anchor", "middle");

matrixData.forEach(function (d) {
    d.race = +d.race;
    d.class = +d.class;
    d.count = +d.count;
});

//Gestion de la couleur
let colorScale = scaleLinear()
    .domain([0, max(matrixData, function (d) { return d.count; }) / 2, max(matrixData, function (d) { return d.count; })])
    .range(["#FEEBE5", "#E28263", "#FD4B13"]);

//Mise en place des réctangles
let heatMap = maingroup.selectAll(".hour")
    .data(matrixData)
    .enter().append("rect")
    .attr("x", function (d) { return d.x * gridSize; })
    .attr("y", function (d) { return d.y * gridSize; })
    .attr("width", gridSize)
    .attr("height", gridSize)
    .style("stroke", "white")
    .style("stroke-opacity", 0.6)
    .style("fill", function (d) { return colorScale(d.count); });