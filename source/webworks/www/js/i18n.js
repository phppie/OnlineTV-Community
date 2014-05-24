var i18n = {regx: /`([\w\d\s.-]*?)`/gi, process: function(e, r) {
        for (var n = e.querySelectorAll("[i18n=true]"), t = 0; t < n.length; t++) {
            for (var i = n[t], a = i18n.getAllPropsOf(i), l = a[0], g = 0; g < l.length; g++) {
                for (var o = l[g], u = o.v, c = i18n.regx.exec(u); c; )
                    u = i18n.replace(u, c[1], r), console.log("[i18n]>>" + JSON.stringify(o) + ">>" + u), c = i18n.regx.exec(u);
                i[o.p] = u
            }
            for (var s = a[1], g = 0; g < s.length; g++) {
                for (var o = s[g], u = o.v, c = i18n.regx.exec(u); c; )
                    u = i18n.replace(u, c[1], r), console.log("[i18n]>>" + JSON.stringify(o) + ">>" + u), c = i18n.regx.exec(u);
                i.setAttribute([o.a], u)
            }
        }
    }, replace: function(e, r, n) {
        var t = i18n.get(r, n), i = new RegExp("`" + r + "`", "ig");
        return e.replace(i, t)
    }, get: function(e, r) {
        try {
            var n = qstr[r][e];
            return n ? n : "[" + e + "]"
        } catch (t) {
            return n = qstr[qstr.default][e], n ? n : "[" + e + "]"
        }
    }, getAllPropsOf: function(e) {
        var r = [];
        e.innerHTML && e.innerHTML.length > 2 && r.push({p: "innerHTML", v: e.innerHTML});
        var n = [];
        if (e.attributes)
            for (var t = 0; t < e.attributes.length; t++) {
                var i = e.attributes[t];
                i.value.length > 3 && n.push({a: i.name, v: i.value})
            }
        return[r, n]
    }};
var qstr = {
    default: "en-US",
    "zh-CN": {
        "intro": '合并方块，直到出现<strong>2048</strong>！'
        
    },
    'en-US': {
        "intro": 'Join the numbers and get to the <strong>2048 tile!</strong>'
    },
    'fr-FR': {
        "intro": 'Regroupez les nombres jusqu\'à avoir 2048!'
    }
}