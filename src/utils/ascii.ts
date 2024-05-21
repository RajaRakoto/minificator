/* libs */
import figlet from "figlet";
import chalk from "chalk";

/* files */
import pkg from "../../package.json";

/* utils */
import { resolveRealPathAsync, readFileAsync } from "@/utils/extras";

/* constants */
import { DEVMODE, FONT_PATH } from "@/constants";

// ==============================

/**
 * @description A function that renders a title + description as a banner using figlet ASCII art
 * @param title The title to render
 * @param description The description to render
 */
export async function bannerRendererAsync(
	title: string,
	description: string,
): Promise<string> {
	const fontSource = DEVMODE
		? FONT_PATH
		: await resolveRealPathAsync(FONT_PATH);
	const font = await readFileAsync(fontSource, "utf8");
	figlet.parseFont("StandardFont", font);

	return new Promise((resolve, reject) => {
		try {
			const rendered = figlet.textSync(title, {
				font: "StandardFont" as figlet.Fonts,
			});
			const coloredBanner = chalk.red(rendered);
			const packageVersion = pkg.version;
			const result = `${coloredBanner}\n ${chalk.underline("version:")} ${packageVersion}\n\n ${description}`;
			resolve(result);
		} catch (error) {
			reject(
				`[error]: an error occurred while rendering the banner: \n${error}`,
			);
		}
	});
}
