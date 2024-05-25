/* libs */
import inquirer from "inquirer";
import sharp from "sharp";

/* core */
import { restartAsync } from "@/core/restart";

/* constants */
import {
	INPUT_IMAGES_PATH,
	OUTPUT_MIN_IMAGES_PATH,
	SUPPORTED_MIN_IMAGES_EXTENSIONS,
} from "@/constants";

/* utils */
import {
	createDirectoryAsync,
	successMessage,
	errorMessage,
} from "@/utils/extras";
import {
	getAllImageFilesAsync,
	getFilteredImageFilesAsync,
	isExistedImageFilesByExtensionAsync,
} from "@/utils/images";

/* types */
import { T_SharpExtension } from "@/@types";

// ==============================

const min_images_prompt = [
	{
		type: "list",
		name: "minify",
		message: "How do you want to minify images",
		choices: [
			{
				name: "Minify image from a list",
				value: "select",
			},
			{
				name: "Minify image by extension",
				value: "extension",
			},
			{
				name: "Minify image by name",
				value: "manual",
			},
		],
	},
];

const select_min_images_prompt = [
	{
		type: "checkbox",
		name: "select",
		message: "Select images to minify from the list",
		choices: await getAllImageFilesAsync(SUPPORTED_MIN_IMAGES_EXTENSIONS),
		validate: (answer: string): string | boolean => {
			if (answer.length < 1) {
				return "You must choose at least one image !";
			}
			return true;
		},
	},
];

const extension_min_images_prompt = [
	{
		type: "checkbox",
		name: "extension",
		message: "Select image extensions to minify",
		choices: [
			{
				name: "JPEG",
				value: "jpeg",
			},
			{
				name: "PNG",
				value: "png",
			},
			{
				name: "WEBP",
				value: "webp",
			},
		],
		validate: (answer: string): string | boolean => {
			if (answer.length < 1) {
				return "You must choose at least one extension !";
			}
			return true;
		},
	},
];

const manual_min_images_prompt = [
	{
		type: "input",
		name: "manual",
		message: "Enter the file name to minify",
		validate: async (answer: string): Promise<string | boolean> => {
			const data = await getAllImageFilesAsync(SUPPORTED_MIN_IMAGES_EXTENSIONS);
			if (answer.length < 1) {
				return "You must enter a file name !";
			} else if (!data.includes(answer)) {
				return "The file name does not exist, is not an image or is not supported !";
			}
			return true;
		},
	},
];

const quality_prompt = [
	{
		type: "list",
		name: "quality",
		message: "Enter the quality level",
		choices: [
			{
				name: "High Compression > Slight Quality Loss",
				value: 30,
			},
			{
				name: "Balanced Compression > Recommended",
				value: 50,
			},
			{
				name: "Low Compression > High Quality",
				value: 70,
			},
		],
	},
];

/**
 * @description A function to minify images using sharp
 * @param files List of files to minify
 * @param qualityValue Level of compression
 * @param extension Image extension to minify
 */
async function sharpCompressAsync(
	files: string[],
	qualityValue: number,
	extension: T_SharpExtension,
): Promise<void> {
	const promises = files.map((file) => {
		const input = `${INPUT_IMAGES_PATH}/${file}`;
		const output = `${OUTPUT_MIN_IMAGES_PATH}/${file}`;

		return new Promise<void>((resolve, reject) => {
			let transform: sharp.Sharp;

			switch (extension) {
				case "jpeg":
					transform = sharp(input).jpeg({
						quality: qualityValue,
					});
					break;
				case "png":
					transform = sharp(input).png({
						quality: qualityValue + 10,
					});
					break;
				case "webp":
					transform = sharp(input).webp({
						quality: qualityValue,
					});
					break;
				default:
					reject(new Error("[error]: unsupported extension"));
					return;
			}

			transform.toFile(output, (error) => {
				if (error) {
					reject(errorMessage(error, "minify"));
				} else {
					successMessage(file, "framed_picture", "minified");
					resolve();
				}
			});
		});
	});

	await Promise.all(promises);
}

/**
 * @description Start minification process
 * @param JPEG_files Array of JPEG files
 * @param PNG_files Array of PNG files
 * @param WEBP_files Array of WEBP files
 * @param level Level of compression
 */
async function startMinProcessAsync(
	JPEG_files: string[],
	PNG_files: string[],
	WEBP_files: string[],
	level: number,
): Promise<void> {
	console.log("Starting minification ...");
	await createDirectoryAsync(OUTPUT_MIN_IMAGES_PATH);
	if (JPEG_files.length > 0)
		await sharpCompressAsync(JPEG_files, level, "jpeg");
	if (PNG_files.length > 0) await sharpCompressAsync(PNG_files, level, "png");
	if (WEBP_files.length > 0)
		await sharpCompressAsync(WEBP_files, level, "webp");
}

/**
 * @description Start minification process for manual input
 * @param manual_file A manual file name to minify
 * @param extension Image extension
 * @param level Level of compression
 */
async function startMinProcessManualAsync(
	manual_file: string,
	extension: T_SharpExtension,
	level: number,
): Promise<void> {
	console.log("Starting minification ...");
	await createDirectoryAsync(OUTPUT_MIN_IMAGES_PATH);
	if (extension === "jpeg" || extension === "jpg")
		await sharpCompressAsync([manual_file], level, "jpeg");
	if (extension === "png")
		await sharpCompressAsync([manual_file], level, "png");
	if (extension === "webp")
		await sharpCompressAsync([manual_file], level, "webp");
}

/**
 * @description A main function to minify images
 */
export async function minImagesAsync(): Promise<void> {
	try {
		const min_images_answers = await inquirer.prompt(min_images_prompt);
		const quality_answers = await inquirer.prompt(quality_prompt);
		const level = quality_answers.quality;

		let JPEG_files: string[] = [];
		let PNG_files: string[] = [];
		let WEBP_files: string[] = [];

		// === Select option ===
		if (min_images_answers.minify === "select") {
			const select_min_images_answers = await inquirer.prompt(
				select_min_images_prompt,
			);

			// Get filtered image files by extension
			if (
				await isExistedImageFilesByExtensionAsync(
					select_min_images_answers.select,
					["jpg", "jpeg"],
				)
			) {
				JPEG_files = await getFilteredImageFilesAsync(
					select_min_images_answers.select,
					["jpg", "jpeg"],
				);
				console.log("jpeg files:" + JPEG_files);
			}
			if (
				await isExistedImageFilesByExtensionAsync(
					select_min_images_answers.select,
					["png"],
				)
			) {
				PNG_files = await getFilteredImageFilesAsync(
					select_min_images_answers.select,
					["png"],
				);
			}
			if (
				await isExistedImageFilesByExtensionAsync(
					select_min_images_answers.select,
					["webp"],
				)
			) {
				WEBP_files = await getFilteredImageFilesAsync(
					select_min_images_answers.select,
					["webp"],
				);
			}

			// Start minification process
			await startMinProcessAsync(JPEG_files, PNG_files, WEBP_files, level);
		}

		//  === Extension option ===
		if (min_images_answers.minify === "extension") {
			const extension_min_images_answers = await inquirer.prompt(
				extension_min_images_prompt,
			);

			// Get all image files by extension
			if (extension_min_images_answers.extension.includes("jpeg")) {
				JPEG_files = await getAllImageFilesAsync(["jpg", "jpeg"]);
			}
			if (extension_min_images_answers.extension.includes("png"))
				PNG_files = await getAllImageFilesAsync(["png"]);
			if (extension_min_images_answers.extension.includes("webp"))
				WEBP_files = await getAllImageFilesAsync(["webp"]);

			// Start minification process
			await startMinProcessAsync(JPEG_files, PNG_files, WEBP_files, level);
		}

		// === Manual option ===
		if (min_images_answers.minify === "manual") {
			const manual_min_images_answers = await inquirer.prompt(
				manual_min_images_prompt,
			);

			const manual_file = manual_min_images_answers.manual;
			const extension = manual_file.split(".").pop() as T_SharpExtension;

			// Start minification process
			await startMinProcessManualAsync(manual_file, extension, level);
		}

		restartAsync();
	} catch (error) {
		throw new Error(
			`[error]: an error occurred during minification process: \n${error}`,
		);
	}
}
