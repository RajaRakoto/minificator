/* libs */
import inquirer from "inquirer";
import chalk from "chalk";

/* index */
import { myCLI } from "@/index";

/* utils */
import { exitCLI } from "@/utils/extras";

/* types */
import type { Ora } from "ora";

// ==============================

const restart_prompt = [
	{
		type: "confirm",
		name: "restart",
		message: chalk.gray("Return to main menu ?"),
		default: true,
	},
];

export async function restartAsync(spinner?: Ora): Promise<void> {
	if (spinner) spinner.stop();
	const restart_answers = await inquirer.prompt(restart_prompt);
	if (restart_answers.restart) {
		myCLI();
	} else {
		exitCLI();
	}
}
