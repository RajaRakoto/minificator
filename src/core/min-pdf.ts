/* libs */
import inquirer from "inquirer";
import { compress } from "compress-pdf";

/* core */
import { restartAsync } from "@/core/restart";

/* constants */
import { INPUT_FILES_PATH, OUTPUT_MIN_PDF_PATH } from "@/constants";

/* utils */
import { getAllPdfFilesAsync } from "@/utils/pdf";
import {
	createDirectoryAsync,
	writeFileAsync,
	successMessage,
	errorMessage,
} from "@/utils/extras";

// ==============================

const min_pdf_prompt = [
	{
		type: "list",
		name: "minify",
		message: "How do you want to minify pdf",
		choices: [
			{
				name: "Minify pdf from a list",
				value: "select",
			},
			{
				name: "Minify pdf by name",
				value: "manual",
			},
		],
	},
];

const select_min_pdf_prompt = [
	{
		type: "checkbox",
		name: "select",
		message: "Select pdf to minify from the list",
		choices: await getAllPdfFilesAsync(),
		validate: (answer: string): string | boolean => {
			if (answer.length < 1) {
				return "You must choose at least one pdf !";
			}
			return true;
		},
	},
];

const manual_min_pdf_prompt = [
	{
		type: "input",
		name: "manual",
		message: "Enter the file name to minify",
		validate: async (answer: string): Promise<string | boolean> => {
			const data = await getAllPdfFilesAsync();
			if (answer.length < 1) {
				return "You must enter a file name !";
			} else if (!data.includes(answer)) {
				return "The file name does not exist, is not an pdf or is not supported !";
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
				value: 40,
			},
			{
				name: "Balanced Compression > Recommended",
				value: 60,
			},
			{
				name: "Low Compression > High Quality",
				value: 80,
			},
		],
	},
];

/**
 * @description A function to minify pdf using ghostscript
 * @param files List of files to minify
 * @param qualityValue Level of compression
 */
async function pdfCompressAsync(
	files: string[],
	qualityValue: number,
): Promise<void> {
	try {
		const promises = files.map(async (file) => {
			const input = `\"${INPUT_FILES_PATH}/${file}\"`;
			const output = `${OUTPUT_MIN_PDF_PATH}/${file}`;
			const buffer = await compress(input, {
				imageQuality: qualityValue,
			});

			await writeFileAsync(output, buffer);
			successMessage(file, "clipboard", "minified");
		});
		await Promise.all(promises);
	} catch (error) {
		errorMessage(error, "minify");
	}
}

/**
 * @description Start minification process
 * @param PDF_files List of pdf files to minify
 * @param level Level of compression
 */
async function startMinProcessAsync(
	PDF_files: string[],
	level: number,
): Promise<void> {
	console.log("Starting minification ...");
	await createDirectoryAsync(OUTPUT_MIN_PDF_PATH);
	await pdfCompressAsync(PDF_files, level);
}

/**
 * @description A main function to minify pdf
 */
export async function minPdfAsync(): Promise<void> {
	try {
		const min_pdf_answers = await inquirer.prompt(min_pdf_prompt);
		const quality_answers = await inquirer.prompt(quality_prompt);
		const level = quality_answers.quality;

		// === select option ===
		if (min_pdf_answers.minify === "select") {
			const select_min_pdf_answers = await inquirer.prompt(
				select_min_pdf_prompt,
			);
			const PDF_files = select_min_pdf_answers.select;

			// start minification process
			await startMinProcessAsync(PDF_files, level);
		}

		// === manual option ===
		if (min_pdf_answers.minify === "manual") {
			const manual_min_pdf_answers = await inquirer.prompt(
				manual_min_pdf_prompt,
			);
			const manual_file = manual_min_pdf_answers.manual;

			// start minification process
			await startMinProcessAsync([manual_file], level);
		}

		restartAsync();
	} catch (error) {
		throw new Error(
			`[error]: an error occurred during minification process: \n${error}`,
		);
	}
}
