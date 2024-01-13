# RamuneBot

## 概要

ほぼ自分専用のBotです  
音楽の再生、ダイスロールなどの機能を備えています  
導入URL: なし

## 使用している主なライブラリ等

- Node.js
- Discord.js
- ytdl

## 動かし方

1. クローンする
1. `npm i`を実行
1. .envの`DISCORD_TOKEN`にトークンを入れる
1. `npm run start`

## コマンド

- ~~/call~~
    - メッセージタイプ:一時的
> システムチャンネルに通話に招待するメッセージを送る
- /dice roll `<コマンド>`  `<[ゲームシステム]>` `[<メッセージタイプ>]`
    - メッセージタイプ:選択可
> `<コマンド>`で入力したダイスコマンドを実行する
- /dice setquickdice `<コマンド>` `<[ゲームシステム]>`
    - メッセージタイプ:一時的
> `<コマンド>`で指定したダイスコマンドをクイックダイスに登録する
> クイックダイスはメッセージで`qd`と打つと実行できる
> 定時間後に登録解除される
- /dice gamesystemhelp `<ゲームシステム>` `[<メッセージタイプ>]`
    - メッセージタイプ:選択可
> 指定したゲームシステムのヘルプを表示する
- /dice dicetable
    - メッセージタイプ:通常
> ダイステーブル表を実行する
- /earthquake
    - メッセージタイプ:一時的
> 直近20件の地震一覧を表示する
- /geticon `<ユーザー>`
    - メッセージタイプ:一時的
> 指定したユーザーのアイコンを表示する
- /ping
    - メッセージタイプ:一時的
> pingなどの情報を表示する
- /playmusic youtube `<YoutubeURL>` `<ループOnOff>` `[<メッセージタイプ>]`
    - メッセージタイプ:選択可
> `<YoutubeURL>`の動画をボイスチャンネルで再生する
> どこかしらのボイスチャンネルに参加しないと再生できない
- /playmusic youtubeplaylist `<YoutubeプレイリストURL>` `[<メッセージタイプ>]`
    - メッセージタイプ:選択可
> `<YoutubeプレイリストURL>`のプレイリストをボイスチャンネルで順番に再生する
> どこかしらのボイスチャンネルに参加しないと再生できない
- /poll `<タイトル>` `<タイプ>` `<選択股>`
    - メッセージタイプ:通常
> 投票など用のメッセージを送信する
> 選択肢は `選択肢1&選択肢2&選択肢3` のように`&`(半角)で区切る
- /おみくじ
    - メッセージタイプ:選択可
> おみくじを引く
> 大吉、吉、中吉、小吉、末吉、凶、大凶がある
- Zalgo
    - メッセージタイプ:一時的
> メッセージをzalgo化したものを表示する
> アルファベットがものすごいことになる
- コードブロックで表示
    - メッセージタイプ:一時的
> メッセージをコードブロックで表示する
> メッセージの原文を表示できる
> メッセージ内にコードブロックが含まれているとすこしバグる
