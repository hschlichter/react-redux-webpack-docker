module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('gruntify-eslint');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		src: {
			js: 'src/**/*.js'
		},
		eslint: {
			src: [
				'./src',
				'gruntfile.js'
			]
		},
		watch: {
			js: {
				files: ['<%= src.js %>'],
				tasks: ['eslint']
			}
		},
		nodemon: {
			dev: {
				script: './src/server.js',
				options: {
					cwd: __dirname,
					nodeArgs: ['--debug'],
					watch: ['<%= src.js %>']
				},
				callback: function (nodemon) {
				}
			}
		},
		concurrent: {
			dev: ['watch', 'nodemon'],
			options: {
				logConcurrentOutput: true
			}
		}
	});

	grunt.registerTask('default', ['concurrent']);
};
