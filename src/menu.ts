/* libs */
import inquirer from "inquirer";
import * as emoji from "node-emoji";
import chalk from "chalk";

// ==============================

export function menuPrompt(checkResult: object[]) {
	checkResult.push(
		new inquirer.Separator("=========================================="),
		{
			name: chalk.yellow(`${emoji.get("sparkles")} clean output folder`),
			value: "cleaner",
		},
		{
			name: chalk.red(`${emoji.get("door")} exit`),
			value: "exit",
		},
	);

	const menu_prompt = [
		{
			type: "list",
			name: "menu",
			message: chalk.green("What do you want to do ..."),
			loop: false,
			pageSize: 15,
			choices: checkResult,
		},
	];

	return menu_prompt;
}
