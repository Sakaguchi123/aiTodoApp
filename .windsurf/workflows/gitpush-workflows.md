---
description: 
---

---
description: テストが全て通ることを確認し、必ずブランチを切ってpushするためのワークフロー
---

# Git push ワークフロー（テスト必須・ブランチ運用）

## 目的
- すべてのテストがグリーンであることを確認してからpushする
- 必ず新しいブランチを切ってpushし、mainブランチには直接pushしない

---

## 手順

1. **最新のmainブランチを取得**
   ```sh
   git checkout main
   git pull origin main
   ```

2. **新しい作業ブランチを作成
    ブランチ名は「feature/xxxx」や「fix/xxxx」など、内容に応じて命名してください。**
   ```sh
   git checkout -b feature/your-branch-name
   ```

3. **テストを実行し、全てグリーンであることを確認**
   ```sh
   npm run test
   ```
   すべてのテストがパスすることを必ず確認してください
   テストが失敗した場合は修正してから再度実行


4. **作業・コミット**
   ```sh
   # ファイルを編集・追加
   git add .
   git commit -m "説明: 何をどうしたか"
   ```

5. **リモートにブランチをpush**
   ```sh
   git push origin feature/your-branch-name
   ``

3. **GitHub上でPull Request（PR）を作成**
   - mainブランチへのマージはPR経由で行う

**注意事項**
 - mainブランチへの直接pushは禁止です
 - テストが1つでも失敗している場合は絶対にpushしないでください
 - ブランチ名はわかりやすく、内容を端的に表現してください
