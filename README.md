## NumScroll
#### 数字滚动累加动画插件 
1.使用前先引入jquery  
2.前端学习群:814798690
#### 快速使用
1.引入jquery和jquery.numscroll.js
```js
<script src='http://code.jquery.com/jquery-2.1.1.min.js' type='text/javascript'></script>
<script src="js/jquery.numscroll.js" type="text/javascript" charset="utf-8"></script>
```
2.拷贝以下布局结构
```html
<!--默认写法-->
<span class="num">888888</span>
<!--推荐写法-->
<span class="num" data-num="888888"></span>
```
3.创建numscroll对象:
```js
$(".num").numScroll();
```
#### API文档
可选参数  |  默认值 | 说明
--        |    --   | --
time      |   1500  | 滚动总时长
delay     |   0     | 延迟启动时长

#### 案例展示
![查看演示](https://github.com/chaorenzeng/jquery.numscroll.js/blob/master/index.gif)
