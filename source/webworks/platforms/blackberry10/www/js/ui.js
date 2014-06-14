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
            var u = JSON.parse(selected.getAttribute('data-list-urls'))[0];
            otv.invokeVideo(u, selected.getAttribute('data-bb-title'), null, function(a) {

            });
        }
    }
};