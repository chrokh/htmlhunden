var gulp       = require('gulp'),
    fs         = require('fs'),
    path       = require('path'),
    header     = require('gulp-header'),
    footer     = require('gulp-footer'),
    jade       = require('gulp-jade'),
    intercept  = require('gulp-intercept'),
    concat     = require('gulp-concat'),
    cheerio    = require('cheerio');

var paths = {
  common_header    : 'src/templates/common-header.jade',
  common_footer    : 'src/templates/common-footer.jade',
  single_header    : 'src/templates/single-header.jade',
  single_footer    : 'src/templates/single-footer.jade',
  paginated_header : 'src/templates/paginated-header.jade',
  paginated_footer : 'src/templates/paginated-footer.jade'
};

var tinylr;

var data = {
  toc: []
};

gulp.task('memorize-toc', function(){
  data.toc = [];
  return gulp.src('./src/chapters/*.jade')
    .pipe(jade())
    .pipe(intercept(function(file){
      addFileToTOC(file);
      return file;
    }));
})

gulp.task('paginated', ['memorize-toc', 'pages'], function(cb){
  chapterIterator(function(chapter){
    gulp.src(chapter.contents.origin)
      .pipe(header(fs.readFileSync('./src/templates/pagination.jade')))
      .pipe(header(fs.readFileSync(paths.paginated_header)))
      .pipe(header(fs.readFileSync(paths.common_header)))
      .pipe(footer(fs.readFileSync('./src/templates/pagination.jade')))
      .pipe(footer(fs.readFileSync(paths.common_footer)))
      .pipe(jade({
        locals:{
          urls: {
            next: findOffsetChapterURL(chapter.contents.url, 1),
            prev: findOffsetChapterURL(chapter.contents.url, -1)
          }
        }
      }))
      .pipe(gulp.dest('./dist/'));
  });
  cb();
});

gulp.task('single', ['memorize-toc'], function(){
  return gulp.src('./src/chapters/*.jade')
    .pipe(concat('full.html'))
    .pipe(header(fs.readFileSync(paths.single_header)))
    .pipe(header(fs.readFileSync(paths.common_header)))
    .pipe(footer(fs.readFileSync(paths.single_footer)))
    .pipe(footer(fs.readFileSync(paths.common_footer)))
    .pipe(jade({locals:{ toc: data.toc }}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('index', ['memorize-toc'], function(){
  return gulp.src('./src/index.jade')
    .pipe(jade({locals:{toc:data.toc}}))
    .pipe(gulp.dest('./'))
});

gulp.task('pages', ['memorize-toc'], function(){
  return gulp.src(['./src/*.jade', '!./src/index.jade'])
    .pipe(jade({locals:{toc:data.toc}}))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('assets', function(){
  return gulp.src('./src/assets/**/*.*')
    .pipe(gulp.dest('./dist/assets/'));
});

gulp.task('server', function() {
  var express = require('express'),
      app     = express();
  app.use(require('connect-livereload')());
  app.use(express.static(__dirname));
  app.listen(4000);
});

gulp.task('livereload', function(){
  tinylr = require('tiny-lr')();
  tinylr.listen(35729);
});

gulp.task('watch', ['server', 'livereload'], function(){
  gulp.watch('src/**/*.jade', ['compile']).on('change', onNotifyReload);
  gulp.watch('src/assets/**/*.*', ['assets']).on('change', onNotifyReload);
});

gulp.task('compile', ['index', 'paginated', 'single', 'assets'])

gulp.task('default', ['compile']);//['paginated', 'single']);



/*
 * helpers
*/

function onNotifyReload(file){
  var fileName = require('path').relative('.', file.path);
  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}


var addFileToTOC = function(file){
  var $       = cheerio.load(file.contents.toString()),
      $h1     = $('h1'),
      $h2     = $('h2'),
      $header = $h1.length > 0 ? $h1 : $h2;

  // find chapter url
  var url = path.basename(file.path).split('.')[0] + '.html';

  // create chapter object
  var chapter = {
    title  : $header.text(),
    url    : url,
    origin : file.path
  }

  // memorize chapter
  if($h1.length > 0){
    data.toc.push({
      contents:    chapter,
      subchapters: []
    });
  }else if($h2.length > 0){
    data.toc[data.toc.length-1].subchapters.push({
      contents:   chapter
    });
  }
}



var chapterIterator = function(cb){
  data.toc.forEach(function(chapter){
    cb(chapter);
    chapter.subchapters.forEach(function(subchapter){
      cb(subchapter);
    });
  });
};

var chaptersAsFlatArray = function(){
  var chapters = [];
  chapterIterator(function(c){
    chapters.push(c);
  });
  return chapters;
};

var indexOfChapter = function(url){
  var chapters = chaptersAsFlatArray();
  var index = -1;
  chapters.forEach(function(c,i){
    if(c.contents.url === url){
      index = i;
    }
  });
  return index;
};

var findOffsetChapterURL = function(url, offset){
  var chapters = chaptersAsFlatArray(),
      index    = indexOfChapter(url),
      newIndex = index + offset;
  if(newIndex < 0  ||  newIndex > chapters.length-1){
    console.log("Not found refering to index");
    return '/index.html';
  }
  else{
    return chapters[newIndex].contents.url;
  }
}
