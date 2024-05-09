/* libs */
import sharp from "sharp";
import chalk from "chalk";
import * as emoji from "node-emoji";

/* core */
import { restart } from "@/core/restart";

/* utils */
import { getImageFilesByExtension } from "@/utils/extras";

/* constants */
import { INPUT_IMAGES_PATH, OUTPUT_IMAGES_PATH } from "@/constants";

/* types */
import { T_SharpExtension } from "@/@types";

// ==============================

async function sharpCompress(
	files: string[],
	qualityValue: number,
	extension: T_SharpExtension,
): Promise<void> {
	const successMessage = (file: string) => {
		console.log(
			chalk.green(`${emoji.get("framed_picture")} ${file} minified ... [done]`),
		);
	};
	const errorMessage = (error: Error) => {
		throw new Error(`[error]: minification failed: \n${error}`);
	};

	return new Promise((resolve, reject) => {
		for (const file of files) {
			if (extension === "jpeg" || extension === "jpg") {
				sharp(`${INPUT_IMAGES_PATH}/${file}`)
					.jpeg({ quality: qualityValue })
					.toFile(`${OUTPUT_IMAGES_PATH}/${file}`, (error) => {
						error ? reject(errorMessage(error)) : resolve(successMessage(file));
					});
			}
			if (extension === "png") {
				sharp(`${INPUT_IMAGES_PATH}/${file}`)
					.png({ quality: qualityValue })
					.toFile(`${OUTPUT_IMAGES_PATH}/${file}`, (error) => {
						error ? reject(errorMessage(error)) : resolve(successMessage(file));
					});
			}
			if (extension === "webp") {
				sharp(`${INPUT_IMAGES_PATH}/${file}`)
					.webp({ quality: qualityValue })
					.toFile(`${OUTPUT_IMAGES_PATH}/${file}`, (error) => {
						error ? reject(errorMessage(error)) : resolve(successMessage(file));
					});
			}
		}
	});
}

export async function minImages(level: number = 50): Promise<void> {
	try {
		const JPEG_files = [
			...(await getImageFilesByExtension("jpg")),
			...(await getImageFilesByExtension("jpeg")),
		];
		const PNG_files = await getImageFilesByExtension("png");
		const WEBP_files = await getImageFilesByExtension("webp");

		console.log("Starting minification ...");

		if (JPEG_files.length > 0) await sharpCompress(JPEG_files, level, "jpeg");
		if (PNG_files.length > 0) await sharpCompress(PNG_files, level, "png");
		if (WEBP_files.length > 0) await sharpCompress(WEBP_files, level, "webp");

		restart();
	} catch (error) {
		throw new Error(
			`[error]: an error occurred during minification process: \n${error}`,
		);
	}
}
