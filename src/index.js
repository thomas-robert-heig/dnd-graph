/********************************
 * Preparation
 ********************************/

/* Import & Settings
 ********************************/
import { select, sum, scaleLinear, max } from "d3";
import { DATA_SKILLS } from "./js/skills";
import "./js/classRace";

/* Define canvas
 ********************************/
const canvas = select("#graph")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500)
    .append("g")
    .attr("transform", "translate(40,0)");

