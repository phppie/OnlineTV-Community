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