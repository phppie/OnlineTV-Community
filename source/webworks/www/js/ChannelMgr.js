//频道源管理器
var ChannelListMgr = {
    data: [],
    loadData: function() {
        //从存储中载入数据
        var localdata = localStorage.getItem('CMDATA');
        if (localdata) {
            this.data = JSON.parse(localdata);
            return this.data.length;
        } else {
            this.data = [];
            return 0;
        }
    },
    saveData: function() {
        //将数据存入存储
        var localdata = JSON.stringify(this.data);
        localStorage.setItem('CMDATA', localdata);
    },
    list: function() {
        //获取所有频道清单
        return this.data;
    },
    add: function(name, url) {
        //根据NAME和URL添加频道
        var item = new Channel(name, url);
        this.data.push(item);
        this.saveData();
        return item.id;
    },
    remove: function(id) {
        //删除有着指定ID的频道
        var index = this.getIndexById(id);
        if (index > -1) {
            console.log(JSON.stringify(this.data[index]) + " is being deleted.");
            this.data.splice(index, 1);
            this.saveData();
        }
    },
    getIndexById: function(id) {
        //获取指定ID频道的下标
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].id === id) {
                return i;
            }
        }
        return -1;
    }
};
/*
 * 频道类
 */
function Channel(name, url) {
    this.name = name ? name : url;
    this.url = url;
    this.id = bb.guidGenerator(); // 需要BBUI.JS
}