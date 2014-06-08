/*
 * Copyright Merrick Zhang ( anphorea@gmail.com ) , licensed under GPL v2 license.
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