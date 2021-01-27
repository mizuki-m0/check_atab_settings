function checkSettings(check_items) {
    //各種パラメータ
    const prob_sbb = [32768, 16384, 8192, 4096],
        prob_shbb = [520.1, 496.5, 455.1, 409.6],
        prob_bb = [481.9, 468.1, 442.8, 420.1],
        prob_mb = [442.8, 431.2, 399.6, 364.1],
        prob_bell = [5.82, 5.77, 5.64, 5.53],
        prob_bag = [72.2, 70.3, 68.3, 66.3],
        prob_cherry = [75.2, 72.4, 69.6, 66.9],
        prob_chanceA = [136.5, 136.5, 134.3, 131.1],
        prob_rt_miss = [8, 7.5, 7.2, 6.9],
        prob_bag_B = [32.2, 29.4, 23.8, 20.4],
        prob_cherry_B = [12, 11.3, 10.2, 9.43],
        prob_chanceA_B = [6.66, 6.66, 6.09, 5.43],
        prob_bt_meguru = [2.58, 3.13, 3.04, 3.72],
        prob_bt20_meguru = [2.58, 3.13, 3.08, 3.83],
        prob_bt_sumire = [3.15, 2.56, 3.7, 3.04],
        prob_bt20_sumire = [3.15, 2.56, 3.76, 3.13],
        prob_bt_maguro = [5, 5, 4.17, 4.17],
        prob_bt_class = [12.5, 12.5, 8.3, 8.3],
        prob_bt_sarome = [66.7, 0, 33.3, 33.3],
        prob_bt_ta = [0, 100, 100, 100],
        prob_bt_tf = [0, 0, 1000, 1000],
        prob_bt20_tf = [0, 0, 100, 100],
        prob_bt_le = [0, 0, 0, 1000],
        prob_bt20_le = [0, 0, 0, 100],
        prob_bt_juwan = [0, 0, 1, 1],
        prob_ba_voice_A = [2.54, 2.55, 2.2, 2.7],
        prob_ba_voice_B = [2.07, 2.09, 2.69, 2.2],
        prob_ba_voice_C = [8, 8, 5.99, 5.99],
        prob_ba_voice_D = [0, 250, 250, 250],
        prob_ba_voice_E = [0, 0, 500, 500],
        prob_ba_voice_F = [0, 0, 0, 500],
        prob_tr_br = [0, 1, 1, 1],
        prob_tr_kirin = [0, 0, 1, 1],
        prob_tr_rainbow = [0, 0, 0, 1],
        prob_mb_2m = [0, 0, 1, 1],
        prob_mb_tokutei5 = [0, 0, 1, 1],
        prob_mb_tokutei6 = [0, 0, 0, 1];

    //初期設定
    var check_all = [1, 1, 1, 1];

    //子役・ボナの判定
    if ("games" in check_items) {
        var games = check_items["games"];

        if ("sbb" in check_items) {
            var check_sbb = Probability_calc(games, check_items["sbb"], prob_sbb);
            check_all = multi_array(check_all, check_sbb);
        }

        if (!check_items["increase_acc"]) {
            if ("sbb" in check_items && "hbb" in check_items) {
                var check_shbb = Probability_calc(games, Number(check_items["sbb"]) + Number(check_items["hbb"]), prob_shbb);
                check_all = multi_array(check_all, check_shbb);
            }
            if ("bb" in check_items) {
                var check_bb = Probability_calc(games, check_items["bb"], prob_bb);
                check_all = multi_array(check_all, check_bb);
            }
            if ("mb" in check_items) {
                var check_mb = Probability_calc(games, check_items["mb"], prob_mb);
                check_all = multi_array(check_all, check_mb);
            }
        }
        if ("bell" in check_items) {
            var check_bell = Probability_calc(games, check_items["bell"], prob_bell);
            check_all = multi_array(check_all, check_bell);
        }
        if ("bag" in check_items) {
            var check_bag = Probability_calc(games, check_items["bag"], prob_bag);
            check_all = multi_array(check_all, check_bag);
        }
        if ("cherry" in check_items) {
            var check_cherry = Probability_calc(games, check_items["cherry"], prob_cherry);
            check_all = multi_array(check_all, check_cherry);
        }
        if ("chanceA" in check_items) {
            var check_chanceA = Probability_calc(games, check_items["chanceA"], prob_chanceA);
            check_all = multi_array(check_all, check_chanceA);
        }
    }

    //重複の判定
    if ("bag_B" in check_items) {
        var check_bag_B = Probability_calc(check_items["bag"], check_items["bag_B"], prob_bag_B);
        check_all = multi_array(check_all, check_bag_B);
    }
    if ("cherry_B" in check_items) {
        var check_cherry_B = Probability_calc(check_items["cherry"], check_items["cherry_B"], prob_cherry_B);
        check_all = multi_array(check_all, check_cherry_B);
    }
    if ("chanceA_B" in check_items) {
        var check_chanceA_B = Probability_calc(check_items["chanceA"], check_items["chanceA_B"], prob_chanceA_B);
        check_all = multi_array(check_all, check_chanceA_B);
    }

    //ビタ押し画像の判定
    var bt_img_num =
        Number(check_items["bt_meguru"] || 0) +
        Number(check_items["bt_sumire"] || 0) +
        Number(check_items["bt_maguro"] || 0) +
        Number(check_items["bt_class"] || 0) +
        Number(check_items["bt_sarome"] || 0) +
        Number(check_items["bt_ta"] || 0) +
        Number(check_items["bt_tf"] || 0) +
        Number(check_items["bt_le"] || 0);

    if ("bt_meguru" in check_items) {
        var check_bt_meguru = Probability_calc(bt_img_num, check_items["bt_meguru"], prob_bt_meguru);
        check_all = multi_array(check_all, check_bt_meguru);
    }
    if ("bt_sumire" in check_items) {
        var check_bt_sumire = Probability_calc(bt_img_num, check_items["bt_sumire"], prob_bt_sumire);
        check_all = multi_array(check_all, check_bt_sumire);
    }
    if ("bt_maguro" in check_items) {
        var check_bt_maguro = Probability_calc(bt_img_num, check_items["bt_maguro"], prob_bt_maguro);
        check_all = multi_array(check_all, check_bt_maguro);
    }
    if ("bt_class" in check_items) {
        var check_bt_class = Probability_calc(bt_img_num, check_items["bt_class"], prob_bt_class);
        check_all = multi_array(check_all, check_bt_class);
    }
    if ("bt_sarome" in check_items && check_items["bt_sarome"] > 0) {
        var check_bt_sarome = Probability_calc(bt_img_num, check_items["bt_sarome"], prob_bt_sarome);
        check_all = multi_array(check_all, check_bt_sarome);
    }
    if ("bt_ta" in check_items && check_items["bt_ta"] > 0) {
        var check_bt_ta = Probability_calc(bt_img_num, check_items["bt_ta"], prob_bt_ta);
        check_all = multi_array(check_all, check_bt_ta);
    }
    if ("bt_tf" in check_items && check_items["bt_tf"] > 0) {
        var check_bt_tf = Probability_calc(bt_img_num, check_items["bt_tf"], prob_bt_tf);
        check_all = multi_array(check_all, check_bt_tf);
    }
    if ("bt_le" in check_items && check_items["bt_le"] > 0) {
        var check_bt_le = Probability_calc(bt_img_num, check_items["bt_le"], prob_bt_le);
        check_all = multi_array(check_all, check_bt_le);
    }

    //ビタ押し画像の判定(20回目)
    var bt20_img_num =
        Number(check_items["bt20_meguru"] || 0) +
        Number(check_items["bt20_sumire"] || 0) +
        Number(check_items["bt20_maguro"] || 0) +
        Number(check_items["bt20_class"] || 0) +
        Number(check_items["bt20_sarome"] || 0) +
        Number(check_items["bt20_ta"] || 0) +
        Number(check_items["bt20_tf"] || 0) +
        Number(check_items["bt20_le"] || 0);

    if ("bt20_meguru" in check_items) {
        var check_bt20_meguru = Probability_calc(bt20_img_num, check_items["bt20_meguru"], prob_bt20_meguru);
        check_all = multi_array(check_all, check_bt20_meguru);
    }
    if ("bt20_sumire" in check_items) {
        var check_bt20_sumire = Probability_calc(bt20_img_num, check_items["bt20_sumire"], prob_bt20_sumire);
        check_all = multi_array(check_all, check_bt20_sumire);
    }
    if ("bt20_maguro" in check_items) {
        var check_bt20_maguro = Probability_calc(bt20_img_num, check_items["bt20_maguro"], prob_bt_maguro);
        check_all = multi_array(check_all, check_bt20_maguro);
    }
    if ("bt20_class" in check_items) {
        var check_bt20_class = Probability_calc(bt20_img_num, check_items["bt20_class"], prob_bt_class);
        check_all = multi_array(check_all, check_bt20_class);
    }
    if ("bt20_sarome" in check_items && check_items["bt20_sarome"] > 0) {
        var check_bt20_sarome = Probability_calc(bt20_img_num, check_items["bt20_sarome"], prob_bt_sarome);
        check_all = multi_array(check_all, check_bt20_sarome);
    }
    if ("bt20_ta" in check_items && check_items["bt20_ta"] > 0) {
        var check_bt20_ta = Probability_calc(bt20_img_num, check_items["bt20_ta"], prob_bt_ta);
        check_all = multi_array(check_all, check_bt20_ta);
    }
    if ("bt20_tf" in check_items && check_items["bt20_tf"] > 0) {
        var check_bt20_tf = Probability_calc(bt20_img_num, check_items["bt20_tf"], prob_bt20_tf);
        check_all = multi_array(check_all, check_bt20_tf);
    }
    if ("bt20_le" in check_items && check_items["bt20_le"] > 0) {
        var check_bt20_le = Probability_calc(bt20_img_num, check_items["bt20_le"], prob_bt20_le);
        check_all = multi_array(check_all, check_bt20_le);
    }

    //ボーナス後ボイスの判定
    var ba_vo_num = Number(check_items["ba_voice_A"] || 0) + Number(check_items["ba_voice_B"] || 0) + Number(check_items["ba_voice_C"] || 0) + Number(check_items["ba_voice_D"] || 0) + Number(check_items["ba_voice_E"] || 0) + Number(check_items["ba_voice_F"] || 0);

    if ("ba_voice_A" in check_items) {
        var check_ba_voice_A = Probability_calc(ba_vo_num, check_items["ba_voice_A"], prob_ba_voice_A);
        check_all = multi_array(check_all, check_ba_voice_A);
    }
    if ("ba_voice_B" in check_items) {
        var check_ba_voice_B = Probability_calc(ba_vo_num, check_items["ba_voice_B"], prob_ba_voice_B);
        check_all = multi_array(check_all, check_ba_voice_B);
    }
    if ("ba_voice_C" in check_items) {
        var check_ba_voice_C = Probability_calc(ba_vo_num, check_items["ba_voice_C"], prob_ba_voice_C);
        check_all = multi_array(check_all, check_ba_voice_C);
    }
    if ("ba_voice_D" in check_items && check_items["ba_voice_D"] > 0) {
        var check_ba_voice_D = Probability_calc(ba_vo_num, check_items["ba_voice_D"], prob_ba_voice_D);
        check_all = multi_array(check_all, check_ba_voice_D);
    }
    if ("ba_voice_E" in check_items && check_items["ba_voice_E"] > 0) {
        var check_ba_voice_E = Probability_calc(ba_vo_num, check_items["ba_voice_E"], prob_ba_voice_E);
        check_all = multi_array(check_all, check_ba_voice_E);
    }
    if ("ba_voice_F" in check_items && check_items["ba_voice_F"] > 0) {
        var check_ba_voice_F = Probability_calc(ba_vo_num, check_items["ba_voice_F"], prob_ba_voice_F);
        check_all = multi_array(check_all, check_ba_voice_F);
    }
    if ("bt_juwan" in check_items && check_items["bt_juwan"] > 0) {
        check_all = multi_array(check_all, prob_bt_juwan);
    }

    //RT関係の判定
    if ("rt_games" in check_items && "rt_miss" in check_items) {
        var check_rt_miss = Probability_calc(check_items["rt_games"], check_items["rt_miss"], prob_rt_miss);
        check_all = multi_array(check_all, check_rt_miss);
    }

    //その他確定系
    if ("tr_br" in check_items && check_items["tr_br"] > 0) {
        check_all = multi_array(check_all, prob_tr_br);
    }
    if ("tr_kirin" in check_items && check_items["tr_kirin"] > 0) {
        check_all = multi_array(check_all, prob_tr_kirin);
    }
    if ("tr_rainbow" in check_items && check_items["tr_rainbow"] > 0) {
        check_all = multi_array(check_all, prob_tr_rainbow);
    }
    if ("mb_2m" in check_items && check_items["mb_2m"] > 0) {
        check_all = multi_array(check_all, prob_mb_2m);
    }
    if ("mb_tokutei5" in check_items && check_items["mb_tokutei5"] > 0) {
        check_all = multi_array(check_all, prob_mb_tokutei5);
    }
    if ("mb_tokutei6" in check_items && check_items["mb_tokutei6"] > 0) {
        check_all = multi_array(check_all, prob_mb_tokutei6);
    }

    var result = perce(check_all);
    return result;
}

//キャラごとのボイスに表示変更
function voice_change(id) {
    const voices = {
        vo_meguru: ["バッチリだねっ！", "ぴーす！", "さすがすぎるぅ～～～！", "ふぁいと、おー！", "キタキタキタキター！", "正義の味方になっちゃった～！"],
        vo_sumire: ["やるじゃない。", "か、かわいいっ......!!", "あなたって......結構やるのね。", "う、力が...... お、お弁当......", "ま、まあ、悪くないのかも、ね", "あなたも私の、正義の味方、だよ。"],
        vo_haruka: ["るんらら～♪", "どれ履いていこうかな？", "こっちおいでよ！", "一緒にがんばろ！", "しましまにしちゃうよ～！", "ずーっと一緒にいようね☆"],
        vo_aoi: ["なんてすばらしいのかしら～", "大きいですね～！", "はりきって参りましょう！", "マイペースで行きましょう！", "特製カレーはいかがですか？", "あなたに全ておまかせします！"],
        vo_kurumi: ["しっかりしなさいよね！", "何ニヤニヤしてるのよ", "チャハッ！", "やるじゃない！", "本気で行くわよっ！", "もう、察しなさいよぉこのバカー！"],
        vo_tesla: ["がんばってくださ～い♪", "おイタがすぎましたね", "ふんふふ～ん♪", "覚悟はいいですかぁ？...うふっ", "この後が楽しみですね～♪", "今日は帰しませんよ......？"],
        vo_nine: ["準備、完了", "鼓動、上昇......", "気持ち次第", "...新鮮", "好調。", "気分、最高。"],
        vo_lilica: ["がんばるのです！", "リリカにおまかせなのです！", "あはははははははは～～～!!", "に～らめっぷ！", "たのしーのですー☆", "すっごーーーいのですううう～！"],
        vo_elice: ["さっ、はりきっていきましょ！", "お楽しみはこれからよ♪", "がんばってね♪", "ばーん♪", "期待してるわよ♪", "わらわが代わってやろうか！？"],
        vo_sarome: ["はりきっていくっしょ～！", "ひざまづくっしょ～", "しょーっしょっしょっしょっ！しょーっしょっしょっしょ！", "キリキリ働くっしょ！", "アンタには期待してるっしょ", "アンタは一生わたしについてくればいいっしょ！"],
        vo_misty: ["さぁ、いこうか！", "飛び込んできたまえ！", "美しい...", "ミスティック！", "グレイト！", "ワンダフル！！"],
        vo_veil: ["どうでもいいね", "おはよございまのこと", "盛り上がるねっ！", "私たち人間になれるか？", "すごいのこと！", "トロける歌声めしあがれ！ヴェイルね～！"],
        vo_nui: ["ふーん。やっぱりね", "どうでもいいけどね。", "好きにしなよ。", "おばあさんとの約束なんだ", "今日のステージは大成功しそうだね。", "ネタは新鮮、サビ抜き厳禁、ヌイです！"],
        vo_urara: ["今日はねぐせ占いにするぞよ", "今日は米占いにするぞよ", "某のチャクラも全開である", "むむ、これはなにかの吉兆やも", "占いによると今日は吉！", "超高速曲玉絶対噴射パワー！"],
        vo_koromi: ["元気だすぱー", "なかよしだぱー！", "いい気持ちだぱ～", "そんなもんだぱ～", "うはうはだぱ～！", "ごちそうさまだぱ～！"],
        vo_yuki: ["ゆーきはここよ～！", "男の娘で～っす！", "めちゃマジ天使！", "照れなくていいよぉ☆", "ゆーき感激ぃ！", "え、ゆーきのデビュー決定！？マジで！？"],
        vo_chiyori: ["へぇ～。それで～？", "適当にがんばろ～", "あ～肩がこるわ～", "ちょっと休憩してく？", "はいはーい、学級会始めるよー", "だから人妻じゃないっていってんじゃん～！"],
        vo_others: ["（メアリ）グッモーニーン！", "（ブラックカーテン）この先は、お前次第だぜ？", "（ビリー）モテの予感がする！", "（ガラブシ）喜・怒・哀・楽", "（ビリー）うっせえ、ババァ！", "（メアリ）ロックンロール！カモン！"],
    };

    document.getElementById("label_voice_A").innerText = voices[id][0];
    document.getElementById("label_voice_B").innerText = voices[id][1];
    document.getElementById("label_voice_C").innerText = voices[id][2];
    document.getElementById("label_voice_D").innerText = voices[id][3];
    document.getElementById("label_voice_E").innerText = voices[id][4];
    document.getElementById("label_voice_F").innerText = voices[id][5];

    document.cookie = "label_voice=" + id;
}
