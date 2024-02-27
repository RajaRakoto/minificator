import inquirer from 'inquirer';

const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'Enter your name:',
  },
  {
    type: 'list',
    name: 'language',
    message: 'Select a preferred language:',
    choices: ['JavaScript', 'TypeScript', 'Python'],
  },
];

async function main(): Promise<void> {
  const answers = await inquirer.prompt(questions);
  console.log(`Hello ${answers.name}! You chose ${answers.language}.`);
}

main();
