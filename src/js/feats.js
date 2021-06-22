/********************************
 * feat graph
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

/* Prepare feat data
 ********************************/
let getTotalFeat = (data) => {
	let totalFeat = {};

	// Count total taken feat
	data.forEach((character) => {
		let feat = character.feats;
		feat.forEach((skill) => {
			totalFeat[skill] = (totalFeat[skill] || 0) + 1;
		});
	});

	// Format the data
	let preparedTotalFeat = Object.entries(totalFeat).map(([key, value]) => ({
		name: key,
		value: value,
	}));

	let sortedTotalFeat = preparedTotalFeat
		.sort((a, b) => descending(a.value, b.value))
		.slice(0, 20);

	return sortedTotalFeat;
};

const DATA_FEAT = getTotalFeat(PREP_CHARS);

/* Create SVG
 ********************************/
const margin = { top: 25, right: 80, bottom: 100, left: 80 },
	width = 800 - margin.left - margin.right,
	height = 400 - margin.top - margin.bottom;

const x = scaleBand().range([0, width]).padding(0.1);
const y = scaleLinear().range([height, 0]);

x.domain(DATA_FEAT.map((d) => d.name));
y.domain([0, max(DATA_FEAT, (d) => d.value)]);

const svg = select("#bars_feat")
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

svg.append("text")
	.attr("class", "y label")
	.attr("text-anchor", "end")
	.attr("y", 1)
	.attr("dy", ".75em")
	.attr("transform", "rotate(-90) translate(-20,-70)")
	.text("Nbr. de fois que la compétence a été sélectionnée");

svg.selectAll(".node")
	.data(DATA_FEAT)
	.enter()
	.append("rect")
	.style("fill", "#a591de")
	.attr("x", (d) => x(d.name))
	.attr("width", x.bandwidth())
	.attr("y", (d) => y(d.value))
	.attr("height", (d) => height - y(d.value));
