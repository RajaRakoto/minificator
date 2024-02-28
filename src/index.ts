/* libs */
import inquirer from 'inquirer';
/* examples */
import { dev_prompt } from './examples/list';
import { pizza_prompt } from './examples/checkbox';
import { expand_prompt } from './examples/expand';
import { tvShowLists, recursive_prompt } from './examples/confirm';

// ==============================

// type = input | list
async function askDev(): Promise<void> {
  const dev_answers = await inquirer.prompt(dev_prompt);
  console.log(`Hello ${dev_answers.name}! You prefer ${dev_answers.language}.`);
}

// type = checkbox
async function askPizza(): Promise<void> {
  const pizza_answers = await inquirer.prompt(pizza_prompt);
  console.dir(pizza_answers);
}

// type = expand
async function askExpand(): Promise<void> {
  const expand_answers = await inquirer.prompt(expand_prompt);
  console.dir(expand_answers);
}

// type = input | confirm
async function askRecursive(): Promise<void> {
  const recursive_answers = await inquirer.prompt(recursive_prompt);
  tvShowLists.push(recursive_answers.tvShow);
  if (recursive_answers.askAgain) {
    askRecursive();
  } else {
    console.log('tvShow lists: ', tvShowLists.join(', '));
  }
}

async function main(): Promise<void> {
  await askDev();
  await askPizza();
  await askExpand();
  await askRecursive();
}

main();
