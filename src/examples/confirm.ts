// type = input | confirm
export const tvShowLists: string[] = [];
export const recursive_prompt = [
  {
    type: 'input',
    name: 'tvShow',
    message: 'What is your favorite TV show?',
  },
  {
    type: 'confirm',
    name: 'askAgain',
    message: 'Want to enter another TV show ? (just hit enter for YES)',
    default: true,
  },
];
