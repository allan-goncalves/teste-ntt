var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');


gulp.task('compilar-less',function(){
	return gulp.src(['*.less','less/*.less'])
	.pipe(less().on('error',function(err){
		console.log(err);
	}))
	.pipe(concat('estilo.css'))
	.pipe(gulp.dest('css2'))
});

gulp.task('monitorar',function(){
	gulp.watch(['*.less','less/*.less'],gulp.series('compilar-less'));
});

gulp.task('default',gulp.series('monitorar'));