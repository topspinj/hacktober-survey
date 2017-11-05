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

gulp.task("default", ["GenerateJSON"]);
