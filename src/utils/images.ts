/* libs */
import sharp from "sharp";
import { optimize } from "svgo";

/* constants */
import { INPUT_IMAGES_PATH, OUTPUT_MIN_IMAGES_PATH } from "@/constants";

/* utils */
import {
	readDirAsync,
	readFromFileAsync,
	writeToFileAsync,
} from "@/utils/extras";

/* types */
import { T_ImageExtension, T_SharpExtension } from "@/@types";

// ==============================

/**
 * @description A function to get all image file names from a directory based on specified extensions
 * @param extensions An array of file extensions to retrieve
 */
export async function getAllImageFilesAsync(
	extensions: T_ImageExtension[],
): Promise<string[]> {
	try {
		const files = await readDirAsync(INPUT_IMAGES_PATH);
		const imageFiles: string[] = [];
		files.forEach((file) => {
			const fileExtension = file.split(".").pop()?.toLowerCase();
			if (
				fileExtension &&
				extensions.includes(fileExtension as T_ImageExtension)
			) {
				imageFiles.push(file);
			}
		});
		return imageFiles;
	} catch (error) {
		throw new Error(
			`[error]: error during getting all image files: \n${error}`,
		);
	}
}

/**
 * @description A function to get filtered image file names based on specified extensions
 * @param images An array of image file names to filter
 * @param extensions An array of file extensions to filter by
 */
export async function getFilteredImageFilesAsync(
	images: string[],
	extensions: T_ImageExtension[],
): Promise<string[]> {
	try {
		const filteredImagesFile = images.filter((image) => {
			const fileExtension = image.split(".").pop()?.toLowerCase();
			return (
				fileExtension && extensions.includes(fileExtension as T_ImageExtension)
			);
		});
		return filteredImagesFile;
	} catch (error) {
		throw new Error(`[error]: error during filtering image files: \n${error}`);
	}
}

/**
 * @description A function to check the existence of image files with specified extensions
 * @param images An array of image file names to check
 * @param extensions An array of file extensions to check against
 */
export async function isExistedImageFilesByExtensionAsync(
	images: string[],
	extensions: T_ImageExtension[],
): Promise<boolean> {
	try {
		const extensionsLowerCase = extensions.map((ext) => ext.toLowerCase());
		const exists = images.some((image) => {
			const fileExtension = image.split(".").pop()?.toLowerCase();
			return (
				fileExtension &&
				extensionsLowerCase.includes(fileExtension as T_ImageExtension)
			);
		});
		return exists;
	} catch (error) {
		throw new Error(
			`[error]: error during checking existence of image files: \n${error}`,
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
export async function sharpTestAsync(
	file: string,
	qualityValue: number,
	extension: T_SharpExtension,
): Promise<void> {
	const input = `${INPUT_IMAGES_PATH}/${file}`;
	const output = `${OUTPUT_MIN_IMAGES_PATH}/${file}`;

	if (extension === "jpeg" || extension === "jpg") {
		await sharp(input)
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
		await sharp(input)
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
		await sharp(input)
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

/**
 * @description A function to test svgo image minification
 */
export async function svgGoTestAsync() {
	try {
		const svgCompress = await optimize(
			await readFromFileAsync(`${INPUT_IMAGES_PATH}/test.svg`),
			{
				multipass: true,
			},
		);

		await writeToFileAsync(
			`${OUTPUT_MIN_IMAGES_PATH}/test.svg`,
			svgCompress.data,
			"SVG -> svgo test successful !",
		);
	} catch (error) {
		throw new Error(`[error]: error during SVGgo compression: \n${error}`);
	}
}
