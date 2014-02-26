var gulp      = require('gulp'),
    fs        = require('fs'),
    path      = require('path'),
    header    = require('gulp-header'),
    footer    = require('gulp-footer'),
    jade      = require('gulp-jade'),
    intercept = require('gulp-intercept'),
    concat    = require('gulp-concat');


var files = {
  common_header    : fs.readFileSync('src/templates/common-header.jade'),
  common_footer    : fs.readFileSync('src/templates/common-footer.jade'),
  single_header    : fs.readFileSync('src/templates/single-header.jade'),
  single_footer    : fs.readFileSync('src/templates/single-footer.jade'),
  paginated_header : fs.readFileSync('src/templates/paginated-header.jade'),
  paginated_footer : fs.readFileSync('src/templates/paginated-footer.jade')
};


var data = {
  toc: []
};

gulp.task('memorize-toc', function(){
  data.toc = [];
  return gulp.src('./src/chapters/*.jade')
    .pipe(intercept(function(file){
      addFileToTOC(file.path);
      return file;
    }));
})

gulp.task('paginated', function(){
  return gulp.src('./src/chapters/*.jade')
    .pipe(header(files.common_header))
    .pipe(header(files.paginated_header))
    .pipe(footer(files.paginated_footer))
    .pipe(footer(files.common_footer))
    .pipe(jade())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('single', ['memorize-toc'], function(){
  return gulp.src('./src/chapters/*.jade')
    .pipe(concat('full.html'))
    .pipe(header(files.single_header))
    .pipe(header(files.common_header))
    .pipe(footer(files.single_footer))
    .pipe(footer(files.common_footer))
    .pipe(jade({locals:{ toc: data.toc }}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('index', ['memorize-toc'], function(){
  return gulp.src('./src/index.jade')
    .pipe(jade({locals:{toc:data.toc}}))
    .pipe(gulp.dest('./'))
});

gulp.task('assets', function(){
  return gulp.src('./assets/**/*.*')
    .pipe(gulp.dest('./dist/assets/'));
});

gulp.task('watch', function(){
  gulp.watch('src/**/*.jade', ['compile']);
});

gulp.task('compile', ['index', 'paginated', 'single', 'assets'])

gulp.task('default', ['compile']);//['paginated', 'single']);



/*
 * helpers
*/
var addFileToTOC = function(filepath){
  var filename = path.basename(filepath);
  var parts = filename.split('-');

  var level = 2;
  if(parts[1] === '00'){
    level = 1;
  }

  // find chapter title
  var title = (level===1) ? parts[2] : parts[3];
  title = title.split('.')[0];

  // find chapter url
  var url = filename.split('.')[0] + '.html';

  var chapter = {
    title: title,
    url:   url
  }

  if(level === 1)
    data.toc.push({
      contents:    chapter,
      subchapters: []
    });
  else
    data.toc[data.toc.length-1].subchapters.push({
      contents:   chapter
    });
}