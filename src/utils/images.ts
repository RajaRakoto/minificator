import sharp from "sharp";

/* constants */
import { INPUT_IMAGES_PATH, OUTPUT_MIN_IMAGES_PATH } from "@/constants";

/* utils */
import { readDirAsync } from "@/utils/extras";

/* types */
import { T_ImageExtension, T_SharpExtension } from "@/@types";

// ==============================

/**
 * @description A function to get image file names with a specific extension from a directory
 * @param extension The desired file extension ("jpg", "jpeg", "png", "webp", "gif", "svg")
 */
export async function getImageFilesByExtension(
	extension: T_ImageExtension,
): Promise<string[]> {
	try {
		const files = await readDirAsync(INPUT_IMAGES_PATH);
		const imageFiles = files.filter((file) =>
			new RegExp(`\\.${extension}$`, "i").test(file),
		);
		return imageFiles;
	} catch (error) {
		throw new Error(`[error]: error during getting image files: \n${error}`);
	}
}

/**
 * @description A function to get all image file ("jpg", "jpeg", "png", "webp") names from a directory
 */
export async function getAllImageFiles(): Promise<string[]> {
	try {
		const files = await readDirAsync(INPUT_IMAGES_PATH);
		const imageFiles = files.filter((file) =>
			/\.(jpg|jpeg|png|webp)$/i.test(file),
		);
		return imageFiles;
	} catch (error) {
		throw new Error(
			`[error]: error during getting all image files: \n${error}`,
		);
	}
}

/**
 * @description A function to test if a file is an image ("jpg", "jpeg", "png", "webp")
 * @param file The file to test
 */
export function isImage(file: string): boolean {
	return /\.(jpg|jpeg|png|webp)$/i.test(file);
}

/**
 * @description A function to test sharp image minification
 * @param file Image file to test
 * @param qualityValue Level of compression
 * @param extension Image extension available in sharp
 */
export function sharpTest(
	file: string,
	qualityValue: number,
	extension: T_SharpExtension,
): void {
	const input = `${INPUT_IMAGES_PATH}/${file}`;
	const output = `${OUTPUT_MIN_IMAGES_PATH}/${file}`;

	if (extension === "jpeg" || extension === "jpg") {
		sharp(input)
			.jpeg({ quality: qualityValue })
			.toFile(output, (error) => {
				if (error) {
					throw new Error(`[error]: JPEG -> sharp test failed: \n${error}`);
				} else {
					console.log("JPEG -> sharp test successful !");
				}
			});
	}
	if (extension === "png") {
		sharp(input)
			.png({ quality: qualityValue })
			.toFile(output, (error) => {
				if (error) {
					throw new Error(`[error]: PNG -> sharp test failed: \n${error}`);
				} else {
					console.log("PNG -> sharp test successful !");
				}
			});
	}
	if (extension === "webp") {
		sharp(input)
			.webp({ quality: qualityValue })
			.toFile(output, (error) => {
				if (error) {
					throw new Error(`[error]: WEBP -> sharp test failed: \n${error}`);
				} else {
					console.log("WEBP -> sharp test successful !");
				}
			});
	}
}
