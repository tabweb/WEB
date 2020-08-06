[TOC]

## authorize 授权

### 授权地址

-   [小程序 判断是否为新用户 登陆授权 封装 request 请求](https://www.jianshu.com/p/ed225b88bb9a)

```js
function login() {
	return new Promise(function (resolve, reject) {
		wx.login({
			success: function (res) {
				if (res.code) {
					resolve(res);
				} else {
					reject(res);
				}
			},
			fail: function (err) {
				reject(err);
			},
		});
	});
}
```

### button @getuserinfo 按钮获取用户信息

用户点击该按钮时，会返回获取到的用户信息，从返回参数的 detail 中获取到的值同 uni.getUserInfo

-   [uni button](https://uniapp.dcloud.io/component/button)
-   [wx button](https://developers.weixin.qq.com/miniprogram/dev/component/button.html)

### uni.getUserInfo(OBJECT)

获取用户信息。

### uni.login(OBJECT) 调用接口获取登录凭证（code）

调用接口获取登录凭证（code）。通过凭证进而换取用户登录态信息，包括用户的唯一标识（openid）及本次登录的会话密钥（session_key）等。用户数据的加解密通讯需要依赖会话密钥完成。更多使用方法详见 小程序登录。

### uni.checkSession(OBJECT) 检查登录状态是否过期

uni.checkSession

> 检查登录状态是否过期

wx.checkSession(Object object)

> 检查登录态是否过期。
> 通过 wx.login 接口获得的用户登录态拥有一定的时效性。用户越久未使用小程序，用户登录态越有可能失效。反之如果用户一直在使用小程序，则用户登录态一直保持有效。具体时效逻辑由微信维护，对开发者透明。开发者只需要调用 wx.checkSession 接口检测当前用户登录态是否有效。
> 登录态过期后开发者可以再调用 wx.login 获取新的用户登录态。调用成功说明当前 session_key 未过期，调用失败说明 session_key 已过期。更多使用方法详见 小程序登录。

### uni.getSetting(OBJECT) 获取用户的当前设置。

-   [uni.getSetting](https://uniapp.dcloud.io/api/other/setting?id=getsetting)
-   [wx.getSetting](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/setting/wx.getSetting.html)
    -   [授权](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html)

uni.getSetting

> 获取用户的当前设置。

wx.getSetting

> 获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限。

### uni.authorize(OBJECT) 提前向用户发起授权请求

-   [wx.authorize](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/authorize/wx.authorize.html)

uni.authorize

> 提前向用户发起授权请求。调用后会立刻弹窗询问用户是否同意授权小程序使用某项功能或获取用户的某些数据，但不会实际调用对应接口。如果用户之前已经同意授权，则不会出现弹窗，直接返回成功。如果用户之前拒绝了授权，此接口会直接进入失败回调，一般搭配 uni.getSetting 和 uni.openSetting 使用。

## qq 单独授权

### qq 授权添加好友 （授权别人可以添加我为好友）

-   [QQ 小程序加 QQ 群和加好友](https://blog.csdn.net/weixin_45514169/article/details/107397007)
-   [授权添加好友 setting.addFriend](https://q.qq.com/wiki/develop/game/frame/open-ability/authorize.html)
-   [addFriend](https://q.qq.com/wiki/develop/miniprogram/component/form/button.html)

```vue
<template>
	<view class="bg-back">
		<button open-type="addFriend" :open-id="openId" @addfriend="addfriend">
			<text>点我加好友</text>
		</button>
	</view>
</template>
<script>
import { authAddFriend } from "@/utils/authorize";
export default {
	props: {
		openId: {
			type: String,
			default: "",
		},
	},
	components: {},
	data() {
		return {};
	},
	watch: {},
	computed: {},
	methods: {
		addfriend(e) {
			if (e.detail.errMsg != "addFriend:ok") {
				this.$tip.showToast("对方未授权添加好友权限");
				return;
			}
			authAddFriend().catch((err) => {
				this.$tip.showToast("qq授权错误");
			});
		},
	},
	created() {},
	mounted() {},
};
</script>
<style lang="scss" scoped></style>
```
