/*
Copyright 2014 CBDA (China BlackBerry Developers Association)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/*
 * 频道管理器，用于从频道源管理器中取出源，并进行解析
 * @type type
 */
var ChannelMgr = {
    data: {},
    /*
     * 解析指定的URL为JSON对象
     * @param {type} url URL
     * @param {type} callback 回调函数，参数为null或者JSON对象。
     * @returns {undefined}
     */
    parse: function(url, callback) {
        $.getJSON(url).done(function(d) {
            callback(d);
        }).fail(function(e) {
            if (callback) {
                callback(null);
            }
        });
    },
    /*
     * 载入全部数据源并解析
     * @param {type} callback 参数1：当前解析的源序号；参数2：源总数
     * @returns {undefined}
     */
    loadChannelsFromSourceURI: function(callback) {
        var sources = ChannelListMgr.list();
        for (var i = 0; i < sources.length; i++) {
            //遍历每个源，取出数据
            this.parse(sources[i], function(d) {
                if (d) {
                    if (d['version'] && d['format'].match('^SEF') && d['catagory'] && d['catagory'].length > 0) {
                        //判断有效性
                        $.extend(ChannelMgr.data, d);
                    }
                }
                if (callback) {
                    //回调当前序号和总数
                    callback(i, sources.length);
                }
            });
        }
    },
    /*
     * 这是loadChannelsFromSourceURI函数的助手函数，当所有源都解析完成时，会触发callback回调。
     * 正常情况下应使用这个函数，但可能会带来更长的延迟。
     * @param {function} callback 被调用时表示数据源已全部解析完毕
     * @returns {undefined}
     */
    loadChannelsFromSourceURIHelper: function(callback) {
        var memo = null;
        this.loadChannelsFromSourceURI(function(i, a) {
            if (!memo) {
                memo = new Array[a];
                for (var b in memo) {
                    memo[b] = false;
                }
            }
            memo[i] = true;

            //计算是否已全部解析完成
            var result = true;
            for (var b in memo) {
                result &= memo[b];
            }
            if (result && callback) {
                callback(true);
            }
        });
    },
    /*
     * 返回JSON数据中的catagory部分
     * @returns {ChannelMgrdata@pro;catagory}
     */
    getCatagoryList: function() {
        return this.data['catagory'];
    }
};