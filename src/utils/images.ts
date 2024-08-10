/* libs */
import sharp from "sharp";

/* constants */
import { INPUT_FILES_PATH, OUTPUT_MIN_IMAGES_PATH } from "@/constants";

/* utils */
import { readDirAsync } from "@/utils/extras";

/* types */
import type { T_ImageExtension, T_SharpExtension } from "@/@types";

// ==============================

/**
 * @description A function to get all image file names from a directory based on specified extensions
 * @param extensions An array of file extensions to retrieve
 */
export async function getAllImageFilesAsync(
	extensions: T_ImageExtension[],
): Promise<string[]> {
	try {
		const files = await readDirAsync(INPUT_FILES_PATH);
		const imageFiles: string[] = [];
		for (const file of files) {
			const fileExtension = file.split(".").pop()?.toLowerCase();
			if (
				fileExtension &&
				extensions.includes(fileExtension as T_ImageExtension)
			) {
				imageFiles.push(file);
			}
		}
		return imageFiles;
	} catch (error) {
		throw new Error(
			`[error]: error during getting all image files: \n${error}`,
		);
	}
}

/**
 * @description A function to asynchronously get filtered image file names based on specified extensions
 * @param images An array of image file names to filter
 * @param extensions An array of file extensions to filter by
 */
export async function getFilteredImageFilesAsync(
	images: string[],
	extensions: T_ImageExtension[],
): Promise<string[]> {
	return new Promise((resolve, reject) => {
		try {
			const filteredImagesFile = images.filter((image) => {
				const fileExtension = image.split(".").pop()?.toLowerCase();
				return (
					fileExtension &&
					extensions.includes(fileExtension as T_ImageExtension)
				);
			});
			resolve(filteredImagesFile);
		} catch (error) {
			reject(
				new Error(`[error]: error during filtering image files: \n${error}`),
			);
		}
	});
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
	return new Promise((resolve, reject) => {
		try {
			const extensionsLowerCase = extensions.map((ext) => ext.toLowerCase());
			const exists = images.some((image) => {
				const fileExtension = image.split(".").pop()?.toLowerCase();
				return (
					fileExtension &&
					extensionsLowerCase.includes(fileExtension as T_ImageExtension)
				);
			});
			resolve(exists);
		} catch (error) {
			reject(
				new Error(
					`[error]: error during checking existence of image files: \n${error}`,
				),
			);
		}
	});
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
	const input = `${INPUT_FILES_PATH}/${file}`;
	const output = `${OUTPUT_MIN_IMAGES_PATH}/${file}`;

	if (extension === "jpeg" || extension === "jpg") {
		await sharp(input)
			.jpeg({ quality: qualityValue })
			.toFile(output, (error) => {
				if (error) {
					throw new Error(`[error]: JPEG -> sharp test failed: \n${error}`);
				}
				console.log("JPEG -> sharp test successful !");
			});
	}
	if (extension === "png") {
		await sharp(input)
			.png({ quality: qualityValue })
			.toFile(output, (error) => {
				if (error) {
					throw new Error(`[error]: PNG -> sharp test failed: \n${error}`);
				}
				console.log("PNG -> sharp test successful !");
			});
	}
	if (extension === "webp") {
		await sharp(input)
			.webp({ quality: qualityValue })
			.toFile(output, (error) => {
				if (error) {
					throw new Error(`[error]: WEBP -> sharp test failed: \n${error}`);
				}
				console.log("WEBP -> sharp test successful !");
			});
	}
}
