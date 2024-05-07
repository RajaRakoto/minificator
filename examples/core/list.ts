// type = input | list
export const dev_prompt = [
	{
		type: "input",
		name: "name",
		message: "Enter your name:",
	},
	{
		type: "list",
		name: "language",
		message: "Do you prefer JavaScript or TypeScript",
		choices: ["JavaScript", "TypeScript"],
		default: "TypeScript",
	},
];
