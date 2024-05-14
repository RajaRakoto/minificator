/* libs */
import inquirer from "inquirer";
import sharp from "sharp";
import chalk from "chalk";
import * as emoji from "node-emoji";

/* core */
import { restart } from "@/core/restart";

/* utils */
import { createDirectoryAsync } from "@/utils/extras";
import { getAllImageFilesAsync } from "@/utils/images";

/* constants */
import { INPUT_IMAGES_PATH, OUTPUT_MIN_IMAGES_PATH } from "@/constants";

/* types */
import { T_SharpExtension } from "@/@types";

// ==============================

const extension_prompt = [
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

export async function minImages(): Promise<void> {
	try {
		const extension_answers = await inquirer.prompt(extension_prompt);
		const quality_answers = await inquirer.prompt(quality_prompt);
		const level = quality_answers.quality;

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

		// Check if there are images to minify
		if (
			JPEG_files.length === 0 &&
			PNG_files.length === 0 &&
			WEBP_files.length === 0
		) {
			console.log(chalk.yellow("No images found to minify !"));
		} else {
			console.log("Starting minification ...");
			await createDirectoryAsync(OUTPUT_MIN_IMAGES_PATH);
		}

		// Start minification process
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
