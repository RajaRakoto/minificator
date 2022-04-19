/**
 * @author: Raja
 * @description: A gruntfile template for minificator
 * @requires: load-grunt-tasks grunt-contrib-uglify grunt-contrib-htmlmin grunt-contrib-imagemin grunt-contrib-cssmin grunt-shell
 */
 module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt); // grunt plugins loader

	// path
	const homePath = 'cd ../../..';
	const imageInputPath = './input/images/';
	const imageOutputPath = './output/images/';
	const scriptInputPath = './input/scripts/*.js';
	const scriptOutputPath = './output/scripts/';
	const htmlInputPath = './input/html/*.html';
	const htmlOutputPath = './output/html/';
	const distPath = 'cd node_modules/@raja_rakoto/minificator';

	/**
	 * ~ ALL GRUNT PLUGINS CONFIG ~
	 */
	grunt.initConfig({
		// TODO: verified
		/**
		 * Run shell commands
		 */
		shell: {
			initialize: {
				command: [
					'mkdir minificator',
					'cd minificator && mkdir -p input/html input/css input/scripts input/images output/html output/css output/scripts output/images',
					'cd ..',
					'cat gruntfile.js > minificator/gruntfile.js',
				].join(' && '),
			},
			clear_input: {
				command: [
					'cd minificator/input/css && touch tmp.css && rm *.css',
					homePath,
					'cd minificator/input/html && touch tmp.html && rm *.html',
					homePath,
					'cd minificator/input/images && touch tmp.jpg tmp.png tmp.svg tmp.gif && rm *.jpg *.png *.svg *.gif',
					homePath,
					'cd minificator/input/scripts && touch tmp.js && rm *.js',
					homePath,
				].join(' && '),
			},
			clear_output: {
				command: [
					'cd minificator/output/css && touch tmp.css && rm *.css',
					homePath,
					'cd minificator/output/html && touch tmp.html && rm *.html',
					homePath,
					'cd minificator/output/images && touch tmp.jpg tmp.png tmp.svg tmp.gif && rm *.jpg *.png *.svg *.gif',
					homePath,
					'cd minificator/output/scripts && touch tmp.js && rm *.js',
					homePath,
				].join(' && '),
			},
		},

		// TODO: verified
		/**
		 * Minify & optimize all images
		 */
		imagemin: {
			dynamic: {
				files: [
					{
						expand: true,
						cwd: imageInputPath, // img source
						src: ['**/*.{png,jpg,gif,svg}'], // img extension
						dest: imageOutputPath, // img destination
					},
				],
			},
		},

		// TODO: work
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
					scriptOutputPath: scriptInputPath,
				},
			},
		},

		// TODO: work
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
					htmlOutputPath: htmlInputPath,
				},
			},
		},
	});

	// grunt basics tasks
	grunt.registerTask('imagemin-task', ['imagemin']); // manual
	grunt.registerTask('uglify-task', ['uglify:dist']); // manual
	grunt.registerTask('htmlmin-task', ['htmlmin:dist']); // manual
	grunt.registerTask('minificator', [
		'imagemin-task',
		'uglify-task',
		'htmlmin-task',
	]); // auto
	grunt.registerTask('clear-input', ['shell:clear_input']); // manual
	grunt.registerTask('clear-output', ['shell:clear_output']); // manual
	grunt.registerTask('clear-all', ['shell:clear_input', 'shell:clear_output']); // manual
	grunt.registerTask('initialize', ['shell:initialize']); // manual

	// arrays basics tasks
	const basicsTaskNames = ['imagemin-task', 'uglify-task', 'htmlmin-task'];
	const basicsTaskStatus = ['imagemin', 'uglify:dist', 'htmlmin:dist'];

	// arrays mixed tasks
	const mixedTaskNames = ['minificator'];
	const mixedTaskStatus = ['(imagemin | uglify:dist | htmlmin:dist)'];

	// arrays watched tasks
	const watchedTaskNames = [];
	const watchedTaskStatus = [];

	// arrays others tasks
	const othersTaskNames = [
		'initialize',
		'clear-input',
		'clear-output',
		'clear-all',
	];
	const othersTaskStatus = [
		'shell:initialize',
		'shell:clear_input',
		'shell:clear_output',
		'(shell:clear_input | shell:clear_output)',
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
