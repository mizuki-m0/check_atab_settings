$(function () {
    //ページ読み込み時にURLパラメーターを確認
    var params = new Object;
    var url_param_split = location.search.substring(1).split('&');
    for (var i = 0; url_param_split[i]; i++) {
        var imems = url_param_split[i].split('=');
        params[imems[0]] = imems[1];
    }

    //パラメーターがある場合に表示を反映
    if (Object.keys(params).length) {
        Object.keys(params).forEach(function (element) {
            var val = this[element];
            $("#" + element).val(val);
        }, params);

        draw_settings(params);
    };

    //判別ボタン押下時
    $('#check_settings').on('click', function () {
        var check_items = new Object();
        $('input[type="number"]').each(function () {
            if (this.value != "") {
                check_items[this.id] = this.value;
            }
        });

        draw_settings(check_items);

        var url_param = "?";

        Object.keys(check_items).forEach(function (element) {
            var val = this[element];
            url_param += element + "=" + val + "&";
        }, check_items);

        url_param = url_param.slice(0, -1);
        history.pushState(null, null, url_param);
    });

    //クリアボタン押下時
    $('#clear_btn').on('click', function () {
        if (!confirm('本当にクリアしますか？')) {
            return false;
        } else {
            $('input[type="number"]').each(function () {
                this.value = "";
            });
            history.pushState(null, null, "?");
            draw_settings([]);
        }
    });

    //設定を確認&表示を反映させる関数
    function draw_settings(check_items) {
        var result = checkSettings(check_items);

        $("#s1").text(result[0]);
        $("#s2").text(result[1]);
        $("#s5").text(result[2]);
        $("#s6").text(result[3]);
    }
});

//数字の増減ボタン用
function fluc(name, val) {
    if (val == 0) {
        document.getElementById(name).value = 0;
    } else {
        var now = Number(document.getElementById(name).value);
        if (now + val > 0) {
            document.getElementById(name).value = now + val;
        } else {
            document.getElementById(name).value = 0;
        }
    }
}

//キャラごとのボイスに表示変更
function voice_change(id) {
    const voices = {
        "vo_meguru": ["バッチリだねっ！", "ぴーす！", "さすがすぎるぅ～～～！", "ふぁいと、おー！", "キタキタキタキター！", "正義の味方になっちゃった～！"],
        "vo_sumire": ["やるじゃない。", "か、かわいいっ......!!", "あなたって......結構やるのね。", "う、力が...... お、お弁当......", "ま、まあ、悪くないのかも、ね", "あなたも私の、正義の味方、だよ。"],
        "vo_haruka": ["るんらら～♪", "どれ履いていこうかな？", "こっちおいでよ！", "一緒にがんばろ！", "しましまにしちゃうよ～！", "ずーっと一緒にいようね☆"],
        "vo_aoi": ["なんてすばらしいのかしら～", "大きいですね～！", "はりきって参りましょう！", "マイペースで行きましょう！", "特製カレーはいかがですか？", "あなたに全ておまかせします！"],
        "vo_kurumi": ["しっかりしなさいよね！", "何ニヤニヤしてるのよ", "チャハッ！", "やるじゃない！", "本気で行くわよっ！", "もう、察しなさいよぉこのバカー！"],
        "vo_tesla": ["がんばってくださ～い♪", "おイタがすぎましたね", "ふんふふ～ん♪", "覚悟はいいですかぁ？...うふっ", "この後が楽しみですね～♪", "今日は帰しませんよ......？"],
        "vo_nine": ["準備、完了", "鼓動、上昇......", "気持ち次第", "...新鮮", "好調。", "気分、最高。"],
        "vo_lilica": ["がんばるのです！", "リリカにおまかせなのです！", "あはははははははは～～～!!", "に～らめっぷ！", "たのしーのですー☆", "すっごーーーいのですううう～！"],
        "vo_elice": ["さっ、はりきっていきましょ！", "お楽しみはこれからよ♪", "がんばってね♪", "ばーん♪", "期待してるわよ♪", "わらわが代わってやろうか！？"],
        "vo_sarome": ["はりきっていくっしょ～！", "ひざまづくっしょ～", "しょーっしょっしょっしょっ！しょーっしょっしょっしょ！", "キリキリ働くっしょ！", "アンタには期待してるっしょ", "アンタは一生わたしについてくればいいっしょ！"],
        "vo_misty": ["さぁ、いこうか！", "飛び込んできたまえ！", "美しい...", "ミスティック！", "グレイト！", "ワンダフル！！"],
        "vo_veil": ["どうでもいいね", "おはよございまのこと", "盛り上がるねっ！", "私たち人間になれるか？", "すごいのこと！", "トロける歌声めしあがれ！ヴェイルね～！"],
        "vo_nui": ["ふーん。やっぱりね", "どうでもいいけどね。", "好きにしなよ。", "おばあさんとの約束なんだ", "今日のステージは大成功しそうだね。", "ネタは新鮮、サビ抜き厳禁、ヌイです！"],
        "vo_urara": ["今日はねぐせ占いにするぞよ", "今日は米占いにするぞよ", "某のチャクラも全開である", "むむ、これはなにかの吉兆やも", "占いによると今日は吉！", "超高速曲玉絶対噴射パワー！"],
        "vo_koromi": ["元気だすぱー", "なかよしだぱー！", "いい気持ちだぱ～", "そんなもんだぱ～", "うはうはだぱ～！", "ごちそうさまだぱ～！"],
        "vo_yuki": ["ゆーきはここよ～！", "男の娘で～っす！", "めちゃマジ天使！", "照れなくていいよぉ☆", "ゆーき感激ぃ！", "え、ゆーきのデビュー決定！？マジで！？"],
        "vo_chiyori": ["へぇ～。それで～？", "適当にがんばろ～", "あ～肩がこるわ～", "ちょっと休憩してく？", "はいはーい、学級会始めるよー", "だから人妻じゃないっていってんじゃん～！"],
        "vo_others": ["（メアリ）グッモーニーン！", "（ブラックカーテン）この先は、お前次第だぜ？", "（ビリー）モテの予感がする！", "（ガラブシ）喜・怒・哀・楽", "（ビリー）うっせえ、ババァ！", "（メアリ）ロックンロール！カモン！"]
    }

    document.getElementById("label_voice_A").innerText = voices[id][0];
    document.getElementById("label_voice_B").innerText = voices[id][1];
    document.getElementById("label_voice_C").innerText = voices[id][2];
    document.getElementById("label_voice_D").innerText = voices[id][3];
    document.getElementById("label_voice_E").innerText = voices[id][4];
    document.getElementById("label_voice_F").innerText = voices[id][5];
}