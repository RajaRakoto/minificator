/* libs */
import inquirer from "inquirer";
import chalk from "chalk";
import * as emoji from "node-emoji";

/* constants */
import { SUPPORTED_ALL_IMAGES_EXTENSIONS } from "@/constants";

/* utils */
import { getAllImageFilesAsync } from "@/utils/images";
import { getAllPdfFilesAsync } from "@/utils/pdf";

// ==============================

export async function checkerAsync(): Promise<object[]> {
	const menu: object[] = [];

	const getMenu = (
		name: string,
		value: string,
		missingMessage: string,
		available: boolean,
	) => {
		return {
			name: `${emoji.get(available ? "wrench" : "weary")} ${available ? name : chalk.gray(name + " - " + missingMessage)}`,
			value: value,
		};
	};

	// get all supported files
	const imagesData = await getAllImageFilesAsync(
		SUPPORTED_ALL_IMAGES_EXTENSIONS,
	);
	const pdfData = await getAllPdfFilesAsync();

	// check if supported files are available
	const imagesAvailable = imagesData.length > 0;
	const pdfAvailable = pdfData.length > 0;

	menu.push(
		new inquirer.Separator("================= images ================="),
		getMenu(
			"Minify JPEG | PNG | WEBP",
			`${imagesAvailable ? "min-images" : ""}`,
			`${imagesAvailable ? "" : "no image file founded"}`,
			imagesAvailable ? true : false,
		),
		getMenu(
			"Resize JPEG | PNG | WEBP",
			`${imagesAvailable ? "resize-images" : ""}`,
			`${imagesAvailable ? "" : "no image file founded"}`,
			imagesAvailable ? true : false,
		),
		new inquirer.Separator("================== pdf ==================="),
		getMenu(
			"Minify PDF",
			`${pdfAvailable ? "min-pdf" : ""}`,
			`${pdfAvailable ? "" : "no pdf file founded"}`,
			pdfAvailable ? true : false,
		),
	);

	return menu;
}
