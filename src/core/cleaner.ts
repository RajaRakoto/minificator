/* libs */
import inquirer from "inquirer";
import chalk from "chalk";

/* core */
import { restartAsync } from "@/core/restart";

/* utils */
import { fileExistsAsync, rmdirAsync } from "@/utils/extras";

/* constants */
import { OUTPUT_ROOT_PATH } from "@/constants";

// ==============================

const cleaner_prompt = [
	{
		type: "confirm",
		name: "cleaner",
		message: chalk.yellow("Do you want to clean the output folder ?"),
		default: false,
	},
];

export async function cleanerAsync(): Promise<void> {
	try {
		const cleaner_answers = await inquirer.prompt(cleaner_prompt);
		const outputCheck = await fileExistsAsync(OUTPUT_ROOT_PATH);

		if (cleaner_answers.cleaner && outputCheck) {
			await rmdirAsync(OUTPUT_ROOT_PATH, { recursive: true });
			console.log(chalk.green("Output folder cleaned ... [done]"));
		} else if (!outputCheck && cleaner_answers.cleaner) {
			console.log(chalk.yellow("Output folder not found !"));
		}

		restartAsync();
	} catch (error) {
		throw new Error(
			`[error]: an error occurred during cleaning process: \n${error}`,
		);
	}
}
