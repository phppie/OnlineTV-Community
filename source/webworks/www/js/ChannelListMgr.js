/*
 * Copyright Merrick Zhang ( anphorea@gmail.com ) , licensed under GPL v2 license.
 */

//频道源管理器
var ChannelListMgr = {
    default: "local://data/default.json",
    data: [],
    /*
     * 从存储中载入数据，如果没有，就载入内置默认数据
     * 
     * @returns {ChannelListMgr.data.length}
     */
    loadData: function() {
        var localdata = localStorage.getItem('CMDATA');
        if (localdata) {
            //使用自定义源
            this.data = JSON.parse(localdata);
        } else {
            //使用默认列表
            this.data = [this.default];
        }
        console.log('[频道源管理器] 载入 '+this.data.length+" 个数据源");
        return this.data.length;
    },
    /*
     * 将数据写入存储，需要手动调用。
     * 
     * @returns {undefined}
     */
    saveData: function() {
        var localdata = JSON.stringify(this.data);
        localStorage.setItem('CMDATA', localdata);
    },
    /*
     * 返回所有频道源数据，如果还没有载入，就载入后再返回
     * 
     * @returns {Array} 一个字符串数组，包括所有的数据源。
     */
    list: function() {
        if (!this.data) {
            this.loadData();
        }
        return this.data;
    },
    /*
     * 添加频道源地址
     * @param {string} name 频道源名称
     * @param {string} url 频道源地址
     * @param {function} callback 回调函数（必须）
     * @returns {undefined}
     */
    add: function(name, url, callback) {
        /*
         * 加入频道时，对源进行验证
         */
        this.verify(url, function(r) {
            if (r) {
                //根据NAME和URL添加频道
                var item = new ChannelList(name, url);
                this.data.push(item);
                this.saveData();
                if (callback) {
                    callback(item.id);
                }
            } else {
                if (callback) {
                    callback(-1);
                }
            }
        });
    },
    /*
     * 验证数据源是否合法
     * @param {type} url 数据源地址
     * @param {type} callback 回调函数（必须）
     * @returns {undefined} 
     */
    verify: function(url, callback) {
        //检查源文件是否合法
        $.getJSON(url).done(function(d) {
            if (d['version'] && d['format'].match('^SEF') && d['catagory'] && d['catagory'].length > 0) {
                callback(true);
            }
        }).fail(function(e) {
            callback(false);
        });
    },
    /*
     * 删除指定ID的数据源，并写入存储
     * @param {type} id 数据源ID
     * @returns {undefined}
     */
    remove: function(id) {
        //删除有着指定ID的频道
        var index = this.getIndexById(id);
        if (index > -1) {
            console.log(JSON.stringify(this.data[index]) + " is being deleted.");
            this.data.splice(index, 1);
            this.saveData();
        }
    },
    /*
     * 根据数据源ID查找数组下标ID，内部方法，外部不需要调用。
     * 
     * @param {type} id 这里的ID参数是数据源的GUID
     * @returns {Number} 返回数组下标ID
     */
    getIndexById: function(id) {
        //获取指定ID频道的下标
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].id === id) {
                return i;
            }
        }
        return -1;
    }
};
/*
 * 频道类
 */
function ChannelList(name, url) {
    this.name = name ? name : url;
    this.url = url;
    this.id = bb.guidGenerator(); // 需要BBUI.JS
}