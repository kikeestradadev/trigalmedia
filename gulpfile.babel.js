import gulp from 'gulp'
import plumber from 'gulp-plumber'
import pug from 'gulp-pug'
import browserSync from 'browser-sync'
import gulpSass from 'gulp-sass'
import * as dartSass from 'sass'
import postcss from 'gulp-postcss'
import cssnano from 'cssnano'
import browserify from 'browserify'
import babelify from 'babelify'
import source from 'vinyl-source-stream'
import sourcemaps from 'gulp-sourcemaps'
import buffer from 'vinyl-buffer'
import minify from 'gulp-minify'
import imagemin from 'gulp-imagemin'
import sitemap from 'gulp-sitemap'
import cachebust from 'gulp-cache-bust'
import humans from 'gulp-humans'
import data from 'gulp-data'
import fs from 'fs'
import uncss from 'gulp-uncss'
import cleanCSS from 'gulp-clean-css'
import stripCssComments from 'gulp-strip-css-comments';

const server = browserSync.create();
const sass = gulpSass(dartSass);
const { src, dest, series, parallel, watch } = gulp;

const dir = {
	src   : 'src',
	dist  : 'public',
	nm    : 'node_modules',
};

const postcssPlugins = [
	cssnano({
		core: true,
		zindex: false,
		autoprefixer: {
			add: true,
			browsers: '> 1%, last 2 versions, Firefox ESR, Opera 12.1'
		}
	})
];


gulp.task('styles-dev', () => {
	return src('./src/scss/styles.scss')
		.pipe(sourcemaps.init({ loadMaps : true}))
		.pipe(plumber())
		.pipe(sass({
			outputStyle: 'expanded',
			loadPaths: ['./node_modules']
		}))
		.pipe(postcss(postcssPlugins))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('./public/assets/css/'))
		.pipe(server.stream({match: '**/*.css'}))
});

gulp.task('styles-build', () => {
	return src('./src/scss/styles.scss')
		.pipe(plumber())
		.pipe(sass({
			outputStyle: 'compressed',
			loadPaths: ['./node_modules']
		}))
		.pipe(postcss(postcssPlugins))
		.pipe(cleanCSS({
			advanced: false,
			keepBreaks: false,
			keepSpecialComments: 0,
			compatibility: ''
		}))
		.pipe(stripCssComments({
			preserve: false
		}))
		// .pipe(uncss({
		// 	html : [
		// 		'./public/*.html'
		// 	],
		// 	ignore: [
		// 		'tag.class'
		// 	],
		// 	ignoreSheets: [
		// 		//
		// 	]
		// }))
		.pipe(dest('./public/assets/css/'))
});

gulp.task('pug-dev', () =>
	src('./src/pug/pages/**/*.pug')
		.pipe(plumber())
		.pipe(data(function(file) {
			return 	JSON.parse(fs.readFileSync(`${dir.src}/data/example.json`))
		}))
		.pipe(pug({
			pretty: true,
			basedir: './src/pug'
		}))
		.pipe(dest('./public'))
);

gulp.task('pug-build', () =>
	src('./src/pug/pages/**/*.pug')
		.pipe(plumber())
		.pipe(data(function(file) {
			return 	JSON.parse(fs.readFileSync(`${dir.src}/data/example.json`))
		}))
		.pipe(pug({
			basedir: './src/pug'
		}))
		.pipe(dest('./public'))
);

gulp.task('scripts-dev', () =>
	browserify('./src/js/index.js')
		.transform(babelify, {
			global: true // permite importar desde afuera (como node_modules)
		})
		.bundle()
		.on('error', function (err) {
			console.error(err);
			this.emit('end')
		})
		.pipe(source('scripts.js'))
		.pipe(buffer())
		.pipe(minify({
			ext: {
				src: '-min.js',
				min: '.js'
			}
		}))
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('./public/assets/js'))
);

gulp.task('scripts-build', () =>
	browserify('./src/js/index.js')
		.transform(babelify, {
			global: true // permite importar desde afuera (como node_modules)
		})
		.bundle()
		.on('error', function (err) {
			console.error(err)
			this.emit('end')
		})
		.pipe(source('scripts.js'))
		.pipe(buffer())
		.pipe(minify({
			ext: {
				src: '.js',
				min: '-min.js'
			}
		}))
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('./public/assets/js'))
);

gulp.task('images-build', () => {
	return src('./src/img/**/**')
		.pipe(imagemin([
			imagemin.gifsicle({interlaced: true}),
			imagemin.jpegtran({progressive: true}),
			imagemin.optipng({optimizationLevel: 5}),
			imagemin.svgo()
		]))
		.pipe(dest('./public/assets/img'))
});

gulp.task('images-dev', () => {
	return src('./src/img/**/**')
		.pipe(dest('./public/assets/img'))
});

gulp.task('css-dev-vendor', () => {
	return src('./src/vendors/prismjs.css')
		.pipe(dest('./public/assets/css'))
});

gulp.task('fonts-dev', () => {
	return src('./src/fonts/**/**')
		.pipe(dest('./public/assets/fonts'))
});

gulp.task('videos-dev', () => {
	return src('./src/video/**/**')
		.pipe(dest('./public/assets/video'))
});


gulp.task('audios-dev', () => {
	return src('./src/audio/**/**')
		.pipe(dest('./public/assets/audio'))
});

gulp.task('manifest', () => {
	return src('./src/manifest.json')
		.pipe(dest('./public/'))
});
gulp.task('sw', () => {
	return src('./src/sw.js')
		.pipe(dest('./public/'))
});

gulp.task('sitemap', () => {
	return src('./public/**/*.html', {
		read: false
	})
		.pipe(sitemap({
			siteUrl: 'https://kikeestrada.github.io/myStyleGuide/' // remplazar por tu dominio
		}))
		.pipe(dest('./public'))
});

gulp.task('dev', series(
	parallel(
		'styles-dev',
		'pug-dev',
		'scripts-dev',
		'images-dev',
		'audios-dev',
		'videos-dev',
		'fonts-dev',
		'manifest',
		'sw'
	),
	() => {
	server.init({
		server: {
			baseDir: './public'
		}
	});

	watch('./src/scss/**/**', series('styles-dev'));
	watch('./src/js/**/**', series('scripts-dev', (done) => {
		server.reload();
		done();
	}));
	watch('./src/pug/**/**', series('pug-dev', (done) => {
		server.reload();
		done();
	}));
	watch('./src/img/**/**', series('images-dev'));
	watch('./src/manifest.json', series('manifest'));
	watch('./src/sw.js', series('sw'));
	}
));

gulp.task('cache', () => {
	return src('./public/**/*.html')
		.pipe(cachebust({
			type: 'timestamp'
		}))
		.pipe(dest('./public'))
});

gulp.task('humans', function () {
	return src('./public/**/*.html')
		.pipe(humans({
			thanks: [
				'Node (@nodejs on Twitter)',
				'Gulp (@gulpjs on Twitter)'
			],
			site: [
				'Standards: HTML5, CSS3',
				'Components: Normalize.css, etc',
				'Software: Web Storm'
			],
			note: 'Built with love by Enrique Estrada.'
		}))
		.pipe(dest('./public'))
});


gulp.task('build', series(
	'pug-build',
	'scripts-build',
	'images-build',
	'cache',
	'sitemap',
	'humans',
	'styles-build',
	() => {
	server.init({
		server: {
			baseDir: './public'
		}
	});
	}
));

gulp.task('default', series('dev'));
