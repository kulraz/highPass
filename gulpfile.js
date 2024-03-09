const { src, dest, series, watch } = require('gulp')
const concat = require('gulp-concat')
const htmlMin = require('gulp-htmlmin')
const autoprefix = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const svgSprite = require('gulp-svg-sprite')
const images = require('gulp-image')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify-es').default
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug')
const order = require("gulp-order");
const del = require('del')
const notify = require('gulp-notify')
const sourcemaps = require('gulp-sourcemaps')
const browserSync = require('browser-sync').create()

const clean = () => {
  return del([
    'dist'
  ])
}

const resources = () => {
  return src('src/resources/**')
  .pipe(dest('dist'))
}

const styles = () => {
  return src('src/styles/**/*.scss')
  .pipe(sass())
  .pipe(concat('main.css'))
  .pipe(autoprefix({
    cascade: false
  }))
  .pipe(cleanCSS({
    level: 2
  }))
  .pipe(dest('dist'))
}

const stylesDev = () => {
  return src('src/styles/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(order([
    "src/styles/style.scss",
    "src/styles/**.scss",
    "src/styles/media.scss"
  ]))
  .pipe(sass())
  .pipe(concat('main.css'))
  .pipe(sourcemaps.write())
  .pipe(dest('dist'))
  .pipe(browserSync.stream())
}

const addNormalize = () => {
  return src('src/styles/normalize.css')
  .pipe(dest('dist'))
}

const addFonts = () => {
  return src('src/fonts/**')
  .pipe(dest('dist/fonts'))
}

const htmlMinify = () => {
  return src('src/**/*.pug')
    .pipe(pug())
    .pipe(htmlMin({
      collapseWhitespace: true,
    }))
    .pipe(dest('dist'))
}

const htmlDev = () => {
  return src('src/**/*.pug')
  .pipe(pug())
  .pipe(dest('dist'))
  .pipe(browserSync.stream())
}

const sprite = () => {
  return src('src/images/svg/**/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(dest('dist/images'))
}

const scripts = () => {
  return src([
    'src/js/main.js',
    'src/js/components/**/*.js'
  ])
  .pipe(babel({
    presets: [
      '@babel/env'
    ]
  }))
  .pipe(concat('app.js'))
  .pipe(uglify().on('error', notify.onError()))
  .pipe(dest('dist'))
}

const scriptsDev = () => {
  return src([
    'src/js/main.js',
    'src/js/components/**/*.js'
  ])
  .pipe(sourcemaps.init())
  .pipe(concat('app.js'))
  .pipe(sourcemaps.write())
  .pipe(dest('dist'))
  .pipe(browserSync.stream())
}

const imgMin = () => {
  return src([
    'src/images/**/*.jpg',
    'src/images/*.svg',
    'src/images/**/*.png',
    'src/images/**/*.jpeg'
  ])
  .pipe(images())
  .pipe(dest('dist/images'))
}

const imgDev = () => {
  return src([
    'src/images/**/*.jpg',
    'src/images/*.svg',
    'src/images/**/*.png',
    'src/images/**/*.jpeg'
  ])
  .pipe(dest('dist/images'))
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
}

watch('src/**/*.pug', htmlDev)
watch('src/styles/**/*.scss', stylesDev)
watch('src/images/svg/**/*.svg', sprite)
watch('src/js/**/**/*.js', scriptsDev)
watch('src/resources/**', resources)
watch('src/images/', imgDev)

exports.build = series(clean, resources, htmlMinify,addNormalize, addFonts, styles, imgMin, sprite, scripts, watchFiles)
exports.dev = series(clean, resources, htmlDev,addNormalize,addFonts, stylesDev, imgDev, sprite, scriptsDev, watchFiles)
