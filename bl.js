var $data = { games: 0, sbb: 0, hbb: 0, bb: 0, mb: 0, bell: 0, bag: 0, cherry: 0, chanceA: 0 }, $url = 'https://ta.mizukian.net/?';

if (document.querySelector('table.tblrec')) {
    var $html = document.querySelectorAll('table.tblrec')[0]
} else {
    var $html = document.querySelector('div.mysloTbl.q').querySelector('table')
}

for (var i = 0, row_len = $html.rows.length; i < row_len; i++) {
    $str = $html.rows[i].cells[0].innerHTML;
    switch (true) {
        case /^■ゲーム数/.test($str):
            $data.games += Number($html.rows[i].cells[1].innerHTML.slice(0, -1));
            break;

        case /^■スペシャルビッグボーナス/.test($str):
            $data.sbb += Number($html.rows[i].cells[1].innerHTML.slice(0, -1));
            break;

        case /^■ハイパービッグボーナス/.test($str):
            $data.hbb += Number($html.rows[i].cells[1].innerHTML.slice(0, -1));
            break;

        case /^■ビッグボーナス/.test($str):
            $data.bb += Number($html.rows[i].cells[1].innerHTML.slice(0, -1));
            break;

        case /^■ミドルボーナス/.test($str):
            $data.mb += Number($html.rows[i].cells[1].innerHTML.slice(0, -1));
            break;

        case /^■ベル/.test($str):
            $data.bell += Number($html.rows[i].cells[1].innerHTML.slice(0, -1));
            break;

        case /^■カバン/.test($str):
            $data.bag += Number($html.rows[i].cells[1].innerHTML.slice(0, -1));
            break;

        case /^■チェリー/.test($str):
            $data.cherry += Number($html.rows[i].cells[1].innerHTML.slice(0, -1));
            break;

        case /^■チャンス目A/.test($str):
            $data.chanceA += Number($html.rows[i].cells[1].innerHTML.slice(0, -1));
            break;
    }
}

for (let $key in $data) {
    $url += $key + '=' + $data[$key] + '&'
}

window.open($url.slice(0, -1))