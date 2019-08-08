/*!
 * jquery.numscroll.js -- 数字滚动累加动画插件  (Digital rolling cumulative animation)
 * version 2.0.0
 * 2019-08-08
 * author: KevinTseng < 921435247@qq.com@qq.com >
 * API文档: https://github.com/chaorenzeng/jquery.numscroll.js.git
 * 交流Q群: 814798690
 */

(function($) {

	$.fn.numScroll = function(options) {

		var settings = $.extend({
			'time': 1500, //持续时间 durationd
			'delay': 0, //延迟开始 delay
			'symbol': false //是否显示分隔符 display separators
		}, options);

		return this.each(function() {
			//初始化
			var $this = $(this);
			var $settings = settings;
			var source = $this.attr("data-num") || $this.text();
			var temp = 0;
			$this.text(temp);
			//分隔符显示判断
			if (source.indexOf(',') > 0) {
				//数值含有分隔符，则默认为需要显示分隔符
				$settings.symbol = true;
			}
			if (options && !options.symbol) {
				//手动设置不显示分隔符时，不显示分隔符
				$settings.symbol = false;
			}
			//分隔符过滤
			var num = source.replace(/,/g, ''),
				numScroll;
			var numIsInt = isInt(num),
				numIsFloat = isFloat(num),
				step = (num / $settings.time) * 10; //步长

			//增长方法
			function numInitGrow() {
				var showNum = '';
				//整型或浮点型
				if (numIsInt) {
					showNum = Math.floor(temp);
				} else if (numIsFloat != -1) {
					showNum = temp.toFixed(numIsFloat)
				} else {
					showTarget(source);
					clearInterval(numScroll);
					return;
				}
				//千位符显示
				if ($settings.symbol) {
					showNum = formatSymbol(showNum);
				}
				$this.text(showNum);
			}

			//最终显示
			function showTarget(num) {
				var targetNum = num.replace(/,/g, '');
				if ($settings.symbol) {
					targetNum = formatSymbol(targetNum);
				}
				$this.text(targetNum);
			}

			//定时开始
			setTimeout(function() {
				numScroll = setInterval(function() {
					numInitGrow();
					temp += step;
					if (temp > num) {
						showTarget(source);
						clearInterval(numScroll);
					}
				}, 1);
			}, $settings.delay);
		});
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
