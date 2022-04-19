/**
 * @author: Raja
 * @description: a gruntfile.js template for setting up a basic GRUNT task runner based environment to quickly integrate and use in a project
 * @requires: npm install grunt load-grunt-tasks grunt-shell --save-dev
 * @dependencies: grunt shell:install_deps
 */
module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt); // grunt plugins loader

	// all files destination
	const imageDistDestination = './src/dist/images/';

	// node-glob syntax
	const includeAllFiles = ['**/*', '.*/**/*', '**/.*', '**/.*/**/*'];

	/**
	 * ~ ALL GRUNT PLUGINS CONFIG ~
	 */
	grunt.initConfig({
		pkg: grunt.file.readJSON('./package.json'),

		// TODO: verified
		/**
		 * Minify & optimize all images
		 */
		imagemin: {
			dynamic: {
				files: [
					{
						expand: true,
						cwd: './input/images/', // img source
						src: ['**/*.{png,jpg,gif,svg}'], // img extension
						dest: './output/images/', // img destination
					},
				],
			},
		},

		// TODO: verified
		/**
		 * Minify & optimize js files
		 */
		uglify: {
			options: {
				mangle: false, // variable minification
			},
			dist: {
				files: {
					// dest:src
					'./output/scripts/': './input/scripts/*.js',
				},
			},
		},

		// TODO: verified
		/**
		 * Minify HTML
		 */
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true,
				},
				files: {
					// dest:src
					'./output/html/': './input/html/*.html',
				},
			},
		},
	});

	// grunt basics tasks
	grunt.registerTask('imagemin-task', ['imagemin']); // manual
	grunt.registerTask('uglify-task', ['uglify:dist']); // manual
	grunt.registerTask('htmlmin-task', ['htmlmin:dist']); // manual

	// arrays basics tasks
	const basicsTaskNames = ['imagemin-task', 'uglify-task', 'htmlmin-task'];
	const basicsTaskStatus = ['imagemin', 'uglify:dist', 'htmlmin:dist'];

	// arrays mixed tasks
	const mixedTaskNames = [];
	const mixedTaskStatus = [];

	// arrays watched tasks
	const watchedTaskNames = [];
	const watchedTaskStatus = [];

	// arrays others tasks
	const othersTaskNames = [];
	const othersTaskStatus = [];

	// default tasks
	grunt.registerTask('default', () => {
		console.log(
			'\nHere are the lists of plugins (tasks) you can run with grunt:'.green,
		);

		/**
		 *
		 * @param {string} taskTitle - task title (Eg: basics tasks)
		 * @param {array} taskNames - task names (Eg: basicsTaskNames)
		 * @param {array} taskStatus - task status (Eg: basicsTaskStatus)
		 * @param {string} taskTheme - colors of theme (Eg: black ,red ,green ,yellow ,blue ,magenta ,cyan ,white ,gray ,grey)
		 */
		function getTaskResume(taskTitle, taskNames, taskStatus, taskTheme) {
			switch (taskTheme) {
				case 'cyan':
					console.log(`\n${taskTitle}`.cyan.inverse.bold);
					taskNames.forEach((taskNames, index) => {
						console.log(taskNames.cyan + ` -> ${taskStatus[index]}`);
					});
					break;
				case 'magenta':
					console.log(`\n${taskTitle}`.magenta.inverse.bold);
					taskNames.forEach((taskNames, index) => {
						console.log(taskNames.magenta + ` -> ${taskStatus[index]}`);
					});
					break;
				case 'yellow':
					console.log(`\n${taskTitle}`.yellow.inverse.bold);
					taskNames.forEach((taskNames, index) => {
						console.log(taskNames.yellow + ` -> ${taskStatus[index]}`);
					});
					break;
				case 'blue':
					console.log(`\n${taskTitle}`.blue.inverse.bold);
					taskNames.forEach((taskNames, index) => {
						console.log(taskNames.blue + ` -> ${taskStatus[index]}`);
					});
					break;

				default:
					null;
					break;
			}
		}

		// all tasks resume
		getTaskResume('basics tasks', basicsTaskNames, basicsTaskStatus, 'cyan');
		getTaskResume('mixed tasks', mixedTaskNames, mixedTaskStatus, 'magenta');
		getTaskResume('watched tasks', watchedTaskNames, watchedTaskStatus, 'blue');
		getTaskResume(
			'shell & others tasks',
			othersTaskNames,
			othersTaskStatus,
			'yellow',
		);
	});
};
