//cookie
function setCookie(name, value, expiresNum) {//属性，属性值，失效时间
	var cookieTxt = encodeURIComponent(name)+"="+encodeURIComponent(value);
	var date = new Date();
	date.setDate(date.getDate()+expiresNum);
	cookieTxt += "; expires="+date;
	document.cookie = cookieTxt;
}
function getCookie(name) {
	var str = decodeURIComponent(document.cookie);
	var arr = str.split("; ");
	for(var i=0; i<arr.length; i++) {
		var arr1 = arr[i].split("=");
		if(name == arr1[0]) {
			return arr1[1];
		}
	}
	return "";
}
function removeCookie(name) {
	setCookie(name, "", -1);
}

//ajax
function urlParamsHandler(o) {
	var arr = [];
	for(var key in o) {
		arr.push(encodeURIComponent(key)+"="+encodeURIComponent(o[key]));
	}
	return arr.join("&");
}
function ajax(o) {//对象
	var xhr = null;
	if(window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}	
	o.method = o.method || "get";	
	o.isAsync = (typeof o.isAsync) == "boolean"? o.isAsync : true;
	if(o.method.toLowerCase()=="get") {
		if(o.data) {
			o.url += "?t="+new Date().getTime()+"&"+urlParamsHandler(o.data);
		} else {
			o.url += "?t="+new Date().getTime();
		}
		xhr.open("get", o.url, o.isAsync);
		xhr.send();
	} else if(o.method.toLowerCase()=="post") {
		xhr.open("post", o.url, o.isAsync);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(urlParamsHandler(o.data));
	}		
	xhr.onreadystatechange = function() {
		if(xhr.readyState==4) {
			if(xhr.status==200) {				
				o.success && o.success(xhr.responseText);
			} else {				
				o.error && o.error(xhr.responseText);
			}
		}
	}
}

//perfectMove
function startMove(obj, json, fn) {//对象，json格式{left:目标位置...}，函数：跟着动（链式）
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var bStop = true;
		for(var attr in json) {
			var iCur = 0;
			if(attr=="opacity") {
				iCur = parseInt(parseFloat(getStyle(obj, attr))*100);
			} else {
				iCur = parseInt(getStyle(obj, attr));
			}

			var iSpeed = (json[attr]-iCur)/8;
			iSpeed = iSpeed>0? Math.ceil(iSpeed) : Math.floor(iSpeed);
			if(iCur!=json[attr]) {
				bStop = false;
			}
			if(attr=="opacity") {
				obj.style.filter = "alpha(opacity:"+(iCur+iSpeed)+")"
				obj.style.opacity = (iCur + iSpeed)/100;
			} else {
				obj.style[attr] = iCur + iSpeed + "px";
			}
		}
		if(bStop) {
			clearInterval(obj.timer);
			if(fn) {
				fn();
			}
		}
	}, 30)
}

//getStyle
function getStyle(obj, name) {//对象，对象的属性
	if(window.getComputedStyle) {
		return getComputedStyle(obj, null)[name];
	} else {
		return obj.currentStyle[name]
	}
}

//connectMove
function startMove1(obj, attr, iTarget, fn) {//对象，属性，属性值，函数：跟着动（链式）
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var iCur = 0;
		if(attr=="opacity") {
			iCur = parseInt(parseFloat(getStyle(obj, attr))*100);
		} else {
			iCur = parseInt(getStyle(obj, attr));
		}
		var iSpeed = (iTarget-iCur)/8;
		iSpeed = iSpeed>0? Math.ceil(iSpeed) : Math.floor(iSpeed);
		if(iCur==iTarget) {
			clearInterval(obj.timer);
			if(fn) {
				fn();
			}
		} else {
			if(attr=="opacity") {
				obj.style.filter = "alpha(opacity:"+(iCur+iSpeed)+")";
				obj.style.opacity = (iCur+iSpeed)/100;
			} else {
				obj.style[attr] = iCur + iSpeed + "px";
			}
		}
	}, 30)
}

//getByClass
function getByClass(oParent, sClass) {//父元素，子元素
	var aEle = oParent.getElementsByTagName("*");
	var aResult = [];
	for(var i=0; i<aEle.length; i++) {
		if(aEle[i].className == sClass) {
			aResult.push(aEle[i]);
		}
	}
	return aResult;
}

//$
function $(id) {//id名
	return document.getElementById(id);
}