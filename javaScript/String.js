// string
/*

.indexOf(searchvalue,fromindex)	      -返回index/-1 => 返回某个指定的字符串值在字符串中首次出现的位置
.lastIndexOf()	                      -返回一个指定的字符串值最后出现的位置，在一个字符串中的指定位置从后向前搜索
.search(regexp)		                  -返回index/-1 => 检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串
.match()		                      -返回 => 在字符串内检索指定的值，或找到一个或多个正则表达式的匹配
.split()		                      -把一个字符串分割成字符串数组
.replace(regexp/substr,replacement)   -在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串
.slice()		                      -提取字符串的某个部分，并以新的字符串返回被提取的部分（含头不含尾）
.substring()	                      -提取字符串中介于两个指定下标之间的字符
.substr()		                      -在字符串中抽取从 start 下标开始的指定数目的字符
.concat()		                      -连接两个或多个字符串
.charAt()		                      -获取或返回指定下标位置的字符
.charCodeAt()		                  -返回指定位置的字符的 Unicode 编码
.fromCharCode()		                  -接受一个指定的 Unicode 值，然后返回一个字符串
.toLocaleUpperCase()		          -把字符串转换为大写
.toLocaleLowerCase()		          -把字符串转换为小写

*/


{
    // .slice(index,index-1)
    console.log('01234567'.slice(3, 5)); // 34
    // .substing(index,index-1)
    console.log('01234567'.substring(3, 5)); // 34

    // .substr(index,len)
    console.log('01234567'.substr(1, 4)); // 1234

    console.log('01234567'.split('')); // string -> array

    // indexOf lastIndexOf trim()

    // string.toLowerCase()  string.toUpperCase()
}
{
    let str = '0123ad';
    console.log(str.match(/\d/g));

    console.log(str.search(/\d/g));

    console.log(str.replace(/\d/g, 3));

    console.log(str);
}
