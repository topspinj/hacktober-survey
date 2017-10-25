var gulp = require('gulp'); 
var jsoncombine = require("gulp-jsoncombine");
 
gulp.src("data/*.json")
    .pipe(jsoncombine("combined.json",function(data){
        return new Buffer(JSON.stringify(data));
        }))
    .pipe(gulp.dest("./dist"));