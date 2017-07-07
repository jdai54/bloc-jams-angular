module.exports = function(grunt) {
  grunt.registerTask('build', ['clean', 'copy']);

  grunt.initConfig({
    copy: {
      dist: {
        files: [{
          expand: true,
          src: ['./assets/**/*.{png,jpg,jpeg,mp3}'],
          dest: './dist',
          cwd: './app'
        }, {
          expand: true,
          src: ['./**/*.html'],
          dest: './dist',
          cwd: './app'
        }, {
          expand: true,
          src: ['./**/*.css'],
          dest: './dist/styles',
          cwd: './app/styles'
        }, {
          expand: true,
          src: ['./**/*.js'],
          dest: './dist/scripts',
          cwd: './app/scripts'
        }, {
          expand: true,
          src: ['./**/*.html'],
          dest: './dist/templates',
          cwd: './app/templates'
        }]
      }
    },

    clean: ['./dist']
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
};
