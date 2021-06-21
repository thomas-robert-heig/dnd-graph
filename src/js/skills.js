/********************************
 * Skills graph
 ********************************/
import { PREP_CHARS } from "./prepare.js";

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

const DATA_SKILLS = getTotalSkills(PREP_CHARS);

export { DATA_SKILLS };
