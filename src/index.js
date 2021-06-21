/********************************
 * Preparation
 ********************************/

/* Import & Settings
 ********************************/
import { select, axisLeft, scaleLinear, max } from "d3";
import { DATA_SKILLS } from "./js/skills";

/* Define canvas
 ********************************/
const canvas = select("#graph")
	.append("svg")
	.attr("width", 500)
	.attr("height", 500)
	.append("g")
	.attr("transform", "translate(40,0)");

console.log(DATA_SKILLS);
