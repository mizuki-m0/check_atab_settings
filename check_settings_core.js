//確率判定
function Probability_calc(base, target, prob) {

    var settings = new Array(0);
    var over_digit = 0;

    var calc_tmp = factorial(base) / (factorial(target) * factorial(base - target));

    if (isNaN(calc_tmp)) {
        const fac_N = factorial_bi(base);
        const fac_X = factorial_bi(target);
        const fac_N_X = factorial_bi(base - target);

        calc_tmp = fac_N.divide(fac_X.multiply(fac_N_X));
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
    if (k == 0) {
        return bigInt(1);
    } else {
        var j = bigInt(1);

        for (var i = bigInt(1); !i.geq(k); i = i.next()) {
            j = j.multiply(i);
        }

        return j;
    }
}

//普通の階乗
function factorial(k) {
    if (k == 0) {
        return 1;
    } else {
        var j = 1;

        for (var i = 1; i <= k; i++) {
            j *= i;
        }

        return j;
    }
}
