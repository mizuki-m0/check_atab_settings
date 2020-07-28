$(function () {
    // グラフの事前作成
    drawChart([25, 25, 25, 25])

    // URLからの初回描画
    draw_by_url();

    // 判別ボタン押下時
    $('#check_settings').on('click', function () {
        draw_settings();
    });

    // クリアボタン押下時
    $('#clear_btn').on('click', function () {
        if (!confirm('本当にクリアしますか？')) {
            return false;
        } else {
            $('input[type="number"]').each(function () {
                this.value = "";
            });

            var cookies = document.cookie.split(";");
            for (var i = 0; i < cookies.length; i++) {
                document.cookie = cookies[i].split("=")[0] + "=;max-age=0"
            }

            draw_settings([]);
        }
    });

    // フォーム内容変更時
    $('.form-control').change(function () {
        document.cookie = $(this).attr('id') + "=" + $(this).val()
    });

    // URLパラメーターから画面を反映させる
    function draw_by_url() {
        var cookiesArray = document.cookie.split('; ');
        var params = new Object;

        // cookieからパラメーターを抽出
        for (var c of cookiesArray) {
            var cArray = c.split('=');
            if (cArray != "") {
                params[cArray[0]] = cArray[1];

            }
        }

        // URIからパラメーターを抽出
        var uri_split = location.search.substring(1).split('&');
        for (var i = 0; uri_split[i]; i++) {
            var imems = uri_split[i].split('=');
            params[imems[0]] = imems[1];
        }
        history.replaceState(null, null, "/");

        // パラメーターがある場合に画面を反映
        if (Object.keys(params).length) {
            Object.keys(params).forEach(function (element) {
                var val = this[element];
                switch (element) {
                    case "label_voice":
                        voice_change(val);
                        $("#" + val).addClass('active');
                    default:
                        $("#" + element).val(val);
                }
            }, params);

            draw_settings();
        } else {
            draw_settings([]);
        }
    }

    // 設定を確認&表示を反映させる関数
    function draw_settings() {
        var check_items = new Object();
        $('input[type="number"]').each(function () {
            if (this.value != "") {
                check_items[this.id] = this.value;
            }
        });

        var result = checkSettings(check_items);

        $("#s1").text(result[0]);
        $("#s2").text(result[1]);
        $("#s5").text(result[2]);
        $("#s6").text(result[3]);

        // グラフの再描画
        if (myPieChart) {
            myPieChart.destroy();
        }
        drawChart([result[0], result[1], result[2], result[3]]);
    }

    // 円グラフ
    function drawChart(chartVal) {
        var ctx = document.getElementById("myPieChart");
        window.myPieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ["設定1", "設定2", "設定5", "設定6"],
                datasets: [{
                    backgroundColor: ["#4B75B9", "#F0BA32", "#3EBA2B", "#D04255"],
                    data: chartVal
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false
                }
            }
        });
    }
});

// 数字の増減ボタン用
function fluc(name, val) {
    if (val == 0) {
        document.getElementById(name).value = val;
        document.cookie = name + "=" + val
    } else {
        var now = Number(document.getElementById(name).value);
        if (now + val > 0) {
            document.getElementById(name).value = now + val;
            document.cookie = name + "=" + (now + val)
        } else {
            document.getElementById(name).value = 0;
            document.cookie = name + "=" + 0
        }
    }
}

// ズーム防止
var ua = navigator.userAgent.toLowerCase();
var isiOS = (ua.indexOf('iphone') > -1) || (ua.indexOf('ipad') > -1);
if (isiOS) {
    var viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
        var viewportContent = viewport.getAttribute('content');
        viewport.setAttribute('content', viewportContent + ', user-scalable=no');
    }
}