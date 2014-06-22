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
var UI = {
    tabs: ["div_home", "div_list", "div_fav"],
    switchtab: function(t) {
        /*
         * 切换动作栏，显示对应的区域
         */
        console.log("[动作栏] : " + t);
        //保存到存储
        localStorage.setItem('currentTab', t);

        var divid = "div" + t.substr(3);
        $.each(UI.tabs, function(i, e) {
            if (e === divid) {
                $('#' + e).show();
            } else {
                $('#' + e).hide();
            }
        });
    },
    handleChannelListClick: function() {
        /*
         * 显示指定的频道清单
         */
        var selected = $('#div_list').find('[data-bb-type=image-list]')[0];
        if (selected) {
            selected = selected.selected;
            bb.pushScreen('viewlist.html', 'list', {
                index: selected.getAttribute('data-catagory-index'),
                title: selected.getAttribute('data-bb-title'),
                img: selected.getAttribute('data-bb-img')
            });
        }
    },
    handleClick: function() {
        /*
         * 播放指定的频道清单
         */
        var selected = $('[data-bb-type=image-list]')[0];
        if (selected) {
            selected = selected.selected;
            var t = selected.getAttribute('data-bb-title');
            var u = JSON.parse(selected.getAttribute('data-list-urls'))[0];
            otv.invokeVideo(u, t, null, function(a) {
                var item = new Channel(t, u);
                HistoryMgr.add(item);
            });
        }
    },
    handleNormalClick: function(pid) {
        /*
         * 播放指定的频道清单
         */
        var selected = $('#' + pid).find('[data-bb-type=image-list]')[0];
        if (selected) {
            selected = selected.selected;
            var t = selected.getAttribute('data-bb-title');
            var u = JSON.parse(selected.getAttribute('data-list-urls'));
            otv.invokeVideo(u, t, null, function(a) {
                var item = new Channel(t, u);
                HistoryMgr.add(item);
            });
        }
    },
    handleFavRemoveButton: function() {
        var sel = $('#div_fav').find('[data-bb-type=image-list]')[0];
        if (sel) {
            var selected = sel.selected;
            var id = selected.getAttribute('data-catagory-id');
            FavMgr.remove(id);
            selected.remove();
        }
    },
    handleHistoryRemoveButton: function() {
        var sel = $('#div_home').find('[data-bb-type=image-list]')[0];
        if (sel) {
            var selected = sel.selected;
            var id = selected.getAttribute('data-catagory-id');
            HistoryMgr.remove(id);
            selected.remove();
        }
    },
    handlebtnClick: function() {
        /*
         * 添加到收藏夹
         */
        var selected = $('[data-bb-type=image-list]')[0];
        if (selected) {
            selected = selected.selected;
            var t = selected.getAttribute('data-bb-title');
            var u = JSON.parse(selected.getAttribute('data-list-urls'))[0];
            var item = new Channel(t, u);
            FavMgr.add(item);
        }
    },
    resetData: function() {
        Toast.regular("已重置为默认数据", 1000);
        ChannelListMgr.resetToDefaultChannelList();
        bb.popScreen();
    },
    addChannelList: function() {
        bb.pushScreen("addChannelList.html", "add.channellist");
    },
    addChannelListByURL: function(urlid, nameid) {
        var u = $('#' + urlid).val();
        var n = $('#' + nameid).val();
        ChannelListMgr.add(n, u, function(a) {
            if (a > 0) {
                bb.popScreen();
            } else {
                Toast.regular("所输入的频道源无法解析，请修改后重试。")
            }
        });
    },
    paste: function(id) {
        alert("待添加");
    },
    enterSettings: function() {
        bb.pushScreen("settings.html", "settings");
    },
    enterChannelManager: function() {
        bb.pushScreen("sourceManager.html", "channelManager");
    },
    refreshData: function() {
        otv.loadHome();
    },
    handleChannelMgrRemove: function() {
        var sel = $('[data-bb-type=image-list]')[0];
        if (sel) {
            var selected = sel.selected;
            var id = selected.getAttribute('data-catagory-index');
            ChannelListMgr.removeByIndex(id);
            selected.remove();
        }
    },
    handleChannelMgrClick: function() {

    }
};