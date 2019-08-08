## NumScroll
#### 数字滚动累加动画插件 
1.使用前先引入jquery  (Introduce jQuery before use)  
2.加入学习Q群:814798690 (Join Learning QQ Group: 814798690)  
#### 快速使用
1.引入jquery和jquery.numscroll.js
```js
<script src="js/jquery-1.10.2.min.js" type="text/javascript" charset="utf-8"></script>
<script src="js/jquery.numscroll.js" type="text/javascript" charset="utf-8"></script>
```
2.拷贝以下布局结构 (Copy the following layout structure)
```html
<!--默认写法 Default Writing-->
<p><span id="num0">888,692,346,813</span></p>
<!--推荐写法 Recommended Writing-->
<p><span id="num1" data-num="888692346813.89"></span></p>
<p><span id="num2" data-num="888692346813.89"></span></p>
```
3.创建numscroll对象 (Create numscroll objects)
```js
$('#num0').numScroll()
$('#num1').numScroll()
$('#num2').numScroll({
	'symbol': true
})
```
#### API文档
可选参数 Parameter |  默认值 Default | 说明 Introduce
--        |    --   | --
time      |   1500  | 持续时间 durationd
delay     |   0     | 延迟开始 delay
symbol    |   false     | 是否显示分隔符 display separators
#### 案例展示
![查看演示](https://github.com/chaorenzeng/jquery.numscroll.js/blob/master/index.gif)
