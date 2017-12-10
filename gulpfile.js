var gulp = require('gulp');
var jsoncombinearray = require("gulp-jsoncombine-array");
var jsonfile = require('jsonfile');
var normalizeJson = require('./normalizeJson.js');

gulp.task("GenerateJSON", function() {
	return gulp.src("./data/*.json")
		.pipe(jsoncombinearray("combinedArray.json", function(dataArray) {
      return new Buffer(JSON.stringify(dataArray));
		}))
    .pipe(gulp.dest("./dist"));
});

gulp.task("NormalizeJSON", ["GenerateJSON"], function() {
	var path = "./dist/combinedArray.json";
	var normal = normalizeJson(jsonfile.readFileSync(path));
	jsonfile.writeFileSync(path, normal, { spaces: 2, EOL: '\r\n' });
	return;
});

gulp.task("default", ["NormalizeJSON"]);
