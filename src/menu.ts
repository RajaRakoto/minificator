import inquirer from "inquirer";
import chalk from "chalk";
import * as emoji from "node-emoji";

// ==============================

export const menu_prompt = [
	{
		type: "list",
		name: "menu",
		message: chalk.green("What do you want to do ..."),
		loop: false,
		pageSize: 15,
		choices: [
			new inquirer.Separator("=============== option list =============="),
			{
				name: `${emoji.get("wrench")} Minify all images (jpg, png, svg, gif)`,
				value: "min-images",
			},
			new inquirer.Separator("=========================================="),
			{
				name: chalk.red(`${emoji.get("door")} exit`),
				value: "exit",
			},
		],
	},
];
