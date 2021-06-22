/********************************
 * Spells graph
 ********************************/
import { PREP_CHARS } from "./prepare.js";
import {
	select,
	scaleBand,
	scaleLinear,
	axisLeft,
	axisBottom,
	max,
	descending,
} from "d3";

/* Prepare spells data
 ********************************/
let getTotalSpells = (data) => {
	let totalSpells = {};

	// Count total taken spells
	data.forEach((character) => {
		let spells = character.spells;
		spells.forEach((skill) => {
			totalSpells[skill] = (totalSpells[skill] || 0) + 1;
		});
	});

	// Format the data
	let preparedTotalSpells = Object.entries(totalSpells).map(
		([key, value]) => ({
			name: key,
			value: value,
		})
	);

	let sortedTotalSpells = preparedTotalSpells
		.slice()
		.sort((a, b) => descending(a.value, b.value));

	return sortedTotalSpells;
};

const DATA_SPELLS = getTotalSpells(PREP_CHARS);

console.log(DATA_SPELLS);

/* Create SVG
 ********************************/
const margin = { top: 25, right: 80, bottom: 100, left: 40 },
	width = 800 - margin.left - margin.right,
	height = 400 - margin.top - margin.bottom;

const x = scaleBand().range([0, width]).padding(0.1);
const y = scaleLinear().range([height, 0]);

x.domain(DATA_SPELLS.map((d) => d.name));
y.domain([0, max(DATA_SPELLS, (d) => d.value)]);

const svg = select("#bars_spells")
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
	.attr("transform", "translate(0," + height + ")")
	.call(axisBottom(x).tickSize(0))
	.selectAll("text")
	.style("text-anchor", "end")
	.attr("dx", "-.8em")
	.attr("dy", ".15em")
	.attr("transform", "rotate(-65)");

svg.append("g").call(axisLeft(y).ticks(6));

svg.selectAll(".node")
	.data(DATA_SPELLS)
	.enter()
	.append("rect")
	.style("fill", "#e3ce5d")
	.attr("x", (d) => x(d.name))
	.attr("width", x.bandwidth())
	.attr("y", (d) => y(d.value))
	.attr("height", (d) => height - y(d.value));
