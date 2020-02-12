### @extend
```scss
.btncom {
	margin-top: 70upx;
	width: 80upx;
	height: 80upx;
	border-radius: 80upx;
}
.stop {
	@extend .btncom;
	background: url(../../static/jsfun-record/stop.png) no-repeat;
	background-size: 100% 100%;
}
.paly {
	@extend .btncom;
	background: url(../../static/jsfun-record/play.png) no-repeat;
	background-size: 100% 100%;
}
```
