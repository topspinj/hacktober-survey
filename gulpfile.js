var gulp = require('gulp');
var jsoncombinearray = require("gulp-jsoncombine-array");
var convert = require('gulp-convert');


gulp.task("GenerateJSON", function(){
  return gulp.src("./data/*.json")
    .pipe(jsoncombinearray("combinedArray.json", function (dataArray) {
      return new Buffer(JSON.stringify(dataArray));
    }))
    .pipe(gulp.dest("./dist"));
});

gulp.task("GenerateCSV", ["GenerateJSON"], function(){
    return gulp.src(['dist/combinedArray.json'])
        .pipe(convert({
            from: 'json',
            to: 'csv'
        }))
        .pipe(gulp.dest('dist/csv/'));
});

gulp.task("default", ["GenerateCSV"]);
