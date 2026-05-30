# プロジェクト設定（seven）

Vue 2 + Vuetify 2 製のトランプゲーム「seven」。

## YOU MUST

- **Claude でコードを変更した場合、コミット前に必ず `CHANGELOG_CLAUDE.md` の先頭へエントリを追記する。**
  - 記載項目: 日付（`date "+%Y-%m-%d"` で取得）・要約タイトル・概要・変更ファイル一覧・理由
  - フォーマットは `CHANGELOG_CLAUDE.md` 既存エントリに合わせる（新しいものを上に）
- 回答は日本語で行う
- 一度に全てを変更せず、小さな変更を積み重ね段階的に進める
- 変更後はまとめて `npm run lint` を実行しエラーがないことを確認する

## メモ

- `docs/` は GitHub Pages 配信用のビルド成果物。手動編集せず `npm run build` で生成する
- `npm install` がハングする場合は `npm cache clean --force` 後に `npm install --no-audit --no-fund`
