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

//DIRECTORY PATHS
const paths = {
  styles: {
    src: ['src/scss/pm_bundle.scss'],
    dest: 'dist/css'
  },
  images: {
    src: 'src/images/**/*.{jpg,jpeg,png,ico,svg,gif}',
    dest: 'dist/images'
  },
  scripts: {
    src: ['src/scripts/pm_bundle.js','src/scripts/pm_bundle_admin.js'],
    dest: 'dist/scripts'
  },
  views: {
    src: ['src/views/**/*'],
    dest: 'dist/'
  },
  other: {
    src: ['src/**/*','!src/{images,scripts,scss,views}','!src/{images,scripts,scss,views}/**/*'],
    dest: 'dist/'
  },
  package: {
    src: ['**/*', '!.vscode','!node_modules{,/**}','!packaged{,/**}','!src{,/**}','!dist/login{,/**}','!dist/others{,/**}','!dist/uan{,/**}','!.babelrc','!.gitignore','!gulpfile.babel.js','!package.json','!package-lock.json'],
    dest: 'packaged'
  },
  packageBH:{
    src: ['**/*','!.vscode{,/**}','!lib{,/**}','!node_modules{,/**}','!packaged{,/**}','!src{,/**}','!src/views{,/**}','!.babelrc','!.gitignore','!404.php','!archive.php','!comments.php','!footer.php','!functions.php','!gulpfile.babel.js','!header.php','!index.php','!package-lock.json','!package.json','!page.php','!screenshot.jpg','!search.php','!sidebar.php','!single.php','!style.css'],
    dest: 'packaged'
  }
};

//CLEAN THE DIST DIRECTORY
export const cleanDist = () => del(['dist']);
export const cleanPackage = () => del(['packaged']);

//A CONTSTANT TO PUSH DEV OR PROD ASSETS
//development (scss sourcemaps in devtools) or production (pure css in devtools)
const PRODUCTION = yargs.argv.prod; //I don't know how to use this.

//MANAGE SCSS
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

//JAVASCRIPT
export const scripts = () => {

  //WEBPACK STREAM OPTIONS
  var options = {
    mode: "development",
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

//MANAGE IMAGES
export const images = () => {
  return gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest))
}

//MANAGE OTHER ASSETS
export const other = () => {
  return gulp.src(paths.other.src)
  .pipe(gulp.dest(paths.other.dest));
}

//MANAGE VIEWS
export const views = () => {
  return gulp.src(paths.views.src)
  .pipe(gulp.dest(paths.views.dest));
}

//MANAGE BROWSERSYNC SERVER & INITIALIZE WORKSPACE
const bserver = browserSync.create(); 
export const serve = (done) =>  {
  bserver.init({
    port: 8081,
    //proxy: "http://local.pm/" //wordpress dev
    proxy: "http://local.pmv/"  //static layout dev for bluehost
  });
  done();
}

//HELPS THE BROWSER SYNC RELOADING PROCESS WHILE WATCHING, BELOW
export const reload = (done) => {
  bserver.reload();
  done();
}

//WATCH EVERYTHING
export const watch = () => {
  gulp.watch('src/scss/**/*.scss', styles);
  gulp.watch('src/scripts/**/*.js', gulp.series(scripts,reload));
  gulp.watch('**/*.php',reload);
  gulp.watch(paths.images.src, gulp.series(images,reload));
  gulp.watch(paths.other.src, gulp.series(other,reload));
  gulp.watch(paths.views.src, gulp.series(views,reload));
}

//CRAFT A PACKAGE FOR THE PROJECT
export const compress = () => {
  return gulp.src(paths.package.src)
  .pipe(greplace('_ac', info.name))
  .pipe(gzip(`${info.name}.zip`))
  .pipe(gulp.dest(paths.package.dest));
}

//CRAFT A PACKAGE FOR THE PROJECT SPECIFICALLY FOR BLUEHOST
export const packageBlueHost = () => {
  return gulp.src(paths.packageBH.src)
  .pipe(gzip(`pm-bluehost.zip`))
  .pipe(gulp.dest(paths.packageBH.dest));
}

export const _dev = gulp.series(cleanDist, cleanPackage, gulp.parallel(styles, scripts, images, other, views), serve, watch);
export const _prod = gulp.series(cleanDist, cleanPackage, gulp.parallel(styles, scripts, images, other, views));
export const _cleanEverything = gulp.series(cleanDist,cleanPackage);
export const _package = gulp.series(_prod,packageBlueHost);
//export const bundle = gulp.series(prod,compress);
export default _dev;