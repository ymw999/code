var $ = {
    createXHR: function() {
        if (typeof XMLHttpRequest != "undefined") {
            // your code here
            return new XMLHttpRequest();
        } else if (typeof ActiveXObject != "undefined") {
            if (typeof arguments.callee.activeXString != "string") {
                var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"];
                for (i = 0, len = versions.length; i < len; i++) {
                    try {
                        new ActiveXObject(versions[i]);
                        arguments.callee.activeXString = versions[i];
                        break;
                    } catch (ex) {}
                }
            }
            return new ActiveXObject(arguments.callee.activeXString);
        } else {
            throw new Error("No XHR object available.");
        }
    },
    formart: function(data) {
        var str = '';
        for (var key in data) {
            str += key + '=' + data[key] + '&';
        };
        return str.slice(0, -1);
    },
    ajax: function(options) {
        var defalute = {
            type: 'get',
            async: true,
            data: ''
        };
        var ops = Object.assign({}, defalute, options);
        //your code
        //1创建ajax对象
        var xhr = this.createXHR();
        //4.接受响应
        //readystate从3-4的时候触发
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status <= 300 || xhr.status === 304) {
                ops.success(xhr.responseText);
            } else {
                ops.error(new Error('Can not find url:' + ops.url));
            }
        };
        //2连接服务器
        //open(type|method,url,async同步false异步true)
        //type|method get url post send
        //url 服务器地址
        //async 
        //key=value&key=value
        var data = typeof ops.data === 'object' ? this.formart(ops.data) : ops.data;
        var url = ops.type === 'get' && data != '' ? ops.url + '?' + data : ops.url;
        xhr.open(ops.type, url, ops.async);
        //3.发送数据
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send(ops.type === 'get' ? null : data);
    }
};