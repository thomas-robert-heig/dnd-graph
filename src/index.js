/********************************
 * Preparation
 ********************************/

/* Import & Settings
 ********************************/
import "./index.css";
import { select, sum, scaleLinear, max } from "d3";
import "./js/classRace";
import "./js/attributes";
import "./js/skills";
import "./js/spells";

/* Define canvas
 ********************************/
const canvas = select("#graph")
	.append("svg")
	.attr("width", 500)
	.attr("height", 500)
	.append("g")
	.attr("transform", "translate(40,0)");
