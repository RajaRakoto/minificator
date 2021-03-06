/**
 * @author: Raja
 * @description: A minificator gruntfile - allows you to quickly minify your files (Images, HTML, CSS, Javascript)
 * @requires: load-grunt-tasks grunt-contrib-uglify grunt-contrib-htmlmin grunt-contrib-imagemin grunt-contrib-cssmin grunt-shell
 */
module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt); // grunt plugins loader

	/**
	 * All path
	 */
	const homePath = 'cd ../../';
	const inputPath = './input/';
	const outputPath = './output/';

	/**
	 * ~ ALL GRUNT PLUGINS CONFIG ~
	 */
	grunt.initConfig({
		/**
		 * Run shell commands
		 */
		shell: {
			initialize: {
				command: [
					'cd ../../../ && npm i grunt grunt-contrib-cssmin grunt-contrib-htmlmin grunt-contrib-imagemin grunt-contrib-uglify grunt-shell load-grunt-tasks -D',
					'echo -e "minificator" >> .gitignore',
					'cd node_modules/@raja_rakoto/minificator',
					'echo -e "\nConfig dev dependencies ... [done]\n"',
					'mkdir minificator',
					'cd minificator && mkdir -p input output',
					'cd ..',
					'cat minificator.js > minificator/gruntfile.js',
					'mv minificator ../../../',
					'echo -e "\nMinificator is initialized on root directory ... [done]"',
				].join(' && '),
			},
			clear_input: {
				command: ['cd input && rm *'].join(' && '),
			},
			clear_output: {
				command: ['cd output && rm *'].join(' && '),
			},
		},

		/**
		 * Minify & optimize all images
		 */
		imagemin: {
			dynamic: {
				files: [
					{
						expand: true,
						cwd: inputPath,
						src: ['**/*.{png,jpg,gif,svg}'],
						dest: outputPath,
					},
				],
			},
		},

		/**
		 * Minify HTML
		 */
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true,
				},
				files: [
					{
						expand: true,
						cwd: inputPath,
						src: ['*.html', '!*.min.html'],
						dest: outputPath,
						ext: '.min.html',
					},
				],
			},
		},

		/**
		 * Minify CSS
		 */
		cssmin: {
			dist: {
				files: [
					{
						expand: true,
						cwd: inputPath,
						src: ['*.css', '!*.min.css'],
						dest: outputPath,
						ext: '.min.css',
					},
				],
			},
		},

		/**
		 * Minify & optimize js files
		 */
		uglify: {
			options: {
				mangle: false,
			},
			dist: {
				files: [
					{
						expand: true,
						cwd: inputPath,
						src: ['*.js', '!*.min.js'],
						dest: outputPath,
						ext: '.min.js',
					},
				],
			},
		},
	});

	// minificator registers tasks
	grunt.registerTask('minificator-image', ['imagemin']);
	grunt.registerTask('minificator-html', ['htmlmin:dist']);
	grunt.registerTask('minificator-css', ['cssmin:dist']);
	grunt.registerTask('minificator-js', ['uglify:dist']);
	grunt.registerTask('minificator-all', [
		'minificator-image',
		'minificator-html',
		'minificator-css',
		'minificator-js',
	]);
	grunt.registerTask('minificator-init', ['shell:initialize']);
	grunt.registerTask('clear-input', ['shell:clear_input']);
	grunt.registerTask('clear-output', ['shell:clear_output']);
	grunt.registerTask('clear-all', ['shell:clear_input', 'shell:clear_output']);

	// minificator tasks list
	const minificatorTaskNames = [
		'minificator-init',
		'minificator-all',
		'minificator-image',
		'minificator-html',
		'minificator-css',
		'minificator-js',
		'clear-input',
		'clear-output',
		'clear-all',
	];
	const minificatorTaskStatus = [
		'Run this command (in the root directory) to "initialize" the minificator working directory',
		'Minify all input files (images, html, css, javascript)',
		'Minify all input Images',
		'Minify all input HTML',
		'Minify all input CSS',
		'Minify all input Javascript',
		'Delete all input files',
		'Delete all output files',
		'Delete all input/output files',
	];

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
		getTaskResume(
			'~ MINIFICATOR TASKS ~',
			minificatorTaskNames,
			minificatorTaskStatus,
			'yellow',
		);

		getTaskResume(
			'~ SYNOPSIS ~',
			['grunt [task_name]'],
			['E.g: grunt minificator-js'],
			'magenta',
		);

		console.log(
			'\n[NOTE]: you must be in the "minificator" directory to perform the above tasks'
				.cyan,
		);
	});
};
