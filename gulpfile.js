const gulp = require('gulp')
const sass = require('gulp-sass')
const del = require('del')

gulp.task('styles', () => {
    return gulp.src('src/assets/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/assets/css/'))
})

gulp.task('clean', () => {
    return del([
        'src/assets/css/main.css',
    ])
})

gulp.task('watch', () => {
    gulp.watch('src/assets/sass/**/*.scss', (done) => {
        gulp.series(['clean', 'styles'])(done);
    })
})

gulp.task('default', gulp.series(['clean', 'styles', 'watch']))