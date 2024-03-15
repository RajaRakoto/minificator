# cli-boilerplate 🚀

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/for-you.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/open-source.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/uses-git.svg)](https://forthebadge.com) [![forthebadge](https://github.com/RajaRakoto/github-docs/blob/master/badge/build-by.svg?raw=true)](https://forthebadge.com) 

![Git](https://img.shields.io/badge/-Git-777?style=flat&logo=git&logoColor=F05032&labelColor=ffffff) ![Gitub](https://img.shields.io/badge/-Gitub-777?style=flat&logo=github&logoColor=777&labelColor=ffffff)

**Developer Ready: A versatile template designed to jumpstart CLI development in TypeScript - Engineered to seamlessly integrate with various CLI projects, ensuring smooth compatibility with a pre-configured environment**

Instant Value - All basic tools included and configured:

- 🚀 Typescript >= 5.3
- 🧅 Bun.js >= 1.0.26
- 🧅 Use Bun as package manager
- 🌈 ESM
- 🧹 ESlint with some initial rules recommendation
- ✅ Jest or Bun test for fast unit testing and code coverage
- 📚 Type definitions for Bun.js and Jest
- 🎨 Prettier to enforce consistent code style
- ⚙️ EditorConfig for consistent coding style
- 📦 NPM scripts for common operations
- 📝 Simple example of TypeScript code and unit test
- 🐗 Run tasks with Grunt (example for backup)
- 🚄 Build faster
- 🖥️ Ungit for version control (git) with a GUI
- 🧪 A lightweight private npm proxy registry with Verdaccio, useful for testing your CLI
- 🔳 Inquirer.js - A collection of common interactive command line user interfaces
- 🔳 Execa - A process execution library that supports synchronous and asynchronous execution of child processes
- 🔳 Figlet - A program that generates text banners, in a variety of typefaces, composed of letters made up of conglomerations of smaller ASCII characters
- 🔳 Node-emoji - A library that provides a simple way to use emojis in your CLI
- 🔳 Ora - A terminal spinner library that allows you to add a loading spinner to your CLI
- 🔳 Chalk - A library for styling terminal strings with colors and text styles

---

### 📌 Usage 

To use this template, use the following commands:

```bash
bun create github.com/RajaRakoto/cli-boilerplate <project-name>
cd <project-name>
bun run pkg-upgrade # to upgrade outdated dependencies in interactive mode
```

> NOTE 1: I employ the `MIT license` for this starter kit, which includes my name and GitHub profile. Please remember to adjust or remove it if deemed unnecessary.

> NOTE 2: In order to help you better understand the structure of this boilerplate, there is a `README.md` file in each subdirectory of src.

> NOTE 3: For certain configurations in the `package.json` file, you need to modify them to tailor them to your project (e.g: name, description, author, keywords, main, repository, ...).

---

### 📌 Scripts 

**Start**
- 📜 `start` - Run your application with bun.
- 📜 `start:smol` - Run your application with bun and a flag which configures the JavaScriptCore heap size to be smaller and grow slower.
- 📜 `start:bin` - Run your standalone binary app.

**Clean**
- 📜 `clean` - Remove coverage data, prod, build.

**Development**
- 📜 `dev` - Launch your application in development mode with bun.
- 📜 `dev:watch` - Interactive watch mode to automatically transpile source files with bun in development.
- 📜 `dev:hot` - Hot reloading of source files with bun in development.
- 📜 `dev:smol:watch` - Interactive watch mode to automatically transpile source files with bun in development, while using --smol flag.
- 📜 `dev:smol:hot` - Hot reloading source files with bun in development, while using --smol flag.

**Build**
- 📜 `build` - Transpile and bundle source files with bun.
- 📜 `build:watch` - Interactive watch mode to automatically transpile source files with bun.
- 📜 `build:bin` - bun's bundler implements a --compile flag for generating a standalone binary from a TypeScript or JavaScript file, use this in your production environment to ensure optimal execution of your app.

**Testing**
- 📜 `test` - Run bun test.
- 📜 `test:watch` - Interactive watch mode to automatically re-run tests with bun.

**Linting and Formatting**
- 📜 `eslint` - Lint source files with ESLint.
- 📜 `prettier` - Reformat source files with Prettier.

**Backup and Dependency Management**
- 📜 `backup` - Backup files with Grunt.
- 📜 `pkg-check` - Check useless dependencies with depcheck.
- 📜 `pkg-upgrade` - Upgrade outdated dependencies (interactive mode) with npm-check-updates.

**Versioning**
- 📜 `versioning` - Start ungit server.

**npm Commands**
- 📜 `npm-version:major` - Increments the major version number of your project using npm.
- 📜 `npm-version:minor` - Increments the minor version number of your project using npm.
- 📜 `npm-version:patch` - Increments the version patch number of your project using npm.
- 📜 `npm-login` - Login to a registry user account.
- 📜 `npm-publish` - Publish your npm package with public access.
- 📜 `npm-unpublish` - Forcefully unpublish the cli package from npm.
- 📜 `npm-reset:registry` - Delete the custom npm registry.
- 📜 `npm-check:registry` - Get the currently configured registry for npm.
- 📜 `npm-proxy-set:registry` - Set the npm registry to use a local proxy.
- 📜 `npm-proxy:start` - Start a Verdaccio server with a local npm proxy.
- 📜 `npm-proxy:publish` - Publish your npm package via the local proxy.
- 📜 `npm-proxy:unpublish` - Forcefully unpublish the cli package from the npm registry via the local proxy.
- 📜 `npm-proxy:republish` - Republish your npm package by first unpublishing it and then publishing it again via the local proxy.

---

### 📌 Build

When using the **build.js** file in this boilerplate, it's important to note the significance of the **target** option. By default, if the target option is not specified in the **build.js** file, it will be set to `browser`. However, for projects utilizing the `bun.js` runtime environment, it's imperative to explicitly set the target to `bun`. This guarantees compatibility with the `bun` shell environment and prevents unexpected behavior. Furthermore, it's noteworthy that the `target` supports three possible values: `browser`, `bun`, and `node`, providing flexibility in defining the build target according to specific project requirements.

---

### 📌 Similar

You can also check out my other starter projects:

- 🚀 [node-boilerplate](https://github.com/RajaRakoto/node-boilerplate)
- 🚀 [bun-boilerplate](https://github.com/RajaRakoto/bun-boilerplate)
- 🚀 [react-boilerplate](https://github.com/RajaRakoto/react-boilerplate)
- 🚀 [next-boilerplate](https://github.com/RajaRakoto/next-boilerplate)
- 🚀 [quik-boilerplate](https://github.com/RajaRakoto/quik-boilerplate)
- 🚀 [vscode-boilerplate](https://github.com/RajaRakoto/vscode-boilerplate)