/*!
 * jquery.numscroll.js -- 数字滚动累加动画插件  (Digital rolling cumulative animation)
 * version 3.0.0
 * 2019-08-08
 * author: KevinTseng < 921435247@qq.com@qq.com >
 * API文档: https://github.com/chaorenzeng/jquery.numscroll.js.git
 * 交流Q群: 814798690
 */

(function($) {
	
	$.fn.numScroll = function(options) {
		var settings = $.extend({
			'number': '0', //数值
			'step': 1, //步长
			'time': 2000, //限制用时(为0时不限制) Limited use time (0 time is not limited)
			'delay': 0, //延迟开始(ms) delay(ms)
			'symbol': false ,//是否显示分隔符 display separators
			'fromZero': true, //是否从0开始计数（为否时从原有值开始计数） Whether to start counting from zero(If not, count from the original value)
		}, options);
		settings.number = settings.number.toString(); //数值转字符串
		
		return this.each(function(){
			//初始化配置
			var $this = $(this),
				oldNum = $this.text() || '0';
			//分隔符显示判断
			if (settings.number.indexOf(',') > 0) {
				//数值含有分隔符，则默认为需要显示分隔符
				settings.symbol = true;
			}
			if (options && options.symbol===false) {
				//手动设置不显示分隔符时，不显示分隔符
				settings.symbol = false;
			}
			//显示初始值
			var targetNum = settings.number.replace(/,/g, '') || 0,
				oldRealNum = oldNum.replace(/,/g, '');
			if(settings.symbol){
				$this.text(oldNum);
			}else{
				$this.text(oldRealNum);
			}
			//判断从0开始计数或从原有值开始计数
			if (settings.fromZero) {
				oldRealNum = 0;
			}
			//非数值处理
			if(isNaN(oldRealNum)){
				oldRealNum = 0;
			}
			if(isNaN(targetNum)){
				return;
			}
			//初始值目标值准备
			targetNum = parseFloat(targetNum);
			oldRealNum= parseFloat(oldRealNum);
			var tempNum = oldRealNum,
				numIsInt = isInt(targetNum),
				numIsFloat = isFloat(targetNum),
				step = !settings.time?1:Math.abs(targetNum-oldRealNum) * 10 / settings.time,
				numScroll;
			//更新方法
			function numInitUpdate() {
				var showNum = '';
				//整型或浮点型
				if (numIsInt) {
					showNum = Math.floor(tempNum);
				} else if (numIsFloat != -1) {
					showNum = tempNum.toFixed(numIsFloat)
				} else {
					showTarget(targetNum);
					clearInterval(numScroll);
					return;
				}
				//千位符显示
				if (settings.symbol) {
					showNum = formatSymbol(showNum);
				}
				$this.text(showNum);
			}
			
			//最终显示
			function showTarget(num) {
				var targetNum = num.toString().replace(/,/g, '');
				if (settings.symbol) {
					targetNum = formatSymbol(targetNum);
				}
				$this.text(targetNum);
			}
			
			//定时开始
			setTimeout(function() {
				numScroll = setInterval(function() {
					numInitUpdate();
					if(oldRealNum < targetNum){
						//增
						tempNum += step;
						if (tempNum > targetNum) {
							showTarget(targetNum);
							clearInterval(numScroll);
						}
					}else{
						//减
						tempNum -= step;
						if (tempNum < targetNum) {
							showTarget(targetNum);
							clearInterval(numScroll);
						}
					}
				}, 1);
			}, settings.delay);
			
		})
	};

	/*	
	 * 判断数值是否为整数
	 * @param num {Number} 数值
	 * @return {Boolean} 真假
	 */
	function isInt(num) {
		var res = false;
		try {
			if (String(num).indexOf(".") == -1 && String(num).indexOf(",") == -1) {
				res = parseInt(num) % 1 === 0 ? true : false;
			}
		} catch (e) {
			res = false;
		}
		return res;
	}

	/*	
	 * 判断数值是否为小数
	 * @param num {Number} 数值
	 * @return {Number} 小数位数(-1时不是小数)
	 */
	function isFloat(num) {
		var res = -1;
		try {
			if (String(num).indexOf(".") != -1) {
				var index = String(num).indexOf(".") + 1; //获取小数点的位置
				var count = String(num).length - index; //获取小数点后的个数
				if (index > 0) {
					res = count;
				}
			}
		} catch (e) {
			res = -1;
		}
		return res;
	}

	/*	
	 * 显示数值千分位分隔符
	 * @param num {Number} 数值
	 * @return {String} 含分隔符数值
	 */
	function formatSymbol(num) {
		var res = '';
		var str = num + '',
			strLeft = '',
			strRight = '';
		var floatNum = isFloat(num);
		if (floatNum != -1) {
			//有小数时进行切割
			var splitStr = str.split('.');
			strLeft = splitStr[0];
			strRight = splitStr[1];
		} else {
			strLeft = str;
		}
		//整数部分每隔3位添加分隔符
		res = strLeft.split("").reverse().reduce(function(prev, next, index) {
			return ((index % 3) ? next : (next + ',')) + prev;
		})
		//拼接小数部分
		if (strRight != '') {
			res = res + '.' + strRight;
		}
		return res;
	}
})(jQuery);
