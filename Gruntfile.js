module.exports = function(grunt){
  // 项目配置
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: ['src_public/js/index.js'],
        dest: 'public/js/index.min.js'
      }
    },
    less: {
      development: {
        options: {
          compress: true
        },
        files: {
          'public/css/custom.css': 'src_public/less/custom.less'
        }
      }
    },
    nodemon: {
      dev: {
        script: 'index.js',
        options: {
          cwd: __dirname,
          ignore: [
            'node_modules/**',
            'src_public/**',
            'public/**',
            'views/**',
            'data/**'
          ],
          ext: 'js,coffee',
        }
      }
    },
    watch: {
      less: {
        files: ['src_public/less/*.less'],
        tasks: ['less'],
      },
      uglify: {
        files: ['src_public/js/*.js'],
        tasks: ['uglify'],
      }
    }
  });

  // plugin
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');

  // 默认任务
  grunt.registerTask('default', ['nodemon']);
};
