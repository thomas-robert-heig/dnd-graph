/********************************
 * Index DND Graph
 ********************************/

/* Import & Settings
 ********************************/
import { select, axisLeft, scaleLinear, max } from "d3";
import DATA from "./dnd_chars_all.json";

const CHARS = Object.entries(DATA);

/* Define canvas
 ********************************/
const canvas = select("#graph")
	.append("svg")
	.attr("width", 500)
	.attr("height", 500)
	.append("g")
	.attr("transform", "translate(40,0)");

let getSpells = (spells) => {
	return Object.keys(spells)
		.map((key) => spells[key].processedSpell)
		.reduce((r, d) => [...r, d[0]], []);
};

let getWeapons = (weapons) => {
	return Object.keys(weapons)
		.map((key) => weapons[key].processedWeapon)
		.reduce((r, d) => [...r, d[0]], []);
};

const PREP_CHARS = CHARS.map(([nom, data]) => ({ ...data, nom }))
	.map((d) => ({
		race: d?.race.processedRace[0],
		class: Object.keys(d?.class)[0],
		skills: d?.skills,
		spells: getSpells(d?.spells),
		feats: d?.feats,
		weapons: getWeapons(d?.weapons),
		alignment: d.alignment.processedAlignment[0],
	}))
	.filter(
		(d) =>
			d.race == "Dragonborn" ||
			d.race == "Dwarf" ||
			d.race == "Elf" ||
			d.race == "Gnome" ||
			d.race == "Half-Elf" ||
			d.race == "Halfling" ||
			d.race == "Half-Orc" ||
			d.race == "Human" ||
			d.race == "Tiefling"
	)
	.filter(
		(d) =>
			d.class == "Barbarian" ||
			d.class == "Bard" ||
			d.class == "Cleric" ||
			d.class == "Druid" ||
			d.class == "Fighter" ||
			d.class == "Monk" ||
			d.class == "Paladin" ||
			d.class == "Ranger" ||
			d.class == "Rogue" ||
			d.class == "Sorcerer" ||
			d.class == "Warlock" ||
			d.class == "Wizard"
	);

// console.log(PREP_CHARS);

let getTotalSkills = (data) => {
	let totalSkills = {};

	data.forEach((character) => {
		let skills = character.skills;
		skills.forEach((skill) => {
			totalSkills[skill] = (totalSkills[skill] || 0) + 1;
		});
	});

	return totalSkills;
};

console.log(getTotalSkills(PREP_CHARS));

/* 
const WIDTH = 1000;
const HEIGHT = 500;
const MARGIN = 5;
const MARGIN_LEFT = 50;
const MARGIN_BOTTOM = 50;
const BAR_WIDTH = (WIDTH - MARGIN_LEFT) / DATA.length;

const svg = select("body")
	.append("svg")
	.attr("viewBox", `0 0 ${WIDTH} ${HEIGHT}`);

const yScale = scaleLinear()
	// .domain([0, max(DATA, (d) => d.abstention)])
	.range([HEIGHT - MARGIN_BOTTOM, 0]);

const g = svg.append("g").attr("transform", `translate(${MARGIN_LEFT}, 0)`);

g.selectAll("rect")
	.data(DATA)
	.enter()
	.append("rect")
	.attr("x", (d, i) => i * BAR_WIDTH)
	.attr("width", BAR_WIDTH - MARGIN)
	.attr("y", (d) => yScale(d.abstention))
	.attr("height", (d) => HEIGHT - MARGIN_BOTTOM - yScale(d.abstention))
	.attr("fill", "steelblue");

g.selectAll("text")
	.data(DATA)
	.enter()
	.append("text")
	.text((d) => d.nom)
	.attr("x", (d, i) => i * BAR_WIDTH + BAR_WIDTH / 2)
	.attr("y", HEIGHT - MARGIN_BOTTOM / 2)
	.attr("text-anchor", "middle");

const axisY = axisLeft()
	.scale(yScale)
	.tickFormat((d) => d)
	.ticks(5);

svg.append("g")
	.attr("transform", `translate(${MARGIN_LEFT - 3})`)
	.call(axisY);
 */
