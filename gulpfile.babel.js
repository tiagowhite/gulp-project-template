/**
 * gulp-project-template
 *
 * Copyright 2018 Tiago Fernandes (@tiagowhite)
 * Released under the MIT license (http://mit-license.org)
 */

import del from 'del';
import gulp from 'gulp';
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';
import {argv} from 'yargs';
import config from './config.json'
import pkg from './package.json';

const $ = gulpLoadPlugins();
const server = browserSync.create();
const banner = `
/!**
 * @project:  ${pkg.name}
 * @author:   ${pkg.author} (@${pkg.author})
 * Copyright (c) ${(new Date()).getFullYear()} ${pkg.author}
 * Released under the ${pkg.license} license
*!/
`;
/* List all tasks and subtasks */
gulp.task('help', $.taskListing);


const clean = () => del(['dist']);

const styles = () => {
  return gulp.src(config.sass_src)
    .pipe($.plumber())
    .pipe($.if(argv.pretty, $.sourcemaps.init()))
    .pipe($.sass({
      precision: 10,
      includePaths: ['.app/css/'],
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer(config.autoprefixer_options))
    .pipe($.if(!argv.pretty, $.cssnano()))
    .pipe($.size({title: 'Styles'}))
    .pipe($.header(banner, {pkg}))
    .pipe($.if(argv.pretty, $.sourcemaps.write('./')))
    .pipe(gulp.dest(config.sass_dest))
};

const scripts = () => {
  return gulp.src(config.js_src)
    .pipe($.plumber())
    .pipe($.babel({
      presets: ['env']
    }))
    .pipe($.size({title: 'Build scripts'}))
    .pipe($.if(argv.pretty, $.sourcemaps.init()))
    .pipe($.concat(config.js_file_name))
    .pipe($.if(!argv.pretty, $.uglify({})))
    .pipe($.header(banner, {pkg}))
    .pipe($.if(argv.pretty, $.sourcemaps.write('./')))
    .pipe($.size({title: 'Scripts'}))
    .pipe(gulp.dest(config.js_dest))
};

const views = () => {
  return gulp.src(config.templates_src)
    .pipe($.plumber())
    .pipe($.pug({
      pretty: true
    }))
    .pipe(gulp.dest(config.templates_dest))
};

/*Copy the content from src/ to dist*/
gulp.task('copy', gulp.parallel(clean), () => gulp.parallel(clean)
  .pipe($.plumber())
  .pipe($.size({title: 'Copying ./src content in ./dist'}))
  .pipe(gulp.dest(config.dist_folder)));


const reload = (done) => {
  server.reload();
  done();
};

const serve = (done) => {
  const startTime = Date.now();
  console.log('\x1b[42m************************************\x1b[0m\n');
  console.log('\x1b[32m  Project ready for coding 😎\x1b[0m\n');
  console.log('\x1b[42m************************************\x1b[0m\n');
  console.log('[\x1b[32m\x1b[0m]', `All finished in \x1b[35m${Date.now() - startTime} ms`, '\x1b[0m\n');
  server.init({
    server: {
      baseDir: './app'
    }

  });
  gulp.watch(['./app/!**!/!*.pug'], gulp.series(views), reload);
  gulp.watch(['./app/templates/!**!/!*.pug'], gulp.series(views), reload);
  gulp.watch(['./app/css/!**!/!*.scss'], gulp.series(styles), reload);
  gulp.watch(['./app/js/!*.js'], gulp.series(scripts), reload);
  gulp.watch(['./app/img/!**!/!*'], reload);
  done();
};


gulp.task('production', gulp.series(clean, styles, scripts, views), () => {
  gulp.series('copy')
});


const watch = () => gulp.watch(config.js_src, gulp.series(scripts, styles, views, reload));
const dev = gulp.series(clean, views, scripts, styles, serve, 'copy', watch);
export default dev;

