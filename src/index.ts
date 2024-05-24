/* libs */
import inquirer from "inquirer";
import chalk from "chalk";
import { Command } from "commander";

/* menu */
import { menuPrompt } from "@/menu";

/* core */
import { minImagesAsync } from "@/core/min-images";
import { resizeImagesAsync } from "@/core/resize-images";
import { checkerAsync } from "@/core/checker";
import { cleanerAsync } from "./core/cleaner";

/* utils */
import { bannerRendererAsync } from "@/utils/ascii";
import { exitCLI } from "@/utils/extras";

/* files */
import pkg from "../package.json";

// ==============================

/**
 * @description Entry point of the CLI
 */
export async function minificatorCLI(): Promise<void> {
	// show banner
	const banner = await bannerRendererAsync("minificator", `${pkg.description}`);
	console.log(`${banner}\n`);

	// working directory
	console.log(`${chalk.bold("=> Working directory:")} ${process.cwd()}\n`);

	// check
	const checkResult = await checkerAsync();
	if (checkResult.length > 0) {
		const menu_answers = await inquirer.prompt(menuPrompt(checkResult));

		// switch menu
		switch (menu_answers.menu) {
			case "min-images":
				minImagesAsync();
				break;
			case "resize-images":
				resizeImagesAsync();
				break;
			case "cleaner":
				cleanerAsync();
				break;
			case "exit":
				exitCLI();
				break;
			default:
				minificatorCLI();
				break;
		}
	} else {
		console.log(
			`${chalk.yellow("No supported files found in the working directory !")}`,
		);
	}
}

function args(): void {
	const packageVersion = pkg.version;
	const program = new Command();
	program.option("-v, --version", "show CLI version");
	program.parse(process.argv);
	if (program.opts().version) {
		console.log(`version ${packageVersion}`);
	} else {
		minificatorCLI();
	}
}

args();
