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
var app = {
    initialize: function() {
        this.bindEvents();
    },
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        app.initBBUI();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    },
    config: {},
    loadConfig: function() {
        if (!localStorage.getItem('firstrun')) {
            //第一次安装后运行
            this.config['version'] = blackberry.app.version;
            this.config['darktheme'] = bb.device.is1280x768 ? false : true;
            this.config['wifionly'] = true;
            this.config['darkscreenbgColor'] = Theme.dark.bgcolor;
            this.config['darkscreencolor'] = Theme.dark.color;
            this.saveConfig();
            localStorage.setItem('firstrun', false);
        } else {
            //已运行过
            this._loadConfig();
        }
    },
    saveConfig: function() {
        localStorage.setItem('config', JSON.stringify(this.config));
    },
    _loadConfig: function() {
        this.config = JSON.parse(localStorage.getItem('config'));
    },
    initBBUI: function() {
        this.loadConfig();
        if (!Bbm.registered) {
            Bbm.register();
        }
        bb.init({
            controlsDark: app.config.darktheme,
            listsDark: app.config.darktheme,
            onscreenready: function(e, id) {
                bb.screen.controlColor = (app.config['darktheme']) ? 'dark' : 'light';
                bb.screen.listColor = (app.config['darktheme']) ? 'dark' : 'light';
                if (app.config.darktheme) {
                    var screen = e.querySelector('[data-bb-type=screen]');
                    if (screen) {
                        screen.style['background-color'] = app.config.darkscreenbgColor;
                        screen.style['color'] = app.config.darkscreencolor;
                    }
                    if (!document.body.classList.contains("dark")) {
                        document.body.classList.add("dark")
                    }
                } else {
                    if (document.body.classList.contains("dark")) {
                        document.body.classList.remove("dark");
                    }
                }
            },
            ondomready: function(e, id, param) {
                if (id === 'settings') {
                    otv.loadSettings(e, id, param);
                }
            }
        });
        bb.pushScreen('main.html', 'main');
        navigator.splashscreen.hide();
    }
};