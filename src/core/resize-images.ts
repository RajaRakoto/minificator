/* libs */
import inquirer from "inquirer";

/* core */
import { restart } from "@/core/restart";

/* utils */
import { getAllImageFiles } from "@/utils/extras";

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

export async function resizeImages(): Promise<void> {
	const resize_answers = await inquirer.prompt(resize_prompt);

	if (resize_answers.resize === "select") {
		const select_answers = await inquirer.prompt(select_prompt);
		console.log(select_answers);
	}

	if (resize_answers.resize === "manual") {
		const manual_answers = await inquirer.prompt(manual_prompt);
		console.log(manual_answers);
	}

	restart();
}
