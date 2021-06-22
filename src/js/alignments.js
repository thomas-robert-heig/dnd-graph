import { PREP_CHARS } from "./prepare.js";
import { select, scaleLinear, max } from "d3";


const cols = ['Lawful', 'Neutral', 'Chaotic'];
const rows = ['Good', 'Neutral', 'Evil'];  




//Préparation des données
let matrixData = [];
let colCounter = 0;

let ALIGN_CHARS = [];
PREP_CHARS.forEach(CHAR => {
    if (CHAR.alignment != "") {
        ALIGN_CHARS.push(CHAR);
    }
});

cols.forEach(col => {

    //Récupérer tous les personnages d'un alignment (cols) donné
    let tempArray = [];
    ALIGN_CHARS.forEach(CHAR => {
        if (CHAR.alignment.substr(0, 1) == col.substr(0, 1)) {
            tempArray.push(CHAR);
        }
    });

    //Compter le nombre de personnages d'un alignement (col) donnée ayant un certain alignement (row)
    let counter = 0;
    let rowCounter = 0;
    rows.forEach(row => {
        tempArray.forEach(CHAR => {
            if (CHAR.alignment.substr(1, 1) == row.substr(0, 1)) {
                counter++;
            }
        })

        let data = {
            y: colCounter,
            x: rowCounter,
            count: counter
        }

        counter = 0;
        rowCounter++;
        matrixData.push(data);
    })
    colCounter++;
})


//Initialisation
const margin = { top: 20, right: 20, bottom: 0, left: 80 },
	width = 700 - margin.left - margin.right,
	height = 600 - margin.top - margin.bottom;
    let gridSize = Math.floor(width / rows.length * 0.95);


//Construction du SVG
let maingroup = select('#heatmap_alignments')
    .append("svg")
    .attr("class", "svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Intégration des deux axes
let raceLabels = maingroup.selectAll(".raceLabel")
    .data(cols)
    .enter().append("text")
    .text(function (d) { return d; })
    .attr("x", 0)
    .attr("y", function (d, i) { return i * gridSize; })
    .attr("transform", "translate(-6," + gridSize / 2 + ")")
    .style("text-anchor", "end");

var classLabels = maingroup.selectAll(".classLabel")
    .data(rows)
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

let colorScale = scaleLinear()
    .domain([0, max(matrixData, function (d) { return d.count; }) / 2, max(matrixData, function (d) { return d.count; })])
    .range(["#F1D7FE", "#A384B1", "#6C447E"]);

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