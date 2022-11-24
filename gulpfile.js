const gulp = require('gulp'),
	sass = require('gulp-sass')(require('sass')),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	pug = require('gulp-pug');
// PATH
const path = {
	// Пути, куда складывать готовые после сборки файлы
	build: {
		html: 'build/',
		css: 'build/css/',
		js: 'build/js/',
	},
	// Пути откуда брать исходники
	src: {
		pug: 'src/pug/*.pug',
		scss: 'src/scss/*.scss',
		js: 'src/js/*.js',
	},
	// Указываем, за изменением каких файлов мы хотим наблюдать
	watch: {
		pug: 'src/pug/*.pug',
		scss: 'src/scss/**/*.scss*',
		js: 'src/js/*.js',
	},
};

function styles() {
	return gulp
		.src(path.src.scss)
		.pipe(sourcemaps.init())
		.pipe(
			sass({
				includePaths: [path.src.scss],
				outputStyle: 'expanded',
				indentWidth: 4,
				errLogToConsole: true,
			}).on('error', sass.logError)
		)
		.pipe(
			autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
				cascade: false,
			})
		)
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest(path.build.css));
}
function html() {
	return gulp
		.src(path.src.pug)
		.pipe(
			pug({
				pretty: true,
			})
		)
		.on('error', function (err) {
			gutil.log(gutil.colors.red(err));
		})
		.pipe(gulp.dest(path.build.html));
}
function watcher() {
	gulp.watch(path.src.scss, styles);
	gulp.watch(path.src.pug, html);
}
exports.styles = styles;
exports.html = html;
exports.watch = watcher;