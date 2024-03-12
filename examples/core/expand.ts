import inquirer from 'inquirer';

// type = expand
export const expand_prompt = [
  {
    type: 'expand',
    message: 'Conflict on `file.js`: ',
    name: 'overwrite',
    choices: [
      {
        key: 'y',
        name: 'Overwrite',
        value: 'overwrite',
      },
      {
        key: 'a',
        name: 'Overwrite this one and all next',
        value: 'overwrite_all',
      },
      {
        key: 'd',
        name: 'Show diff',
        value: 'diff',
      },
      {
        key: 'n',
        name: "Don't overwrite",
        value: 'skip',
      },
      new inquirer.Separator(),
      {
        key: 'x',
        name: 'Abort',
        value: 'abort',
      },
    ],
  },
];
