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