import gulp from 'gulp';
import yargs from 'yargs';
import sass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import del from 'del';
import webpack from 'webpack-stream';
import uglify from 'gulp-uglify';
import named from 'vinyl-named';
import browserSync from 'browser-sync';
import gzip from 'gulp-zip';
import greplace from 'gulp-replace';
import info from './package.json';

//create our workspace directory paths
const paths = {
  styles: {
    src: ['src/scss/pm_bundle.scss'],   //src/sass/test_bundle.scss
    dest: 'dist/css'
  },
  images: {
    src: 'src/images/**/*.{jpg,jpeg,png,ico,svg,gif}',
    dest: 'dist/images'
  },
  scripts: {
    src: ['src/scripts/pm_bundle.js','src/scripts/pm_bundle_admin.js'],
    dest: 'dist/js'
  },
  other: {
    src: ['src/**/*','!src/{images,scripts,scss,views}','!src/{images,scripts,scss,views}/**/*'],
    dest: 'dist/'
  },
  package: {
    src: ['**/*', '!.vscode','!node_modules{,/**}','!packaged{,/**}','!src{,/**}','!dist/login{,/**}','!dist/others{,/**}','!dist/uan{,/**}','!.babelrc','!.gitignore','!gulpfile.babel.js','!package.json','!package-lock.json'],
    dest: 'packaged'
  }
};

//allow the dist directory to be cleaned out
export const clean = () => del(['dist']);

//a constant to determine if we want to push dev or prod assets | used below
const PRODUCTION = yargs.argv.prod;

//manage scss
export const styles = () => {
  return gulp.src(paths.styles.src)
    .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(PRODUCTION, cleanCSS({
      compatibility: 'ie8'
    })))
    .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(bserver.stream());
}

//manage js
export const scripts = () => {

  //webpack stream required options
  var options = {
    mode: "development" //or production
  };

  return gulp.src(paths.scripts.src)
  .pipe(named())
  .pipe(webpack({
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    },
    output: {
      filename: '[name].js'
    },
    externals: {
      jQuery: 'jQuery'
    },
    devtool: !PRODUCTION ? '#inline-source-map' : false,
    mode: PRODUCTION ? 'production' : 'development'
  }))
  .pipe(gulpif(PRODUCTION, uglify()))
  .pipe(gulp.dest(paths.scripts.dest));
}

//manage images
export const images = () => {
  return gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest))
}

//manage other assets(optional)
export const other = () => {
  return gulp.src(paths.other.src)
  .pipe(gulp.dest(paths.other.dest));
}

//create the browsersync server & initialize locally with our workspace location
const bserver = browserSync.create(); 
export const serve = (done) =>  {
  bserver.init({
    port: 8081,
    proxy: "http://local.pm"
  });
  done();
}

//create a reloading component via browsersync for watching purposes | used below
export const reload = (done) => {
  bserver.reload();
  done();
}

//watch everything
export const watch = () => {
  gulp.watch('src/sass/**/*.scss', styles);
  gulp.watch('src/js/**/*.js', gulp.series(scripts,reload));
  gulp.watch('**/*.php',reload);
  gulp.watch(paths.images.src, gulp.series(images,reload));
  gulp.watch(paths.other.src, gulp.series(other,reload));
}

//compress project to zip package (optional)
export const compress = () => {
  return gulp.src(paths.package.src)
  .pipe(greplace('_ac', info.name))
  .pipe(gzip(`${info.name}.zip`))
  .pipe(gulp.dest(paths.package.dest));
}

export const dev = gulp.series(clean, gulp.parallel(styles, scripts, images, other), serve, watch);
export const prod = gulp.series(clean, gulp.parallel(styles, scripts, images, other));
export const bundle = gulp.series(prod,compress);
export default dev;