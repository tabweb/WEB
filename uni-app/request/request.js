/*
graceUI-JS - 网络请求工具
link : graceui.hcoder.net
author : 5213606@qq.com 深海

版权声明 : 
GraceUI 的版权约束是不能转售或者将 GraceUI 直接发布到公开渠道！
侵权必究，请遵守版权约定！
*/
const sys=uni.getSystemInfoSync()
var sys_model=sys.platform
var sys_platformtype=''
var sys_edition='2.0.48'
// #ifdef APP-PLUS
	// sys_platformtype='app'
	// plus.runtime.getProperty(plus.runtime.appid,function(res){
	// 			sys_edition=res.version;
	// 			});
// #endif
// #ifdef H5
	sys_platformtype='web'
// #endif
// #ifdef MP-WEIXIN
	sys_platformtype='wechat'
// #endif

var sys_platform='1'


function msg_show (msg){
	if(typeof msg==='object'){
		if(msg.type===1){
			uni.showModal({
				content:msg.content,
				// showCancel:msg.showCancel===0?false:true,
				showCancel:false,
				confirmText:'知道了',
			});
		}else if(msg.type===2){
			uni.showModal({
				content:msg.content,
				showCancel:msg.showCancel===0?false:true,
				success: function (res) {
					if (res.confirm) {
						console.log('用户点击确定');
						uni.redirectTo({
							url:msg.page,
							});
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		}else if(msg.type===3){
			uni.showModal({
				content:msg.content,
				showCancel:msg.showCancel===0?false:true,
				success: function (res) {
					if (res.confirm) {
						console.log('用户点击确定');
						uni.navigateTo({
							url:msg.page,
							});
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		}else if(msg.type===4){
			uni.showModal({
				content:msg.content,
				showCancel:msg.showCancel===0?false:true,
				success: function (res) {
					if (res.confirm) {
						console.log('用户点击确定');
						uni.redirectTo({
							url:'/pages/web_view/web_view?url='+msg.url+'?token='+uni.getStorageSync('user_token'),
							});
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		}
	}else if(typeof msg==='string'){
		uni.showToast({title:msg, icon:"none"});
	}
}


module.exports = {
	
	get : function(url, data, callback, headers){
		uni.request({
			url      : url,
			data     : data,
			method   : "GET",
			dataType : "json",
			header   : headers,
			success  : (res) => {callback(res.data);},
			fail     : () => {uni.showToast({title:"网络请求失败", icon:"none"});}
		});
	},
	
	post : function(url, data, headers, callback,is_back=''){
		var contentType='json';
		headers['token']=uni.getStorageSync('user_token');//登录token
		headers['edition']=sys_edition;//版本号 [1.0/2.0]
		headers['platformtype']=sys_platformtype;//商户类型[app/wechat/web]
		headers['platform']=sys_platform;//商户id[1/2]
		headers['model']=sys_model;//设备型号[ios/android/web]
		switch(contentType){
			case "form" :
				var headerObj = {'content-type' : 'application/x-www-form-urlencoded'};
			break;
			case "json" : 
				var headerObj = {'content-type' : 'application/json'};
			break;
			default :
				var headerObj = {'content-type' : 'application/json'};
		}
		// for(var k in headers){headerObj[k] = headers[k];}//将headers参数放到headerObj里
		for(var k in headers){data[k] = headers[k];}//将headers参数放到data里
		// console.log(headerObj);
		uni.showLoading({
		    title: '加载中',
			mask:true,
		});
		uni.request({
			url      : url,
			data     : data,
			method   : "POST",
			dataType : "json",
			header   : headerObj,
			success  : (res) => {
				console.log(url);
				console.log('headerObj',headerObj);
				console.log('data',data);
				console.log(res);
				if(res.statusCode!=200){
					msg_show('系统繁忙，请稍后再试')
				}else{
					if (res.data.code===200){
						uni.hideLoading();
						callback(res.data);
						}else if(res.data.code===100 || res.data.code===111 ){
							uni.hideLoading();
							msg_show(res.data.msg);
							uni.navigateTo({
								url:'/pages/login/login'},
								);
						}else{
							uni.hideLoading();
							msg_show(res.data.msg);
							console.log(res.data);
						}
				}

				
				},
			fail     : () => {
				uni.showToast({title:"网络请求失败", icon:"none"});
				}
		});
	},
	mypost:function(url,data,sucesss,fail){
		var contentType='json';
		var headers = {
			
		};
		headers['token']=uni.getStorageSync('user_token');//登录token
		headers['edition']=sys_edition;//版本号 [1.0/2.0]
		headers['platformtype']=sys_platformtype;//商户类型[app/wechat/web]
		headers['platform']=sys_platform;//商户id[1/2]
		headers['model']=sys_model;//设备型号[ios/android/web]
		switch(contentType){
			case "form" :
				var headerObj = {'content-type' : 'application/x-www-form-urlencoded'};
			break;
			case "json" : 
				var headerObj = {'content-type' : 'application/json'};
			break;
			default :
				var headerObj = {'content-type' : 'application/json'};
		}
		// for(var k in headers){headerObj[k] = headers[k];}//将headers参数放到headerObj里
		for(var k in headers){data[k] = headers[k];}//将headers参数放到data里
		// console.log(headerObj);
		uni.showLoading({
		    title: '加载中',
			mask:true,
		});
		uni.request({
			url      : url,
			data     : data,
			method   : "POST",
			dataType : "json",
			header   : headerObj,
			success  : (res) => {
				uni.hideLoading();
				if(sucesss&&sucesss!==''){
					sucesss(res.data);
				}else{
					console.log(url);
					console.log('headerObj',headerObj);
					console.log('data',data);
					console.log(res);
					if(res.statusCode!=200){
						if(fail){
							fail(res);
						}else{
							msg_show('系统繁忙，请稍后再试')
						}
					
					}else{
						if (res.data.code===200){
							callback(res.data);
							}else if(res.data.code===100 || res.data.code===111 ){
								uni.hideLoading();
								msg_show(res.data.msg);
								uni.navigateTo({
									url:'/pages/login/login'},
									);
							}else{
								uni.hideLoading();
								msg_show(res.data.msg);
								console.log(res.data);
							}
					}
							
				}
				
				
				},
			fail     : (res) => {
				uni.hideLoading();
				if(fail){
					fail(res)
				}else{
					uni.showToast({title:"网络请求失败", icon:"none"});
				}
			
				}
		});
	},
	get_sys_edition(){
		return sys_edition;
	}
}