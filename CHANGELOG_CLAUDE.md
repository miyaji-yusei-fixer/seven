# Claude 変更履歴

Claude Code で行った変更の履歴を新しいものから順に記録する。

## 2026-05-31 カード移動アニメーションの追加

- 概要: 手札の選択・捨て・引きの動きが即時反映で見えづらかったため、カードの移動・並び替え・選択のアニメーションを追加した。あわせて `npm install` のハング（キャッシュ破損）を修復。
- 変更ファイル:
  - src/utils/animation/cardFly.js — 新規。`getBoundingClientRect` を用いた飛ぶアニメ（`flyEnter`/`flyLeave`）
  - src/components/molecules/HandsShowed.vue — 手札を `transition-group` 化。捨て札へ飛ぶ/山札・捨て札から飛んでくる演出＋並び替えスライド＋選択浮き
  - src/components/molecules/HandsHidden.vue — 相手手札を `transition-group` 化（180度回転のためCSSフェード+スライド方式）
  - src/components/molecules/Deck.vue — 山札 `.deck-pile`／捨て札 `.discard-pile` クラス付与（座標取得用）
  - src/components/organisms/BoardSurface.vue — `drawSource` プロップの配線
  - src/pages/PlayGame.vue — `drawSource` 設定（山札/捨て札クリックで起点切替）＋新ゲーム時の再マウント `gameKey`
  - src/script/game.js — 相手ターンの捨て→引きが見えるよう 0.5 秒の間を追加
- 理由: カードの動きを視覚化し、自分と相手の手の動きを追えるようにするため。
