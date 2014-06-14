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
var otv = {
    init: function() {
        ChannelListMgr.loadData();
        FavMgr.loadData();
    },
    loadSettings: function(e, id, p) {
        /*
         * 载入并设置“设置”页的选项值
         */
    },
    loadHome: function(e, id, p) {
        ChannelMgr.loadChannelsFromSourceURIHelper(function(v) {
            var l = ChannelMgr.getCatagoryList();
            var items = [];
            $.each(l, function(i, e) {
                var item = document.createElement('div');
                item.setAttribute('data-bb-type', 'item');
                item.setAttribute('data-catagory-index', i);
                item.setAttribute('urls', JSON.stringify(e['url']));
                item.setAttribute('data-bb-title', e['title']);
                item.innerHTML = '当前有' + e['channel'].length + '个频道';
                item.setAttribute('data-bb-img', e['img']);
                item.onclick = UI.handleChannelListClick;
                items.push(item);
            })
            $('#div_list').find('[data-bb-type=image-list]')[0].refresh(items);
        });
    },
    loadHomeStatic: function(e, id, p) {

    },
    loadListStatic: function(e, id, p) {
        $('[data-bb-type=title]', e).attr('data-bb-img', p["img"]).attr('data-bb-caption', p["title"]);
    },
    loadList: function(e, id, p) {
        var cat = ChannelMgr.getCatagoryList()[p['index']];
        var items = [];
        $.each(cat.channel, function(i, e) {
            var item = document.createElement('div');
            item.setAttribute('data-bb-type', 'item');
            item.setAttribute('data-list-index', i);
            item.setAttribute('data-list-urls', JSON.stringify(e['url']));
            item.setAttribute('data-bb-title', e['title']);
            if (e['url'].length > 1) {
                item.innerHTML = '当前有' + e['url'].length + '个频道源，长按以使用其他源';
            } else {
                item.innerHTML = "";
            }
            if (e['img'])
                item.setAttribute('data-bb-img', e['img']);
            item.onclick = UI.handleClick;
            items.push(item);
        });
        $('[data-bb-type=image-list]')[0].refresh(items);
    },
    invokeVideo: function(uri, title, image, callback) {
        /*
         * 调用系统播放器进行视频播放
         */
        var options = {};
        if (title) {
            if (blackberry.system.language === 'zh-CN' || blackberry.system.language === 'zh-TW') {
                options['contentTitle'] = title;
            } else {
                options['contentTitle'] = utf8(title);
            }
        }
        if (uri) {
            options['contentUri'] = uri;
        }
        if (image) {
            options['imageUri'] = image;
        }

        blackberry.invoke.card.invokeMediaPlayer(options, function(data) {
            console.log('invoked ' + JSON.stringify(data));
            if (callback) {
                callback(true);
            }
        },
                function(reason) {
                    console.warn(reason);
                    if (callback) {
                        callback(false);
                    }
                },
                function(cb) {
                    if (cb) {
                        Toast.regular(cb, 3000);
                        if (callback) {
                            callback(false);
                        }
                    } else {
                        console.log("invoke success");
                        if (callback) {
                            callback(true);
                        }
                    }
                }
        );
    }
};