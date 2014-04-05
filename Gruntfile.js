module.exports = function(grunt) {

grunt.initConfig({
pkg: grunt.file.readJSON('package.json'),

imagemin: {
	dynamic: {
		files: [{
			expand: true,
			cwd: 'images/',
			src: ['**/*.{png,jpg,gif}'],
			dest: 'images/'
		}]
	}
},

less: {
	compile: {
		options: {
			compress: true,
			cleancss: true,
			optimization: 2
		},
		files: {
        	// target.css file: source.less file
        	'css/style.css': 'css/style.less'
        }
    }
},

uglify: {
	dist: {
		files: {
			'js/scripts.min.js': 'js/scripts.js'
		}
	}
},

responsive_images: {
	rwdimg: {
		engine: 'im',
		options: {
			sizes: [{
				name: 'sm',
				width: 265
			},
			{
				name: 'md',
				width: 545
			}]
		},
		files: [{
			expand: true,
			cwd: 'images/',
			src: ['**/*.{jpg,gif,png}'],
			dest: 'images/'
		}]
	}
},

watch: {
	images: {
		options: {
			spawn: false,
			event: ['added', 'deleted', 'changed']
		},
		files: ['images/*.{png,jpg,gif}'],
		tasks: ['imagemin']
	},
	styles: {
		options: {
			spawn: false,
			event: ['added', 'deleted', 'changed']
		},
		files: ['css/*.less'],
		tasks: ['less']
	}
}
});


grunt.loadNpmTasks('grunt-contrib-imagemin');
grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-responsive-images');
grunt.registerTask('default', ['watch']);
grunt.registerTask('img', ['imagemin']);
grunt.registerTask('min', ['uglify']);
};