/*
Copyright 2014 Merrick Zhang ( anphorea@gmail.com )

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
var i18n = {regx: /`([\w\d\s.-]*?)`/gi, process: function(e, r) {
        console.time('i18n-process-page');
        for (var n = e.querySelectorAll("[i18n]"), t = 0; t < n.length; t++) {
            for (var i = n[t], a = i18n.getAllPropsOf(i), l = a[0], g = 0; g < l.length; g++) {
                for (var o = l[g], u = o.v, c = i18n.regx.exec(u); c; )
                    u = i18n.replace(u, c[1], r), c = i18n.regx.exec(u);
                i[o.p] = u;
            }
            for (var s = a[1], g = 0; g < s.length; g++) {
                for (var o = s[g], u = o.v, c = i18n.regx.exec(u); c; )
                    u = i18n.replace(u, c[1], r), c = i18n.regx.exec(u);
                i.setAttribute([o.a], u);
            }
        }
        console.timeEnd('i18n-process-page');
    }, replace: function(e, r, n) {
        var t = i18n.get(r, n), i = new RegExp("`" + r + "`", "ig");
        return e.replace(i, t);
    }, get: function(e, r) {
        var _locale = qstr[r];
        if (_locale) {
            var n = _locale[e];
            if (n) {
                return n;
            } else {
                return qstr[qstr.default][e] ? qstr[qstr.default][e] : "[" + e + "]";
            }
        } else {
            return this.get(e, qstr.default);
        }

    }, getAllPropsOf: function(e) {
        var r = [];
        e.innerHTML && e.innerHTML.length > 2 && r.push({p: "innerHTML", v: e.innerHTML});
        var n = [];
        if (e.attributes)
            for (var t = 0; t < e.attributes.length; t++) {
                var i = e.attributes[t];
                i.value.length > 3 && n.push({a: i.name, v: i.value});
            }
        return[r, n];
    }};
var qstr = {
    default: "en-US",
    "zh-CN": {
        "intro": '合并方块，直到出现<strong>2048</strong>！',
        'keepgoing': '继续玩',
        'tryagain': '重新开始',
        'share': '分享得分',
        'expl': ' <strong class="important">如何操作:</strong><br>上下左右滑动你的<strong>手指</strong>来移动方块.当两个有相同数字的方块碰撞时，就会<strong>合并成一个方块</strong>。',
        'About': '关于',
        'Rate': '评分',
        'Settings': '设置',
        'win': '你赢了',
        'over': '游戏结束',
        'howtoplay': "游戏说明",
        'keyboard': '也可以使用键盘上的WASD键来控制移动，使用R键来重新开始游戏，使用Z键来进行撤销。',
        'dev': '开发人员',
        'test': '<b>内测小组</b>',
        'visualsettings': '主题设置',
        'dark': '主题选择',
        'back': '返回',
        'donate': '如果你喜欢这个游戏，请通过支付宝或者paypal捐赠以支持我的开发，账号均为anphorea@gmail.com，谢谢！',
        'sound': "音效设置",
        'usesound': '启用音效',
        'author': '移植自 https://github.com/gabrielecirulli/2048 ,由 Gabriele Cirulli 创建。基于 Veewo Studio 的1024和Asher Vollmer的Threes。',
        'mute': '静音',
        '_mute': '启用',
        '_reset': "重新开始",
        'status': '撤销功能状态:',
        'checking': "正在检查...",
        'unlock': '解锁撤销功能',
        'refresh': '刷新支付状态',
        'UNDO_OK': "已解锁",
        "UNDO_ERROR": "未解锁",
        'Undo': '撤销',
        'needpurchase': "请前往设置界面解锁此功能",
        'promo': "我有解锁码",
        'promotext': '您可通过支付宝向anphorea@gmail.com支付5元（备注你的KEY）来获取解锁码。如果你已经获得了解锁码，请在此输入。你的加密KEY是：',
        'unlocktitle': '使用解锁码解锁',
        'promoerr': '解锁码无效',
        'promosuccess': '解锁成功',
        'showcode': '显示解锁码',
        'okbtn': "确定",
        'urcodeis': "您的解锁码是 : ",
        'restart': '重新开始游戏？',
        'confirm': '请确认',
        'keepplaying': '继续游戏？',
        'bbm_not_connected': 'BBM尚未连接。请前往应用程序权限菜单授权本应用访问BBM，然后重新启动应用。',
        'restart_required': '您可在这里选择要使用的主题。',
        'sound_tips': '你可以在这里启用或者禁用游戏音效，也可以通过游戏下滑菜单进行控制。',
        'undo_tips': '撤销功能可以让你撤回最近的50步操作，直到游戏的初始状态。如果你中途退出过游戏，将只能撤销至最后保存的状态。',
        'invite': '邀请好友',
        'contact_author': '联系作者',
        'translator': "翻译人员",
        't_dark': "黑夜",
        "t_bright": "明亮",
        "t_vivid": "鲜艳",
        'resetgame': "重置游戏",
        'cleargame': '重置游戏数据',
        'reset_tips': '该操作会清空你的最高分记录以及撤销数据，而且一旦清空将<strong>不能还原</strong>，请谨慎使用。',
        'reset_confirm': "即将重置游戏数据，点击 [确定] 将会清空你的最高得分记录及UNDO数据，请注意，此项操作不可撤销。",
        'reset_title': "警告！",
        'reseted': '游戏数据已重置到初始值。',
        't_blue': "蓝调",
        "language": "语言(Language)"
    },
    "zh-TW": {
        "intro": '合併方塊，直到出現<strong>2048</strong>！',
        'keepgoing': '繼續玩',
        'tryagain': '重新開始',
        'share': '分享得分',
        'expl': ' <strong class="important">如何操作:</strong><br>上下左右滑動你的<strong>手指</strong>來移動方塊.當兩個有相同數字的方塊碰撞時，就會<strong>合併成一個方塊</strong>。',
        'About': '關於',
        'Rate': '評論',
        'Settings': '設置',
        'win': '你贏了',
        'over': '遊戲結束',
        'howtoplay': "遊戲說明",
        'keyboard': '也可以使用鍵盤上的W/A/S/D鍵來控制移動，使用R鍵來重新開始遊戲，使用Z鍵來進行撤銷。',
        'dev': '開發人員',
        'test': '<b>內測小組</b>',
        'visualsettings': '主題設置',
        'dark': '主題選擇',
        'back': '返回',
        'donate': '請解鎖以支持我的開發工作，謝謝！',
        'sound': "聲音設置",
        'usesound': '啓用聲音效果',
        'author': '移植自 https://github.com/gabrielecirulli/2048 ,由 Gabriele Cirulli 創建。基於 Veewo Studio 的1024和Asher Vollmer的Threes。',
        'mute': '靜音',
        '_mute': '啓用',
        '_reset': "重新開始",
        'status': '撤銷功能狀態:',
        'checking': "正在檢查...",
        'unlock': '解鎖撤銷功能',
        'refresh': '刷新支付狀態',
        'UNDO_OK': "已解鎖",
        "UNDO_ERROR": "未解鎖",
        'Undo': '撤銷',
        'needpurchase': "請前往設置界面解鎖此功能",
        'promo': "我要使用解鎖碼解鎖",
        'promotext': '您可以通過支付寶向我anphorea@gmail.com支付5元RMB（備註你的加密KEY）來獲取解鎖碼。如果你已經獲得了解鎖碼，請在此輸入。您的加密KEY是：',
        'unlocktitle': '使用解鎖碼解鎖',
        'promoerr': '解鎖碼無效',
        'promosuccess': '解鎖成功',
        'showcode': '顯示我的解鎖碼',
        'okbtn': "確定",
        'urcodeis': "您的解鎖碼是: ",
        'restart': '重新開始遊戲？',
        'confirm': '請確認',
        'keepplaying': '繼續遊戲？',
        'bbm_not_connected': 'BBM尚未連接。請前往應用程序權限設置處授權本應用訪問BBM，然後重新啓動應用程序。解鎖後仍可禁用BBM連接。',
        'restart_required': '您可在這裏選擇要使用的界面主題。',
        'sound_tips': '您可在這裏啓用或者禁用遊戲的聲音效果。',
        'undo_tips': '撤銷功能可以讓你撤回最近的50步操作，直到遊戲的初始狀態。如果你中途退出過遊戲，將只能撤銷至最後保存的狀態。',
        'invite': '邀請好友',
        'contact_author': '聯繫作者',
        'translator': "翻譯人員",
        't_dark': "黑夜",
        "t_bright": "明亮",
        "t_vivid": "鮮豔",
        'resetgame': "重置遊戲",
        'cleargame': '重置遊戲數據',
        'reset_tips': '該操作會清空你的本地最高分記錄以及撤銷數據，一旦清空將<strong>不能還原</strong>，請謹慎使用。',
        'reset_confirm': "警告：即將重置遊戲數據，點擊 [确定] 將會清空你的最高分記錄及UNDO數據，請注意：此項操作不能撤銷。",
        'reset_title': "警告！",
        'reseted': '遊戲數據已重置爲初始值。',
        't_blue': "藍色",
        "language": "語言(Language)"
    },
    'en-US': {
        "intro": 'Join the numbers and get to the <strong>2048 tile!</strong>',
        'keepgoing': 'Keep going',
        'tryagain': 'Try again',
        'share': 'Share',
        'expl': ' <strong class="important">How to play:</strong><br> Swipe your <strong>finger</strong> to move the tiles. When two tiles with the same number touch, they <strong>merge into one!</strong>',
        'About': 'About',
        'Rate': 'Rate',
        'Settings': 'Settings',
        'win': 'You win!',
        'over': 'Game over!',
        'howtoplay': "How to play",
        'keyboard': 'You can use W/S/A/D on keyboard devices to control the movement,use R to reset the game,use Z to undo.',
        'dev': 'Developer',
        'test': '<b>Test Team</b>',
        'visualsettings': 'Visual Settings',
        'dark': 'Choose a theme',
        'back': 'Back',
        'donate': 'If you like this app,please donate for my development via paypal anphorea@gmail.com , thank you.',
        'sound': "Sound Settings",
        'usesound': 'Enable Sound',
        'author': 'Ported from https://github.com/gabrielecirulli/2048 ,Created by Gabriele Cirulli. Based on 1024 by Veewo Studio and conceptually similar to Threes by Asher Vollmer.',
        'mute': 'OFF',
        '_mute': 'ON',
        '_reset': 'Reset Game',
        'status': 'Undo Feature Status:',
        'checking': "Checking...",
        'unlock': 'Unlock Undo Feature',
        'refresh': 'Refresh Payment Status',
        'UNDO_OK': "Unlocked",
        "UNDO_ERROR": "Locked",
        'Undo': 'Undo',
        'needpurchase': "Please go to Settings page to unlock this feature.",
        "promo": "I got an unlock code",
        'promotext': 'If you have the unlock code,you can type it here. Your cipher key is :',
        'unlocktitle': 'Unlock',
        'promoerr': 'Code Invalid.Unlock Fail.',
        'promosuccess': 'Feature Unlocked.',
        'showcode': 'Show Unlock Code',
        'okbtn': "OK",
        'urcodeis': "Your Unlock Code is : ",
        'restart': 'Restart game?',
        'confirm': 'Confirm',
        'keepplaying': 'Keep playing?',
        "bbm_not_connected": "BBM is not connected.",
        'restart_required': 'You can choose the theme here, no restart required.',
        'sound_tips': 'You can enable/disable the game sound here,or via the swipe-down menu.',
        'undo_tips': "Undo feature lets you undo your last 50 movements, till the very beginning of the game,or the last saved state.",
        'invite': 'Invite',
        'contact_author': 'Mail Me',
        'translator': 'Translators',
        't_dark': "Dark",
        "t_bright": "Bright",
        "t_vivid": "Vivid",
        'resetgame': "Reset Game",
        'cleargame': 'RESET GAME DATA',
        'reset_tips': 'This will clear your highscore record and undo data, which is <strong>not recoverable</strong>.',
        'reset_confirm': "This will clear your highscore record and undo data, which is not recoverable!!",
        'reset_title': "WARNING！",
        'reseted': 'Game reseted.',
        't_blue': "Blue",
        "language": "Language"
    },
    'fr-FR': {
        "intro": 'Regroupez les nombres jusqu\'à avoir 2048!',
        'keepgoing': 'Continuer',
        'tryagain': 'Réessayer',
        'share': 'Partager',
        'expl': ' <strong class="important">Comment jouer :</strong><br>Faites glisser votre doigt ‎pour bouger les cases. Quand deux cases avec le même nombre se touchent, elles fusionnent !',
        'About': 'À propos',
        'Rate': 'Noter',
        'Settings': 'Paramètres',
        'win': 'Gagné !',
        'over': 'Perdu !',
        'howtoplay': "Comment jouer",
        'keyboard': 'Vous pouvez utiliser les touches Z,S,Q,D du clavier physique pour contrôler les mouvements du jeux. La touche R permet de recommencer le jeu et W d\'utiliser Undo.',
        'dev': 'Développeur',
        'test': '<b>Équipe de tests</b>',
        'visualsettings': 'Paramètres visuels',
        'dark': 'Choisir le thème',
        'back': 'Retour',
        'donate': 'Si vous aimez cette application, s\'il vous plaît, faites un don pour mon développement via paypal anphorea@gmail.com, Merci !',
        'sound': "Paramètres sonores",
        'usesound': 'Activer le son',
        'author': 'Jeu porté de ‎https://github.com/gabrielecirulli/2048, créé par Gabriele Cirulli, basé ‎sur 1024 Veewo Studio et similaire au concept Threes ‎d\'Asher Vollmer.',
        'mute': 'OFF',
        '_mute': 'ON',
        '_reset': 'Recommencer',
        'status': 'Statut de la fonction Undo :',
        'checking': "Verification...",
        'unlock': 'Débloquer la fonction Undo',
        'refresh': 'Rafraîchir le statut de la fonction Undo',
        'UNDO_OK': "Débloquée",
        "UNDO_ERROR": "Bloquée",
        'Undo': 'Undo',
        'needpurchase': "S'il vous plaît, allez dans les paramètres pour débloquer cette fonction.",
        "promo": "J'ai un code de déblocage",
        'promotext': 'Si vous avez le code de déblocage, Tapez le ici. Votre clé de chiffrement est :',
        'unlocktitle': 'Débloquer',
        'promoerr': 'Code invalide. Déblocage échoué.',
        'promosuccess': 'Fontion débloqué.',
        'showcode': 'Voir code de déblocage',
        'okbtn': "OK",
        'urcodeis': "Votre code de déblocage est : ",
        'restart': 'Recommencer le jeu ?',
        'confirm': 'Confirmer',
        'keepplaying': 'Continuer ?',
        "bbm_not_connected": "BBM n'est pas connecté.",
        'restart_required': 'Le nouveau thème sera appliqué au prochain redémarrage de l\'application.',
        'sound_tips': 'Vous pouvez Activer/Désactiver le son du jeu ici, ou via le menu lors d\'un swipe vers le bas.',
        'undo_tips': "La fonction Undo permet d'annuler vos derniers mouvements pour revenir au début du jeu ou jusqu'au dernier déplacement sauvegardé.",
        'invite': 'Inviter',
        'contact_author': 'Contactez-moi',
        'translator': 'Traducteurs',
        't_dark': "Sombre",
        "t_bright": "Clair",
        "t_vivid": "Vif",
        'resetgame': "Réinitialiser ",
        'cleargame': 'SUPPRIMER LES DONNÉES DE JEU',
        'reset_tips': 'Cela va supprimer votre meilleur score et vos données \'undo\', qui ne sont <strong> pas récupérable </strong>.  ',
        'reset_confirm': "cela va supprimer votre meilleur score et les données \'undo\'. Ce n'est pas récupérable !!",
        'reset_title': "ATTENTION！",
        'reseted': 'Jeu réinitialiser.',
        't_blue': "Bleu"
    },
    'id-ID': {
        "intro": '<span style="font-size:0.9em">Gabungkan para angka & jadikan bernilai 2048!</span>',
        'keepgoing': 'Lanjutkan',
        'tryagain': 'Coba lagi',
        'share': 'Bagikan',
        'expl': ' <strong> Cara bermain:</strong><br> Dengan menggeser jari Anda untuk menggerakkan ubin. Ketika dua ubin bernilai sama, mereka akan bergabung menjadi satu ubin!',
        'About': 'Tentang',
        'Rate': 'Beri nilai',
        'Settings': 'Pengaturan',
        'win': 'Kamu menang!',
        'over': 'Permainan berakhir!',
        'howtoplay': "Bagaimana untuk bermain",
        'keyboard': 'Anda dapat menggunakan tombol w/s/a/d dari smartphone ber-keyboard untuk mengendalikan gerakan. Gunakan tombol R untuk mengatur ulang permainan. Gunakan tombol Z untuk membatalkan.',
        'dev': "Pengembang",
        "test": "<b>Tim penguji</b>",
        'visualsettings': 'Pengaturan visual',
        'dark': 'Pilih sebuah tema',
        'back': 'Kembali',
        'donate': 'Jika kamu menyukai aplikasi ini, tolong donasi kan untuk pengembangan aplikasi saya melalui paypal anphorea@gmail.com , Terima kasih.',
        'sound': "Pengaturan Suara",
        'usesound': 'Aktifkan suara',
        'author': 'Portingan dari https://github.com/gabrielecirulli/2048, Dibuat oleh Gabriele Cirulli. Berdasarkan 1024 oleh Veewo Studio dan secara konsep mirip dengan Threes oleh Asher Vollmer.',
        'mute': 'Mati',
        '_mute': 'Hidup',
        '_reset': 'Ulang permainan',
        'status': 'Status fitur undo:',
        'checking': "Memeriksa...",
        'unlock': 'Buka fitur undo',
        'refresh': 'Menyegarkan status pembayaran',
        'UNDO_OK': "Terbuka",
        "UNDO_ERROR": "Terkunci",
        'Undo': 'Membatalkan',
        'needpurchase': "Silakan pergi ke halaman Pengaturan untuk membuka fitur ini.",
        "promo": "Saya memiliki kode unlock",
        'promotext': 'Jika Anda memiliki kode unlock,Anda dapat mengetiknya di sini.Kunci cipher Anda:',
        'unlocktitle': 'Membuka kunci',
        'promoerr': 'Kode Tidak Sah.Membuka fitur Gagal.',
        'promosuccess': 'Fitur terbuka.',
        'showcode': 'Tampilkan Kode Unlock',
        'okbtn': "Oke",
        'urcodeis': "Kode Unlock Anda adalah : ",
        'restart': 'Ulangi Permainan ?',
        'confirm': 'Yakin',
        'keepplaying': 'Tetap bermain ?',
        "bbm_not_connected": "BBM tidak terhubung.",
        'restart_required': 'Anda dapat memilih tema di sini,tidak diperlukan restart.',
        'sound_tips': 'Anda dapat mengaktifkan / menonaktifkan suara permainan di sini,atau melalui menu geser ke bawah pada atas layar.',
        "‎undo_tips": "Fitur Undo memungkinkan Anda membatalkan 50 gerakan terakhir, sampai awal permainan, atau keadaan terakhir saat permainan disimpan.",
        'invite': 'mengundang',
        'contact_author': 'Hubungi Saya',
        'translator': 'Penerjemah',
        't_dark': "Gelap",
        "t_bright": "Cerah",
        "t_vivid": "Jelas",
        'resetgame': "Mengatur ulang permainan",
        'cleargame': 'Mengatur ulang data permainan',
        'reset_tips': 'Ini akan menghapus record skor terbesar Anda dan data undo,yang <strong> tidak dapat dikembalikan / dipulihkan </strong>.',
        'reset_confirm': "Ini akan menghapus record skor terbesar Anda dan data undo, yang tidak dapat dipulihkan!! ",
        'reset_title': "PERINGATAN！",
        'reseted': 'Permainan telah diatur ulang.',
        "t_blue": "Biru"
    },
    "de-DE": {
    }
};