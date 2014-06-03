var FavMgr = {
    data: [],
    add: function(c) {
        if (c) {
            this.data.push(c);
            this.saveData();
        }
    },
    remove: function(id) {
        var index = this.getIndexById(id);
        if (index > -1) {
            var item = this.data.splice(index, 1);
            this.saveData();
            return item;
        } else {
            return null;
        }
    },
    clear: function() {
        localStorage.removeItem("FAVDATA");
        this.loadData();
    },
    export: function() {
        return JSON.stringify(this.data);
    },
    exportToFile: function(filename) {
        console.error("exportToFile not implemented.");
    },
    getIndexById: function(id) {
        //获取指定ID频道的下标
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].id === id) {
                return i;
            }
        }
        return -1;
    },
    loadData: function() {
        var localdata = localStorage.getItem("FAVDATA");
        if (localdata) {
            this.data = JSON.parse(localdata);
        } else {
            this.data = [];
        }
    },
    saveData: function() {
        localStorage.setItem("FAVDATA", JSON.stringify(this.data));
    }
}


function Channel(name, urls) {
    this.name = name;
    this.urls = urls;
    this.id = bb.guidGenerator();
}