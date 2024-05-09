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
	console.log("Starting compression ...\n");

	for (const file of files) {
		await sharp(`${INPUT_IMAGES_PATH}/${file}`)
			[extension]({ quality: qualityValue })
			.toFile(`${OUTPUT_IMAGES_PATH}/${file}`, (error) => {
				if (error) {
					throw new Error(`[error]: compression failed: \n${error}`);
				} else {
					console.log(
						chalk.green(
							`${emoji.get("framed_picture")} ${file} compressed ... [done]`,
						),
					);
				}
			});
	}
}

export async function minImages(): Promise<void> {
	const JPEG_files = [
		...(await getImageFilesByExtension("jpg")),
		...(await getImageFilesByExtension("jpeg")),
	];
	// const PNG_files = await getImageFilesByExtension("png");
	// const WEBP_files = await getImageFilesByExtension("webp");

	if (JPEG_files.length > 0) {
		await sharpCompress(JPEG_files, 50, "jpeg");
	}

	// if (PNG_files.length > 0) {
	// 	await sharpCompress(PNG_files, 50, "png");
	// }

	// if (WEBP_files.length > 0) {
	// 	await sharpCompress(WEBP_files, 50, "webp");
	// }

	restart();
}
