/* libs */
import figlet from "figlet";
import chalk from "chalk";
import fs from "fs";

/* files */
import pkg from "../../package.json";

/* utils */
import { resolveRealPath } from "@/utils/extras";

/* constants */
import { DEVMODE, FONT_PATH } from "@/constants";

// ==============================

const fontSource = DEVMODE ? FONT_PATH : resolveRealPath(FONT_PATH);
const font = fs.readFileSync(fontSource, "utf8");
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
