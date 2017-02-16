/**
 * Created by sophia.wang on 17/2/15.
 */
import gulp from 'gulp';
import useref from 'gulp-useref';
import size from 'gulp-size';
import rename from 'gulp-rename';
import cssmin from 'gulp-cssmin';
import jslint from 'gulp-jslint';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import clean from 'gulp-clean';
import imagemin from 'gulp-imagemin';
import gulpif  from 'gulp-if';//if判断，用来区别生产环境还是开发环境的
import rev  from 'gulp-rev';//加MD5后缀
import del from 'del';
import connect from 'gulp-connect';//javascript本地服务器
import browserSync from 'browser-sync';

const compressorOPTS = {
    sequences    : true,  // join consecutive statemets with the “comma operator”
    properties   : false,  // optimize property access: a["foo"] → a.foo
    dead_code    : true,  // discard unreachable code
    drop_debugger: true,  // discard “debugger” statements
    unsafe       : false, // some unsafe optimizations (see below)
    conditionals : true,  // optimize if-s and conditional expressions
    comparisons  : true,  // optimize comparisons
    evaluate     : true,  // evaluate constant expressions
    booleans     : true,  // optimize boolean expressions
    loops        : true,  // optimize loops
    unused       : true,  // drop unused variables/functions
    hoist_funs   : true,  // hoist function declarations
    hoist_vars   : true, // hoist variable declarations
    if_return    : true,  // optimize if-s followed by return/continue
    join_vars    : true,  // join var declarations
    cascade      : true,  // try to cascade `right` into `left` in sequences
    side_effects : true,  // drop side-effect-free statements
    warnings     : false,  // warn about potentially dangerous optimizations/code
    global_defs  : {}     // global definitions
};

gulp.task('assets', ()=> {
    return gulp.src('src/styles/images/**/*')
        .pipe(gulp.dest('./dist/styles/images'));
    //gulp.src('src/styles/fonts/**/*').pipe(gulp.dest('./dist/styles/fonts'));
});

gulp.task('style', ['assets'], () =>{
    return gulp.src(['src/styles/*.css'])
        .pipe(cssmin())
        .pipe(concat('app.css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('.tmp/styles'))
        .pipe(gulp.dest('dist/styles'));
});

// 检查js
gulp.task('lint', function() {
    return gulp.src('src/scripts/**/*.js')
        .pipe(jslint())
        .pipe(jslint.reporter('default'));
});

gulp.task('directive', () => {
    return gulp.src(['src/directives/**/*'])
        .pipe(gulp.dest('dist/directives'));
});

gulp.task('filter', () => {
    return gulp.src(['src/filters/**/*'])
        .pipe(gulp.dest('dist/filters'));
});

gulp.task('service', () => {
    return gulp.src(['src/services/**/*'])
        .pipe(gulp.dest('dist/services'));
});

gulp.task('type:parts', ['directive', 'filter', 'service'], () => {
    return gulp.src(['app/assets/**/*.*'])
        .pipe(gulp.dest('dist/assets'));
});

gulp.task("script", ['type:parts'], () => {
    return gulp.src(['src/scripts/**/*.js'])
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('.tmp/scripts'))
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task('html', ['style', 'script'], () => {
    return gulp.src(['src/*.html'])
        .pipe(useref({searchPath: ['.tmp', 'src', '.']}))
        .pipe(gulpif(function (file) {
            // return (/.*[^(\.min)]\.js$/).test(file.path);
            return (/.*\.js$/).test(file.path);
        }, uglify(compressorOPTS).on('error', (err, res) => {
            console.log(err);
        })))
        .pipe(gulpif('*.css', cssmin({discardComments: {removeAll: true}})))
        //.pipe(gulpif('*.html', $.htmlmin({collapseWhitespace: true})))
        .pipe(gulp.dest('dist'));
});

gulp.task('html:non-compile', ['style', 'script'], () => {
    return gulp.src('app/*.html')
        .pipe(useref({searchPath: ['.tmp', 'src', '.']}))
        .pipe(gulp.dest('dist'));
});

gulp.task('font', () => {
    return gulp.src(('src/styles/fonts/**/*'))
        .pipe(gulp.dest('dist/styles/fonts'));
});

gulp.task('MD5', function() {

});

/**
 * real task
 */
gulp.task('clean', () => {
    del.sync('dist/', {force: true});
});

gulp.task('build', ['html'], () => {
    return gulp.src('dist/**/*').pipe(size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], () => {
    gulp.start('build');
});

gulp.task('serve', () => {
    browserSync({
        notify: false,
        port  : 8080,
        server: {
            baseDir: ['.tmp', 'src'],
            routes : {
                '/node_modules': 'node_modules'
            }
        }
    });

    gulp.task('watch', ['style', 'script', 'font'], () => {
        gulp.watch([
            'src/*.html',
            'src/tpl/**/*',
            '.tmp/fonts/**/*'
        ]).on('change', reload);
    });

    gulp.watch('src/filter/*.js', ['filter']);
    gulp.watch('src/directives/*.js', ['directive']);
    gulp.watch('src/service/*.js', ['service']);
    gulp.watch('app/styles/**/*.css', ['style']);
    gulp.watch('app/scripts/**/*.js', ['script']);
});

gulp.task('serve:dist', () => {
    browserSync({
        notify: false,
        port  : 9090,
        server: {
            baseDir: ['dist']
        }
    });
});
