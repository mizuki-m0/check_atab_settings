# check_atab_settings
パチスロ「A-SLOT ツインエンジェルBREAK」の設定判別ツールです。  
atabは**A**-slot **T**win**A**ngel**B**reakの略のような感じで。

## 使い方
[GitHub Pages](https://mizuki-momose.github.io/check_atab_settings/)使って公開していますので、そちらで。

## 判定可能な要素
- 各子役(ベル・スイカ・チェリー・チャンス目A)
- ボーナス確率(SBB・SBB+HBB・NBB・MB)
- ボーナス重複(スイカ重・チェリ重・チャA重)
- ビタ成功時画像&20回目
- ボーナス後ボイス(各キャラごとのボイス表示可能)
- RTハズレ
- その他確定系(トロフィー等)

## やってること
試行回数n　確率p　出現回数x　の時、各設定値ごとの出現確率Pxを調べます。  
<img src="https://latex.codecogs.com/gif.latex?\inline&space;\fn_jvn&space;Px=_nC_xP^x(1-P)^{n-x}">  
<img src="https://latex.codecogs.com/gif.latex?\inline&space;\fn_jvn&space;_nC_x=\frac{n!}{x!(n-x)!}">  
各判定項目ごとのPxをかけ合わせて、最後に比率を出して終わりです。  
私は数学そんなに詳しくないので、拾ってきた情報ですが。

## (おまけ)ブックマークレット機能
マイスロの「マイカウンター」または「遊技履歴」画面で使用するとゲーム数・SBB・HBB・BB・MB・ベル・カバン・チェリー・チャンス目Aの値を自動的に取ってきます。(遊技履歴画面の場合は一番最近のものを取得します。)  
ただし「最近の遊技履歴」画面ではHBBとBBが合わせて計算されるため、正確には出ません。なるべく「遊技履歴」画面で使用してください。

手入力めんどくさいときにどうぞ。  
~~~
javascript:(function(){var s=document.createElement("script");s.src="https://ta.mizukian.net/bl.js";document.body.appendChild(s);})()
~~~
