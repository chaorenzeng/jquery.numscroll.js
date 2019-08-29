## NumScroll
#### 数字滚动累加动画插件(Digital scroll cumulative animation plug-in)
1.使用前先引入jquery  (Introduce jQuery before use)  
2.加入学习Q群:814798690 (Join Learning QQ Group: 814798690)  
#### 案例展示(Case presentation)
![查看演示](https://github.com/chaorenzeng/jquery.numscroll.js/blob/master/index.gif)
#### 下载地址(Download address)
> https://github.com/chaorenzeng/jquery.numscroll.js.git
#### 快速使用(Quick use)
1.引入jquery和jquery.numscroll.js
```js
<script src="js/jquery-1.10.2.min.js" type="text/javascript" charset="utf-8"></script>
<script src="js/jquery.numscroll.js" type="text/javascript" charset="utf-8"></script>
```
2.拷贝以下布局结构 (Copy the following layout structure)
```html
<p><span id="num0"></span></p>
<p><span id="num1"></span></p>
<p><span id="num2"></span></p>
```
3.创建numscroll对象 (Create numscroll objects)
```js
$(function() {
	//num0
	var num0 = 893689,addNum0,newNum0;
	$('#num0').text(num0);
	setInterval(function() {
		addNum0 = Math.random()*1000;
		newNum0 = parseInt(num0) + parseInt(addNum0);
		num0 = newNum0;
		$('#num0').numScroll({
			number: newNum0
		})
	}, 1500)
	
	//num1
	var num1 = 893623.89,addNum1,newNum1;
	$('#num1').text(num1);
	setInterval(function() {
		addNum1 = Math.random()*1000;
		newNum1 = (parseFloat(num1) + parseFloat(addNum1)).toFixed(2);
		num1 = newNum1;
		$('#num1').numScroll({
			number: newNum1
		})
	}, 1500)
	
	//num2
	var num2 = '893692813.89',addNum2,newNum2;
	$('#num2').text(num2);
	setInterval(function() {
		addNum2 = Math.random()*10000;
		newNum2 = (parseFloat(num2) + parseFloat(addNum2)).toFixed(2);
		num2 = newNum2;
		$('#num2').numScroll({
			number: newNum2,
			symbol: true
		})
	}, 1800)
})
```
#### 支持参数(Support parameters)
可选参数 Parameter |  默认值 Default | 说明 Introduce
--        |    --   | --
number    |   0  | 显示值
step      |   1  | 步长
time      |   2000  | 限制用时(为null时不限制) Limited use time
delay     |   0     | 延迟开始 delay
symbol    |   false | 是否显示分隔符 display separators
fromZero  |   true  | 是否从0开始计数（为否时从原有值开始计数） start counting from zero
