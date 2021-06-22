/********************************
 * Data preparation
 ********************************/
import DATA from "../dnd_chars_all.json";
const CHARS = Object.entries(DATA);
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
		attributes : d.attributes
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

	console.log(PREP_CHARS);
export { PREP_CHARS };
