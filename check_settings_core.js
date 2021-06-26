//確率判定
function probabilityCalc(n, x, prob_arr) {
    let settings = new Array(0);
    let over_digit = 0;

    const fac_N = factorial(n);
    const fac_X = factorial(x);
    const fac_N_X = factorial(n - x);

    let nCx_temp = fac_N / (fac_X * fac_N_X);
    const calc_tmp_length = String(nCx_temp).length;

    if (calc_tmp_length > 17) {
        over_digit = calc_tmp_length - 17;
        nCx_temp = nCx_temp / BigInt(10) ** BigInt(over_digit);
    }

    const nCx = Number(nCx_temp);

    prob_arr.forEach(function (prob) {
        if (prob != 0) {
            const p = 1 / prob;
            let last_digit = over_digit;

            // a = p^x
            let a = 1;
            for (let i = 0; i < x; i++) {
                a *= p;
                while (a < 1) {
                    a *= 10;
                    last_digit--;
                }
            }

            // b = (1-p)^(n-x)
            let b = 1;
            for (let i = 0; i < n - x; i++) {
                b *= 1 - p;
                while (b < 1) {
                    b *= 10;
                    last_digit--;
                }
            }

            // Px = nCx * a * b
            if (last_digit != 0) {
                let result_tmp = nCx * a * b;
                for (let i = 0; i > last_digit; i--) {
                    result_tmp = result_tmp / 10;
                }
                settings.push(result_tmp);
            } else {
                settings.push(nCx * a * b);
            }
        } else {
            settings.push(0);
        }
    });

    return settings;
}

//比率計算
function perce(ratio_arr) {
    let result = new Array(0);
    let ratio_sum = 0;

    ratio_arr.forEach(function (ratio) {
        ratio_sum += ratio;
    });

    ratio_arr.forEach(function (ratio) {
        result.push(Math.round((ratio / ratio_sum) * 1000) / 10);
    });

    return result;
}

//比率の掛け合わせ
function multi_array(ratio_arr, this_arr) {
    let settings = new Array(0);

    for (let i = 0; i < ratio_arr.length; i++) {
        settings.push(ratio_arr[i] * this_arr[i]);
    }

    return settings;
}

//bigIntで階乗
function factorial(k) {
    let result = BigInt(1);
    let i = 0;
    while (i < k) {
        result = result * BigInt(++i);
    }

    return result;
}
