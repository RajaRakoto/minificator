<div align="center">

## ᗰIᑎIᖴIᑕᗩTOᖇ

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/for-you.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/open-source.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/uses-git.svg)](https://forthebadge.com) [![forthebadge](https://github.com/RajaRakoto/github-docs/blob/master/badge/for-dago.svg?raw=true)](https://forthebadge.com) [![forthebadge](https://github.com/RajaRakoto/github-docs/blob/master/badge/build-by.svg?raw=true)](https://forthebadge.com)

![Grunt](https://img.shields.io/badge/-Grunt-777?style=flat&logo=grunt&logoColor=orangered&labelColor=ffffff) ![JSON](https://img.shields.io/badge/-JSON-777?style=flat&logo=JSON&logoColor=777&labelColor=ffffff) ![Javascript](https://img.shields.io/badge/-Javascript-777?style=flat&logo=javascript&logoColor=dbb332&labelColor=ffffff) ![Git](https://img.shields.io/badge/-Git-777?style=flat&logo=git&logoColor=F05032&labelColor=ffffff) ![Gitub](https://img.shields.io/badge/-Gitub-777?style=flat&logo=github&logoColor=777&labelColor=ffffff) ![NPM](https://img.shields.io/badge/-NPM-777?style=flat&logo=npm&labelColor=ffffff)<br>

</div>

<div align="center">

<h5>~ Demo ~</h5>

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

You can install **Minificator** with NPM:

```bash
npm i @raja_rakoto/minificator
```

If you already have **Minificator** in your project and just want to update it, run the following command:

```bash
npm update @raja_rakoto/minificator && rm -r minificator && grunt --gruntfile node_modules/@raja_rakoto/minificator/minificator.js minificator-init
```

### `📌 Init`

After installation, you need to `initialize` **Minificator** in your project `root directory` to use it, run the command below:

```bash
grunt --gruntfile node_modules/@raja_rakoto/minificator/minificator.js minificator-init
```

### `📌 Use`

After initialization, you need to go to the newly generated **minificator** folder and type `grunt` in your console to see all executable commands

<div align="center">

<img src="https://github.com/RajaRakoto/github-docs/blob/master/minificator/minificator-lists.png?raw=true">

</div>

Just copy the files to be minified in the directory `input/images` for images or `input/scripts` for javascript file and so on ...

Then run the minification command, for example:

```bash
grunt minificator-js
```

Finally, the minifier files are in `output` directory

🅴🅽🅹🅾🆈 ❗
