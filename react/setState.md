## setState 异步同步问题

-   [setState 异步同步问题](https://www.jianshu.com/p/3a4dcd2b5b80)

```js
constructor(props){
    super(porps);
    this.state = {
        name:"alpha"
    }
}
test(){
    this.setState({
        name:"beta"
    })
    alert(this.state.name)
}
<TouchableOpacity onPress={()=>this.text()}>
    <Text>Button</Text>
</TouchableOpacity>
```

方法 1
使用 callback 回调函数：

```js
test(){
    this.setState({
        name:"beta"
    },function(){
        alert(this.state.name)
    })
}
```

方法 2
async/await 实现异步转同步

```js
constructor(props){
    super(porps);
    this.state = {
        name:"alpha"
    }
}
setStateAsync(state){
    return new Promise((resolve,reject)=>{
        this.setState(state)
    })
}
async componentDidMount(){
    await this.setStateAsync({name:"beta"})
    console.log(this.state.name)
}
```
