/* libs */
import sharp from "sharp";
import chalk from "chalk";
import * as emoji from "node-emoji";

/* core */
import { restart } from "@/core/restart";

/* utils */
import { getImageFilesByExtension } from "@/utils/extras";

/* constants */
// import { INPUT_IMAGES_PATH, OUTPUT_IMAGES_PATH } from "@/constants";

/* types */
// import { T_SharpImage } from "@/@types";

// ==============================

async function sharpJPG(qualityValue: number): Promise<void> {
	const files = ["input-onlinejpgtools.jpg", "test.jpeg", "test.JPEG"];
	console.log("Starting compression ...\n");

	for (const file of files) {
		await sharp(`./tests/${file}`)
			.jpeg({ quality: qualityValue })
			.toFile(`./tests/minificator/images/${file}`, (error) => {
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
		await sharpJPG(50);
	}

	// if (PNG_files.length > 0) {
	// 	await sharpCompress(PNG_files, 50, "png");
	// }

	// if (WEBP_files.length > 0) {
	// 	await sharpCompress(WEBP_files, 50, "webp");
	// }

	// console.log(JPEG_files);
	restart();
}
