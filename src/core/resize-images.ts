/* libs */
import inquirer from "inquirer";
import sharp from "sharp";
import chalk from "chalk";
import * as emoji from "node-emoji";

/* core */
import { restart } from "@/core/restart";

/* constants */
import {
	INPUT_IMAGES_PATH,
	OUTPUT_RESIZE_IMAGES_PATH,
	SUPPORTED_RESIZE_IMAGES_EXTENSIONS,
} from "@/constants";

/* utils */
import { createDirectoryAsync } from "@/utils/extras";
import { getAllImageFilesAsync } from "@/utils/images";

/* types */
import { T_Resolution } from "@/@types";

// ==============================

const resize_prompt = [
	{
		type: "list",
		name: "resize",
		message: "How do you want to resize images",
		choices: [
			{
				name: "Resize image from a list",
				value: "select",
			},
			{
				name: "Resize image by extension",
				value: "extension",
			},
			{
				name: "Resize image by name",
				value: "manual",
			},
		],
	},
];

const select_prompt = [
	{
		type: "checkbox",
		name: "select",
		message: "Select images to resize from the list",
		choices: await getAllImageFilesAsync(SUPPORTED_RESIZE_IMAGES_EXTENSIONS),
		validate: (answer: string): string | boolean => {
			if (answer.length < 1) {
				return "You must choose at least one image !";
			}
			return true;
		},
	},
];

const extension_prompt = [
	{
		type: "checkbox",
		name: "extension",
		message: "Select image extensions to resize",
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

const manual_prompt = [
	{
		type: "input",
		name: "manual",
		message: "Enter the file name to resize",
		validate: async (answer: string): Promise<string | boolean> => {
			const data = await getAllImageFilesAsync(
				SUPPORTED_RESIZE_IMAGES_EXTENSIONS,
			);
			if (answer.length < 1) {
				return "You must enter a file name !";
			} else if (!data.includes(answer)) {
				return "The file name does not exist, is not an image or is not supported !";
			}
			return true;
		},
	},
];

const resolutionPrompt = (type: T_Resolution): object => {
	const resolution_prompt = [
		{
			type: "number",
			name: type,
			message: `Enter the ${type} (px)`,
			validate: (answer: number): string | boolean => {
				if (answer < 16) {
					return `The ${type} must be greater than 16px !`;
				}
				if (type === "width" && answer > 3840) {
					return `The ${type} must be less than 3840px !`;
				}
				if (type === "height" && answer > 2160) {
					return `The ${type} must be less than 2160px !`;
				}
				return true;
			},
		},
	];
	return resolution_prompt;
};

/**
 * @description Resize images using sharp
 * @param files List of files to resize
 * @param width Width of the image
 * @param height Height of the image
 */
async function sharpResizeAsync(
	files: string[],
	width: number,
	height: number,
): Promise<void> {
	const successMessage = (file: string) => {
		console.log(
			chalk.green(`${emoji.get("framed_picture")} ${file} resized ... [done]`),
		);
	};
	const errorMessage = (error: Error) => {
		throw new Error(`[error]: resize failed: \n${error}`);
	};

	const promises = files.map((file) => {
		const input = `${INPUT_IMAGES_PATH}/${file}`;
		const output = `${OUTPUT_RESIZE_IMAGES_PATH}/${file}`;

		return new Promise<void>((resolve, reject) => {
			const transform = sharp(input).resize(width, height);
			transform.toFile(`${output}`, (error) => {
				if (error) {
					reject(errorMessage(error));
				} else {
					successMessage(file);
					resolve();
				}
			});
		});
	});

	await Promise.all(promises);
}

export async function resizeImagesAsync(): Promise<void> {
	try {
		const resize_answers = await inquirer.prompt(resize_prompt);

		if (resize_answers.resize === "select") {
			const select_answers = await inquirer.prompt(select_prompt);
			const width_answers = await inquirer.prompt(resolutionPrompt("width"));
			const height_answers = await inquirer.prompt(resolutionPrompt("height"));

			if (select_answers.select.length === 0) {
				console.log(chalk.yellow("No images selected to resize !"));
			} else {
				console.log("Starting resizing ...");
				await createDirectoryAsync(OUTPUT_RESIZE_IMAGES_PATH);
				await sharpResizeAsync(
					select_answers.select,
					width_answers.width,
					height_answers.height,
				);
			}
		}

		if (resize_answers.resize === "extension") {
			const extension_answers = await inquirer.prompt(extension_prompt);
			const width_answers = await inquirer.prompt(resolutionPrompt("width"));
			const height_answers = await inquirer.prompt(resolutionPrompt("height"));

			let JPEG_files: string[] = [];
			let PNG_files: string[] = [];
			let WEBP_files: string[] = [];

			// Get all image files by extension
			if (extension_answers.extension.includes("jpeg")) {
				JPEG_files = await getAllImageFilesAsync(["jpg", "jpeg"]);
			}
			if (extension_answers.extension.includes("png"))
				PNG_files = await getAllImageFilesAsync(["png"]);
			if (extension_answers.extension.includes("webp"))
				WEBP_files = await getAllImageFilesAsync(["webp"]);

			// Check if there are images to resize
			if (
				JPEG_files.length === 0 &&
				PNG_files.length === 0 &&
				WEBP_files.length === 0
			) {
				console.log(chalk.yellow("No images found to resize !"));
			} else {
				console.log("Starting resizing ...");
				await createDirectoryAsync(OUTPUT_RESIZE_IMAGES_PATH);
			}

			// Start resizing process
			if (JPEG_files.length > 0)
				await sharpResizeAsync(
					JPEG_files,
					width_answers.width,
					height_answers.height,
				);
			if (PNG_files.length > 0)
				await sharpResizeAsync(
					PNG_files,
					width_answers.width,
					height_answers.height,
				);
			if (WEBP_files.length > 0)
				await sharpResizeAsync(
					WEBP_files,
					width_answers.width,
					height_answers.height,
				);
		}

		if (resize_answers.resize === "manual") {
			const manual_answers = await inquirer.prompt(manual_prompt);
			const width_answers = await inquirer.prompt(resolutionPrompt("width"));
			const height_answers = await inquirer.prompt(resolutionPrompt("height"));

			if (manual_answers.manual.length === 0) {
				console.log(chalk.yellow("No images selected to resize !"));
			} else {
				console.log("Starting resizing ...");
				await createDirectoryAsync(OUTPUT_RESIZE_IMAGES_PATH);
				await sharpResizeAsync(
					[manual_answers.manual],
					width_answers.width,
					height_answers.height,
				);
			}
		}

		restart();
	} catch (error) {
		throw new Error(
			`[error]: an error occurred during resizing process: \n${error}`,
		);
	}
}
