# minificator 🛠️

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/for-you.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/open-source.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/uses-git.svg)](https://forthebadge.com) [![forthebadge](https://github.com/RajaRakoto/github-docs/blob/master/badge/build-by.svg?raw=true)](https://forthebadge.com)

![Git](https://img.shields.io/badge/-Git-777?style=flat&logo=git&logoColor=F05032&labelColor=ffffff) ![Gitub](https://img.shields.io/badge/-Gitub-777?style=flat&logo=github&logoColor=777&labelColor=ffffff)

**Ditch online tools and optimize your files locally with Minificator, a powerful and user-friendly CLI tool that swiftly reduces file sizes for a variety of file formats, including images, PDFs, and more ...**

key features:

- 🔒 **Offline** - Optimize files locally to ensure data privacy and security without needing an internet connection.
- 🚀 **Performance & Optimization** - Minimize file sizes while preserving quality, ensuring efficient storage and enhancing the performance of various applications.
- 🎯 **Ease to use** - Features an intuitive CLI interface, making file optimization simple even for beginners
- 📂 **Variety of formats** - Supports various file formats like JPEG, PNG, GIF, PDFs, and more.

---

### 📌 Usage

```bash
npm install -g @raja-rakoto/minificator
```

<img src="https://github.com/RajaRakoto/github-docs/blob/master/minificator/minificator-demo.gif?raw=true" width="800">

---

### 📌 NPM Scripts

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

**NPM Commands**

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

**NVM**

- 📜 `nvm` - Manage multiple node.js versions. Easily switch between node versions per project to ensure compatibility.

---

### 📌 Build

When using the **build.js** file in this project, it's important to note the significance of the **target** option. By default, if the target option is not specified in the **build.js** file, it will be set to `browser`. However, for projects utilizing the `bun.js` runtime environment, it's imperative to explicitly set the target to `bun`. This guarantees compatibility with the `bun` shell environment and prevents unexpected behavior. Furthermore, it's noteworthy that the `target` supports three possible values: `browser`, `bun`, and `node`, providing flexibility in defining the build target according to specific project requirements.
