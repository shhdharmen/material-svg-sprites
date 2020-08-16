const gulp = require("gulp");
const svgstore = require("gulp-svgstore");
const svgmin = require("gulp-svgmin");
const rename = require("gulp-rename");
const run = require("gulp-run-command").default;

gulp.task("svg-sprite", () => {
  return gulp
    .src("src/icons/svg/*.svg")
    .pipe(
      svgmin(() => {
        return {
          plugins: [
            {
              removeViewBox: false,
            },
            {
              removeDimensions: true,
            },
          ],
        };
      })
    )
    .pipe(svgstore())
    .pipe(rename({ basename: "sprites" }))
    .pipe(gulp.dest("src/assets/icons"));
});

gulp.task("ng-serve", run("ng serve -o"));

gulp.task("ng-build", run("ng build --prod"));

gulp.task("watch", () =>
  gulp.watch(["src/icons/svg/*.svg"], gulp.series("svg-sprite"))
);

gulp.task(
  "default",
  gulp.series("svg-sprite", gulp.parallel("ng-serve", "watch"))
);

gulp.task("build", gulp.series("svg-sprite", "ng-build"));
