/* libs */
import inquirer from "inquirer";
import sharp from "sharp";
import chalk from "chalk";
import * as emoji from "node-emoji";

/* core */
import { restart } from "@/core/restart";

/* constants */
import { INPUT_IMAGES_PATH, OUTPUT_RESIZE_IMAGES_PATH } from "@/constants";

/* utils */
import { createDirectory } from "@/utils/extras";
import { getAllImageFiles } from "@/utils/images";

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
				name: "Select images to resize from list",
				value: "select",
			},
			{
				name: "Enter file name to resize",
				value: "manual",
			},
		],
	},
];

const select_prompt = [
	{
		type: "checkbox",
		name: "select",
		message: "Select images to resize",
		choices: await getAllImageFiles(),
		validate: (answer: string): string | boolean => {
			if (answer.length < 1) {
				return "You must choose at least one image !";
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
			const data = await getAllImageFiles();
			if (answer.length < 1) {
				return "You must enter a file name !";
			} else if (!data.includes(answer)) {
				return "The file name does not exist or is not an image !";
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
			message: `Enter the ${type} of the image (px)`,
			validate: (answer: number): string | boolean => {
				if (answer < 16) {
					return `The ${type} must be greater than 16px !`;
				}
				return true;
			},
		},
	];
	return resolution_prompt;
};

async function sharpResize(
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

export async function resizeImages(): Promise<void> {
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
				await createDirectory(OUTPUT_RESIZE_IMAGES_PATH);
				await sharpResize(
					select_answers.select,
					width_answers.width,
					height_answers.height,
				);
			}
		}

		if (resize_answers.resize === "manual") {
			const manual_answers = await inquirer.prompt(manual_prompt);
			const width_answers = await inquirer.prompt(resolutionPrompt("width"));
			const height_answers = await inquirer.prompt(resolutionPrompt("height"));

			if (manual_answers.manual.length === 0) {
				console.log(chalk.yellow("No images selected to resize !"));
			} else {
				console.log("Starting resizing ...");
				await createDirectory(OUTPUT_RESIZE_IMAGES_PATH);
				await sharpResize(
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
