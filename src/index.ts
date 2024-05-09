/* libs */
import inquirer from "inquirer";
import { Command } from "commander";

/* menu */
import { menu_prompt } from "@/menu";

/* core */
import { minImages } from "@/core/images";

/* utils */
import { bannerRenderer } from "@/utils/ascii";
import { exitCLI } from "@/utils/extras";

/* files */
import pkg from "../package.json";

// ==============================

/**
 * @description Entry point of the CLI
 */
export async function minificatorCLI(): Promise<void> {
	// show banner
	const banner = await bannerRenderer("minificator", `${pkg.description}`);
	console.log(`${banner}\n`);

	// start menu
	const menu_answers = await inquirer.prompt(menu_prompt);

	// switch menu
	switch (menu_answers.menu) {
		case "min-images":
			minImages();
			break;
		case "exit":
			exitCLI();
			break;
		default:
			minificatorCLI();
			break;
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
