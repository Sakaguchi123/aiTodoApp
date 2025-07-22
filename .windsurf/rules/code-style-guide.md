---
trigger: always_on
---

# コードスタイルとフォーマット
- コードフォーマットは最新版の Airbnb スタイルガイドに従う
- Typescrept のコンポーネントファイル名は PascalCase を使用する（例：UserCard.tsx）

# スタイリングと UI
- スタイリングには Tailwind CSS（最新版：v3.x）のみを使用する
- Tailwind CSS のベストプラクティスに従い、utility-first なクラスベースのスタイリングを徹底する

# データ取得とフォーム処理
- フォーム処理には最新の React Hook Form（最新版：v7.x）を必ず使用する
- フォームバリデーションには最新の Zod（最新版：v3.x）を必ず使用する
- データ取得には Next.js 推奨の fetch API と React Server Components を使用する

# 状態管理とロジック
- 状態管理には最新のjotaiを使用する

# GitHub 運用ルール
- issue や PR、ドキュメントなどは全て Markdown 形式で記述する
- 記述内容は明確かつ簡潔に、読みやすさを重視する

# 開発方法
- 私達はTDDをもちいてアプリ開発をします。（red→green→rifactaring）
- vitestを使ってテストを書いてください。
- 基本的に1tsxファイルにつき1testファイルが望ましいです。
- 指示がない場合はユニットテストを書いてください。
- testがない実装はしないでください。