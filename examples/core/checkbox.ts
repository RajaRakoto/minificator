import inquirer from "inquirer";

// type = checkbox
export const pizza_prompt = [
	{
		type: "checkbox",
		name: "toppings",
		message: "Select toppings",
		choices: [
			new inquirer.Separator("== The Meats =="),
			"Pepperoni",
			"Ham",
			"Ground Meat",
			new inquirer.Separator("== The Cheeses =="),
			"Mozzarella",
			"Cheddar",
			"Parmesan",
			new inquirer.Separator("== The usual =="),
			"Mushroom",
			"Tomato",
			new inquirer.Separator("== The extras =="),
			"Pineapple",
			{
				name: "Olives",
				disabled: "out of stock",
			},
		],
	},
];
