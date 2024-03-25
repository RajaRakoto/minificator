/* libs */
import figlet from "figlet";
import chalk from "chalk";
import fs from "fs";

/* files */
import pkg from "../../package.json";

/* constants */
import { DEVMODE } from "@/constants";

/* utils */
import { resolveRealPath } from "@/utils/extras";

// ==============================

const fontPath = DEVMODE
	? "./fonts/Standard.flf"
	: resolveRealPath("./fonts/Standard.flf");
const font = fs.readFileSync(fontPath, "utf8");
figlet.parseFont("StandardFont", font);

/**
 * @description A function that renders a title + description as a banner using figlet ASCII art
 * @param title The title to render
 * @param description The description to render
 */
export async function bannerRenderer(
	title: string,
	description: string,
): Promise<string> {
	try {
		const rendered = await figlet.textSync(title, {
			font: "StandardFont" as figlet.Fonts,
		});
		const coloredBanner = chalk.cyan(rendered);
		const packageVersion = pkg.version;
		const result = `${coloredBanner}\n ${chalk.underline("version:")} ${packageVersion}\n\n ${description}`;
		return result;
	} catch (error) {
		console.error("An error occurred while rendering the banner:", error);
		console.dir(error);
		return "";
	}
}
