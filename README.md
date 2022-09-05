<div align="center">

## ᗰIᑎIᖴIᑕᗩTOᖇ

<div align="center">
<img src="https://github.com/RajaRakoto/github-docs/blob/master/dago.gif?raw=true" width=40>
</div>

<br>

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/for-you.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/open-source.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/uses-git.svg)](https://forthebadge.com) [![forthebadge](https://github.com/RajaRakoto/github-docs/blob/master/badge/for-dago.svg?raw=true)](https://forthebadge.com) [![forthebadge](https://github.com/RajaRakoto/github-docs/blob/master/badge/build-by.svg?raw=true)](https://forthebadge.com)

![Grunt](https://img.shields.io/badge/-Grunt-777?style=flat&logo=grunt&logoColor=orangered&labelColor=ffffff) ![JSON](https://img.shields.io/badge/-JSON-777?style=flat&logo=JSON&logoColor=777&labelColor=ffffff) ![Javascript](https://img.shields.io/badge/-Javascript-777?style=flat&logo=javascript&logoColor=dbb332&labelColor=ffffff) ![Git](https://img.shields.io/badge/-Git-777?style=flat&logo=git&logoColor=F05032&labelColor=ffffff) ![Gitub](https://img.shields.io/badge/-Gitub-777?style=flat&logo=github&logoColor=777&labelColor=ffffff) ![NPM](https://img.shields.io/badge/-NPM-777?style=flat&logo=npm&labelColor=ffffff)<br>

</div>

<div align="center">

> Since version **1.1.x** of minificator, there is no more "images, html, css, scripts" sub-directory in `input` or `output`, just copy them in the `input` directory so that minificator can minify all files

> This animated image is only a demonstration of this package but some things have been changed, so I invite you to read the documentation carefully

<img src="https://github.com/RajaRakoto/github-docs/blob/master/minificator/minificator-demo.gif?raw=true">

</div>

### `📌 Description`

Minification is the process of removing unnecessary elements and rewriting code to reduce file size. These are usually webpage resources, such as HTML, CSS, and JavaScript files or even Images. Reducing the size of web resources allows files to be transferred faster, which makes web pages load faster.

**Minificator** allows you to `minify` and `compress` multiple files automatically, this package is based on task runner grunt, currently minificator supports the following files:

- Any `Image` file with extension .png .jpg .svg .gif
- Any `HTML` file
- Any `CSS` file
- Any `Javascript` file

Here are the benefits of using **Minificator**:

> - You can use it on any project
> - Easy to use, all tasks are preconfigured, just type easy to remember commands to start minituarization
> - You no longer need to use a web application or other similar software
> - Minificator is isolated in a working folder of its own, which means if you use another gruntfile, it's not a problem

### `📌 Install & Update`

Before using **Minificator**, please add this script command in your project's `package.json` file:

```json
	"scripts": {
		"minificator-install": "npm i @raja_rakoto/minificator",
		"minificator-init": "grunt --gruntfile node_modules/@raja_rakoto/minificator/minificator.js minificator-init",
		"minificator-update": "npm update @raja_rakoto/minificator && rm -r minificator && grunt --gruntfile node_modules/@raja_rakoto/minificator/minificator.js minificator-init",
		"minificator-start": "grunt --gruntfile minificator/gruntfile.js"
	}
```

You can install **Minificator** with NPM:

```bash
npm run minificator-install
```

If you already have **Minificator** in your project and just want to update it, run the following command:

```bash
npm run minificator-update
```

> **WARNING**: All files contained in the "minificator" directory will be deleted after the update, so remember to make a backup before starting an update

### `📌 Init`

After installation, you need to `initialize` **Minificator** in your project `root directory` to use it, run the command below:

```bash
npm run minificator-init
```

> **NOTE**: You cannot initialize if the "minificator" directory is already present in your project, please delete it before starting the initialization

### `📌 Use`

To test that **minificator** works correctly, run the following command:

```bash
npm run minificator-start
```

After initialization, you need to go to the newly generated **minificator** folder and type `grunt` in your console to see all executable commands

Just copy the files to be minified in the `input` directory for the input files... So all the minified files are in the `output` directory

<div align="center">

<img src="https://github.com/RajaRakoto/github-docs/blob/master/minificator/minificator-lists.png?raw=true">

</div>

<div align="center">

#### Enjoy it 😉
</div>
