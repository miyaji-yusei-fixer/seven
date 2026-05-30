# Claude 変更履歴

Claude Code で行った変更の履歴を新しいものから順に記録する。

## 2026-05-31 アニメーション実装のレビュー指摘対応

- 概要: PR #13 のセルフレビュー指摘を反映。`drawSource`（引いたカードの起点）の管理を `Game` インスタンス側へ移し、操作と状態を原子的に同期。z-index の重複指定を整理。
- 変更ファイル:
  - src/script/game.js — `drawSource` を Game の状態として保持。`throwAndDrawDeck`/`throwAndDrawDiscard` 内で起点を設定（プロップ伝播タイミング依存を解消）
  - src/pages/PlayGame.vue — `drawSource` の data・個別バインドを削除し `props()` 経由で `game.drawSource` を渡すよう変更
  - src/components/molecules/HandsShowed.vue — `.card-leave-active` の z-index 重複指定を削除（JS フック側で担保）
- 理由: 引いたカードの起点が稀にズレる懸念を構造的に解消し、状態管理の一貫性と可読性を高めるため。

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
