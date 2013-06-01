module.exports = function(grunt) {
	
	grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
  	pkga: grunt.file.readJSON('package.json'),
  	connect:{
	  	devserver:{
	  		options:{
	  			port: 8000,
	  			hostname : '0.0.0.0',
	  			base : '.',
	  			keepalive: true
	  		}
	  	}
  	}
  });
  grunt.registerTask('default',['connect']);
};