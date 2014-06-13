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