var gulp = require('gulp'); 
var jsoncombinearray = require("gulp-jsoncombine-array");
var convert = require('gulp-convert');
 

gulp.src("data/*.json")
    .pipe(jsoncombinearray("combinedArray.json",function(dataArray) {
        return new Buffer(JSON.stringify(dataArray));
    }))
    .pipe(gulp.dest("./dist"));

gulp.task('json2csv', function(){
  gulp.src(['dist/combinedArray.json'])
    .pipe(convert({
      from: 'json',
      to: 'csv'
     }))
    .pipe(gulp.dest('dist/json/'));
});