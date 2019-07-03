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
    var games = check_items["games"];
    var check_all = [1, 1, 1, 1];

    //子役・ボナ・重複の判定
    if ("sbb" in check_items) {
        var check_sbb = Probability_calc(games, check_items["sbb"], prob_sbb);
        check_all = multi_array(check_all, check_sbb)
    }
    if ("sbb" in check_items && "hbb" in check_items) {
        var check_shbb = Probability_calc(games, Number(check_items["sbb"]) + Number(check_items["hbb"]), prob_shbb);
        check_all = multi_array(check_all, check_shbb)
    }
    if ("bb" in check_items) {
        var check_bb = Probability_calc(games, check_items["bb"], prob_bb);
        check_all = multi_array(check_all, check_bb)
    }
    if ("mb" in check_items) {
        var check_mb = Probability_calc(games, check_items["mb"], prob_mb);
        check_all = multi_array(check_all, check_mb)
    }
    if ("bell" in check_items) {
        var check_bell = Probability_calc(games, check_items["bell"], prob_bell);
        check_all = multi_array(check_all, check_bell)
    }
    if ("bag" in check_items) {
        var check_bag = Probability_calc(games, check_items["bag"], prob_bag);
        check_all = multi_array(check_all, check_bag)
    }
    if ("cherry" in check_items) {
        var check_cherry = Probability_calc(games, check_items["cherry"], prob_cherry);
        check_all = multi_array(check_all, check_cherry)
    }
    if ("chanceA" in check_items) {
        var check_chanceA = Probability_calc(games, check_items["chanceA"], prob_chanceA);
        check_all = multi_array(check_all, check_chanceA)
    }
    if ("bag_B" in check_items) {
        var check_bag_B = Probability_calc(bag, check_items["bag_B"], prob_bag_B);
        check_all = multi_array(check_all, check_bag_B)
    }
    if ("cherry_B" in check_items) {
        var check_cherry_B = Probability_calc(cherry, check_items["cherry_B"], prob_cherry_B);
        check_all = multi_array(check_all, check_cherry_B)
    }
    if ("chanceA_B" in check_items) {
        var check_chanceA_B = Probability_calc(chanceA, check_items["chanceA_B"], prob_chanceA_B);
        check_all = multi_array(check_all, check_chanceA_B)
    }

    //ビタ押し画像の判定
    var bt_img_num =
        Number(check_items["bt_meguru"] || 0)
        + Number(check_items["bt_sumire"] || 0)
        + Number(check_items["bt_maguro"] || 0)
        + Number(check_items["bt_class"] || 0)
        + Number(check_items["bt_sarome"] || 0)
        + Number(check_items["bt_ta"] || 0)
        + Number(check_items["bt_tf"] || 0)
        + Number(check_items["bt_le"] || 0);

    if ("bt_meguru" in check_items) {
        var check_bt_meguru = Probability_calc(bt_img_num, check_items["bt_meguru"], prob_bt_meguru);
        check_all = multi_array(check_all, check_bt_meguru)
    }
    if ("bt_sumire" in check_items) {
        var check_bt_sumire = Probability_calc(bt_img_num, check_items["bt_sumire"], prob_bt_sumire);
        check_all = multi_array(check_all, check_bt_sumire)
    }
    if ("bt_maguro" in check_items) {
        var check_bt_maguro = Probability_calc(bt_img_num, check_items["bt_maguro"], prob_bt_maguro);
        check_all = multi_array(check_all, check_bt_maguro)
    }
    if ("bt_class" in check_items) {
        var check_bt_class = Probability_calc(bt_img_num, check_items["bt_class"], prob_bt_class);
        check_all = multi_array(check_all, check_bt_class)
    }
    if ("bt_sarome" in check_items) {
        var check_bt_sarome = Probability_calc(bt_img_num, check_items["bt_sarome"], prob_bt_sarome);
        check_all = multi_array(check_all, check_bt_sarome)
    }
    if ("bt_ta" in check_items) {
        var check_bt_ta = Probability_calc(bt_img_num, check_items["bt_ta"], prob_bt_ta);
        check_all = multi_array(check_all, check_bt_ta)
    }
    if ("bt_tf" in check_items) {
        var check_bt_tf = Probability_calc(bt_img_num, check_items["bt_tf"], prob_bt_tf);
        check_all = multi_array(check_all, check_bt_tf)
    }
    if ("bt_le" in check_items) {
        var check_bt_le = Probability_calc(bt_img_num, check_items["bt_le"], prob_bt_le);
        check_all = multi_array(check_all, check_bt_le)
    }

    //ビタ押し画像の判定(20回目)
    var bt20_img_num =
        Number(check_items["bt20_meguru"] || 0)
        + Number(check_items["bt20_sumire"] || 0)
        + Number(check_items["bt20_maguro"] || 0)
        + Number(check_items["bt20_class"] || 0)
        + Number(check_items["bt20_sarome"] || 0)
        + Number(check_items["bt20_ta"] || 0)
        + Number(check_items["bt20_tf"] || 0)
        + Number(check_items["bt20_le"] || 0);

    if ("bt20_meguru" in check_items) {
        var check_bt20_meguru = Probability_calc(bt20_img_num, check_items["bt20_meguru"], prob_bt20_meguru);
        check_all = multi_array(check_all, check_bt20_meguru)
    }
    if ("bt20_sumire" in check_items) {
        var check_bt20_sumire = Probability_calc(bt20_img_num, check_items["bt20_sumire"], prob_bt20_sumire);
        check_all = multi_array(check_all, check_bt20_sumire)
    }
    if ("bt20_maguro" in check_items) {
        var check_bt20_maguro = Probability_calc(bt20_img_num, check_items["bt20_maguro"], prob_bt_maguro);
        check_all = multi_array(check_all, check_bt20_maguro)
    }
    if ("bt20_class" in check_items) {
        var check_bt20_class = Probability_calc(bt20_img_num, check_items["bt20_class"], prob_bt_class);
        check_all = multi_array(check_all, check_bt20_class)
    }
    if ("bt20_sarome" in check_items) {
        var check_bt20_sarome = Probability_calc(bt20_img_num, check_items["bt20_sarome"], prob_bt_sarome);
        check_all = multi_array(check_all, check_bt20_sarome)
    }
    if ("bt20_ta" in check_items) {
        var check_bt20_ta = Probability_calc(bt20_img_num, check_items["bt20_ta"], prob_bt_ta);
        check_all = multi_array(check_all, check_bt20_ta)
    }
    if ("bt20_tf" in check_items) {
        var check_bt20_tf = Probability_calc(bt20_img_num, check_items["bt20_tf"], prob_bt20_tf);
        check_all = multi_array(check_all, check_bt20_tf)
    }
    if ("bt20_le" in check_items) {
        var check_bt20_le = Probability_calc(bt20_img_num, check_items["bt20_le"], prob_bt20_le);
        check_all = multi_array(check_all, check_bt20_le)
    }

    //ボーナス後ボイスの判定
    var ba_vo_num =
        Number(check_items["ba_voice_A"] || 0)
        + Number(check_items["ba_voice_B"] || 0)
        + Number(check_items["ba_voice_C"] || 0)
        + Number(check_items["ba_voice_D"] || 0)
        + Number(check_items["ba_voice_E"] || 0)
        + Number(check_items["ba_voice_F"] || 0);

    if ("ba_voice_A" in check_items) {
        var check_ba_voice_A = Probability_calc(ba_vo_num, check_items["ba_voice_A"], prob_ba_voice_A);
        check_all = multi_array(check_all, check_ba_voice_A)
    }
    if ("ba_voice_B" in check_items) {
        var check_ba_voice_B = Probability_calc(ba_vo_num, check_items["ba_voice_B"], prob_ba_voice_B);
        check_all = multi_array(check_all, check_ba_voice_B)
    }
    if ("ba_voice_C" in check_items) {
        var check_ba_voice_C = Probability_calc(ba_vo_num, check_items["ba_voice_C"], prob_ba_voice_C);
        check_all = multi_array(check_all, check_ba_voice_C)
    }
    if ("ba_voice_D" in check_items) {
        var check_ba_voice_D = Probability_calc(ba_vo_num, check_items["ba_voice_D"], prob_ba_voice_D);
        check_all = multi_array(check_all, check_ba_voice_D)
    }
    if ("ba_voice_E" in check_items) {
        var check_ba_voice_E = Probability_calc(ba_vo_num, check_items["ba_voice_E"], prob_ba_voice_E);
        check_all = multi_array(check_all, check_ba_voice_E)
    }
    if ("ba_voice_F" in check_items) {
        var check_ba_voice_F = Probability_calc(ba_vo_num, check_items["ba_voice_F"], prob_ba_voice_F);
        check_all = multi_array(check_all, check_ba_voice_F)
    }
    if ("bt_juwan" in check_items && check_items["bt_juwan"] > 0) {
        check_all = multi_array(check_all, prob_bt_juwan)
    }

    //RT関係の判定
    if ("rt_games" in check_items && "rt_miss" in check_items) {
        var check_rt_miss = Probability_calc(check_items["rt_games"], check_items["rt_miss"], prob_rt_miss);
        check_all = multi_array(check_all, check_rt_miss)
    }

    //その他確定系
    if ("tr_br" in check_items && check_items["tr_br"] > 0) {
        check_all = multi_array(check_all, prob_tr_br)
    }
    if ("tr_kirin" in check_items && check_items["tr_kirin"] > 0) {
        check_all = multi_array(check_all, prob_tr_kirin)
    }
    if ("tr_rainbow" in check_items && check_items["tr_rainbow"] > 0) {
        check_all = multi_array(check_all, prob_tr_rainbow)
    }
    if ("mb_2m" in check_items && check_items["mb_2m"] > 0) {
        check_all = multi_array(check_all, prob_mb_2m)
    }
    if ("mb_tokutei5" in check_items && check_items["mb_tokutei5"] > 0) {
        check_all = multi_array(check_all, prob_mb_tokutei5)
    }
    if ("mb_tokutei6" in check_items && check_items["mb_tokutei6"] > 0) {
        check_all = multi_array(check_all, prob_mb_tokutei6)
    }

    var result = perce(check_all);
    return result;
}

//確率判定
function Probability_calc(base, target, prob) {
    if (target == "0") return [1, 1, 1, 1];

    var settings = new Array(0);
    var over_digit = 0;

    var calc_tmp = factorial(base) / (factorial(target) * factorial(base - target));

    if (isNaN(calc_tmp)) {
        const fac_N = factorial_bi(base);
        const fac_X = factorial_bi(target);
        const fac_N_X = factorial_bi(base - target);

        calc_tmp = fac_N.divide(fac_X.multiply(fac_N_X)); //calc_tmp = fac_N / fac_X * fac_N_X
        var calc_tmp_length = String(calc_tmp).length;

        if (calc_tmp_length > 300) {
            over_digit = Math.round(calc_tmp_length - 300)
            var scrape = bigInt(10).pow(bigInt(Math.round(calc_tmp_length - 300)));
            calc_tmp = calc_tmp.divide(scrape);
        }
    }

    var nCx = Number(calc_tmp);

    prob.forEach(
        function (value) {
            if (value != 0) {
                var last_digit = over_digit;

                var Px = 1;
                for (let index = 0; index < target; index++) {
                    Px = Px * (1 / value);
                    if (Px < 1) {
                        Px = Px * 10
                        last_digit--
                    }
                }

                var P1nx = 1;
                for (let index = 0; index < base - target; index++) {
                    P1nx = P1nx * (1 - (1 / value));
                    if (P1nx < 1) {
                        P1nx = P1nx * 10
                        last_digit--
                    }
                }

                if (last_digit != 0) {
                    var result_tmp = nCx * Px * P1nx;
                    for (let index = 0; index > last_digit; index--) {
                        result_tmp = result_tmp / 10;
                    }
                    settings.push(result_tmp);
                } else {
                    settings.push(nCx * Px * P1nx);
                }
            } else {
                settings.push(0);
            }
        }
    );

    return settings;
}

//比率計算
function perce(all) {
    var result = new Array(0);
    var all_sum = 0;

    for (let index = 0; index < all.length; index++) {
        all_sum += all[index];
    }

    for (let index = 0; index < all.length; index++) {
        result.push(Math.round(all[index] / all_sum * 1000) / 10);
    }

    return result;
}

//比率の掛け合わせ
function multi_array(all, now) {
    var settings_tmp = new Array(0);

    for (let index = 0; index < all.length; index++) {
        settings_tmp.push(all[index] * now[index]);
    }

    var need_adjust = false
    settings_tmp.forEach(element => {
        var spl_element = String(element).split("e");
        if (spl_element[1] < 0) {
            spl_element[1] = -spl_element[1];
        }
        var element_length = String(spl_element[0]).length + spl_element[1];

        if (element_length > 250) {
            need_adjust = true;
        }
    });

    if (need_adjust) {
        for (let index = 0; index < settings_tmp.length; index++) {
            settings_tmp[index] = (settings_tmp[index] * (10 ** 50));
        }
    }

    return settings_tmp;
}

//bigIntで階乗
function factorial_bi(k) {
    var j = bigInt(1);

    for (var i = bigInt(1); !i.geq(k); i = i.next()) {
        j = j.multiply(i);
    }

    return j;
}

//普通の階乗
function factorial(k) {
    var j = 1;

    for (var i = 1; i <= k; i++) {
        j *= i;
    }

    return j;
}
