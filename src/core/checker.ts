/* libs */
import inquirer from "inquirer";
import chalk from "chalk";
import * as emoji from "node-emoji";

/* constants */
import { SUPPORTED_ALL_IMAGES_EXTENSIONS } from "@/constants";

/* utils */
import { getAllImageFilesAsync } from "@/utils/images";

// ==============================

export async function checker(): Promise<object[]> {
	const result: object[] = [];

	const getMenu = (
		name: string,
		value: string,
		missingMessage: string,
		available: boolean,
	) => {
		return {
			name: `${emoji.get(available ? "wrench" : "weary")} ${available ? name : chalk.gray(name + "(" + missingMessage + ")")}`,
			value: value,
		};
	};

	const imagesData = await getAllImageFilesAsync(
		SUPPORTED_ALL_IMAGES_EXTENSIONS,
	);

	if (imagesData.length > 0) {
		result.push(
			new inquirer.Separator("================= images ================="),
			getMenu("Minify JPEG|PNG|WEBP", "min-images", "", true),
			getMenu("Resize JPEG|PNG|WEBP", "resize-images", "", true),
			getMenu("Test", "", "no test file founded", false),
		);
	}

	return result;
}
