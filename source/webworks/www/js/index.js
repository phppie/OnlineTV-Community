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
            this.config['darktheme'] = true;
            this.config['wifionly'] = false;
            this.config['firstrun'] = true;
            this.config['darkscreenbgColor'] = '#262626';
            this.config['darkscreencolor'] = '#88919A';
            this.saveConfig();
            localStorage.setItem('firstrun', this.config['version']);
        } else {
            //已运行过
            this._loadConfig();
            if (this.config.version !== blackberry.app.verison) {
                //升级判定，保存的版本号不一致，说明版本已变更
                this.config['firstrun'] = true;
            }
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
                    app.loadSettings(e);
                }
            }
        });
        if (app.config.darktheme) {
            document.body.style['background-color'] = app.config.darkscreenbgColor;
            document.body.style['color'] = app.config.darkscreencolor;
        }
        bb.pushScreen('main.html', 'main');
        navigator.splashscreen.hide();
    },
    loadSettings: function(e) {
    }
};