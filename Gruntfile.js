/**
 * Created by sridharrajs on 1/6/16.
 */

'use strict';

const FILES = {
	ALL_FILES: ['Gruntfile.js', 'app/**/*.js'],
	TEST_SPECS: ['test/**/*.js']
};

module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt);
	grunt.loadNpmTasks('grunt-jscs');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.initConfig({
		jshint: {
			all: FILES.ALL_FILES,
			options: {
				jshintrc: true
			}
		},
		jscs: {
			src: FILES.ALL_FILES,
			options: {
				config: '.jscsrc'
			}
		},
		eslint: {
			target: FILES.ALL_FILES,
			options: {
				configFile: '.eslintrc'
			}
		},
		mochaTest: {
			test: {
				src: FILES.TEST_SPECS
			}
		},
		watch: {
			files: FILES.ALL_FILES,
			tasks: ['jshint', 'jscs', 'eslint']
		}
	});

	grunt.registerTask('lints', ['jshint', 'jscs', 'eslint']);
	grunt.registerTask('test', ['mochaTest']);
};