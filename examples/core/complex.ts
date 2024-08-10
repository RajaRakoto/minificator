/* types */
interface I_answers {
	target: string;
}

/* utils */
function isEmail(input: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(input) && input.trim() !== "";
}

function isStrongPassword(input: string): boolean {
	if (input.length < 8) {
		return false;
	}
	if (!/[A-Z]/.test(input)) {
		return false;
	}
	if (!/[a-z]/.test(input)) {
		return false;
	}
	if (!/\d/.test(input)) {
		return false;
	}
	return true;
}

// ==============================

// type = input | password | number | list | confirm | checkbox | rawlist | editor
export const complex_prompt = [
	{
		type: "input",
		message: "Enter your email:",
		name: "email",
		validate: (input: string): boolean | string => {
			if (!isEmail(input)) {
				return "Please enter a valid email address";
			}
			return true;
		},
	},
	{
		type: "password",
		message: "Enter your password:",
		name: "password",
		mask: "*",
		validate: (input: string): boolean | string => {
			if (!isStrongPassword(input)) {
				return "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter and a number";
			}
			return true;
		},
	},
	{
		type: "input",
		message: "Enter your user ID (number)",
		name: "userId",
		default(): number {
			return 1000;
		},
		validate: (answer: string): string | boolean => {
			if (!Number.isInteger(+answer)) {
				return "Value must be a number";
			}
			return true;
		},
	},
	{
		type: "number",
		message: "previous build number",
		name: "buildNumber",
	},
	{
		type: "list",
		name: "target",
		message: "Where you want to log in ?",
		choices: ["local", "development", "sandbox", "production"],
	},
	{
		type: "confirm",
		name: "checked",
		message: "Have you checked and confirmed all info before moving on ?",
		default: true,
	},
	{
		type: "confirm",
		name: "debug",
		message: "Should I log out all the messages for debugging purpose ?",
		default: false,
	},
	{
		type: "checkbox",
		name: "servicesToDeploy",
		message: "Select the services you want to deploy",
		choices: ["logging", "auth", "api", "web-app"],
		validate: (answer: string): string | boolean => {
			if (answer.length < 1) {
				return "You must choose at least one service.";
			}
			return true;
		},
		// starting condition
		when(answers: I_answers): boolean {
			return answers.target !== "local";
		},
	},
	{
		type: "rawlist",
		name: "locale",
		message: "What locale do you want to run the spell checker",
		choices: ["en-GB", "en-US"],
	},
];
