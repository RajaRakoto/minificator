import inquirer from 'inquirer';
import chalk from 'chalk';
import * as emoji from 'node-emoji';

// ==============================

export const menu_prompt = [
  {
    type: 'list',
    name: 'menu',
    message: chalk.green('What do you want to do ...'),
    loop: false,
    pageSize: 15,
    choices: [
      new inquirer.Separator('=============== option list =============='),
      {
        name: `${emoji.get('pushpin')} option 1`,
        value: 'option-1',
      },
      {
        name: `${emoji.get('pushpin')} option 2`,
        value: 'option-2',
      },
      {
        name: `${emoji.get('pushpin')} option 3`,
        value: 'option-3',
      },
      new inquirer.Separator('=========================================='),
      {
        name: chalk.red(`${emoji.get('door')} exit`),
        value: 'exit',
      },
    ],
  },
];
