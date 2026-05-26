# 🐎 競馬演出スコアラー

Excel 解答ファイルをアップロードするだけで自動採点する Web アプリです。
採点結果をランク・正答率・動画演出で表示し、履歴管理・CSV エクスポートにも対応しています。

---

## 🖥️ 技術スタック

| レイヤー         | 技術                               |
| ---------------- | ---------------------------------- |
| フロントエンド   | React 19 / Vite 8 / Tailwind CSS 4 |
| アニメーション   | Framer Motion 12                   |
| グラフ           | Recharts 3                         |
| バックエンド     | Django 6                           |
| DB               | SQLite3                            |
| Excel 処理       | pandas 3 / openpyxl 3              |
| 静的ファイル配信 | WhiteNoise 6                       |

---

## 📁 プロジェクト構成

```
portfolio_kweb/
├── manage.py
├── requirements.txt
├── db.sqlite3
├── keiba_app/          # Django アプリ
│   ├── models.py
│   ├── views.py
│   ├── scoring_engine.py
│   ├── urls.py
│   └── static/
│       └── videos/     # 演出動画（excellent / good / try_again）
├── frontend/           # React アプリ
│   ├── src/
│   │   ├── App.jsx
│   │   └── components/
│   ├── package.json
│   └── vite.config.js
└── static/             # collectstatic 出力先
```

---

## ⚙️ 環境構築

### 必要環境

- Python 3.14.5
- Node.js v24.15.0
- npm 11.12.1

### バックエンド

```bash
# 仮想環境の作成・有効化
python -m venv venv
venv\Scripts\activate       # Windows
# source venv/bin/activate  # Mac/Linux

# パッケージインストール
pip install -r requirements.txt

# DB マイグレーション
python manage.py migrate

# 開発サーバー起動
python manage.py runserver
```

### フロントエンド

```bash
cd frontend

# パッケージインストール
npm install

# 開発サーバー起動
npm run dev
```

---

## 🚀 使い方

1. ブラウザで `http://localhost:5173` を開く
2. **解答マスター**（正解ファイル）をアップロード
3. **ユーザー回答ファイル**をアップロード
4. **採点ボタン**を押す
5. 採点結果・動画演出・正答率推移が表示される

> 異なる試験の組み合わせでアップロードした場合はアラートでエラーを表示します。

---

## 📊 主な機能

- **自動採点** — Excel ファイルを比較して正誤判定
- **ランク判定** — S / A / B / C の4段階
- **動画演出** — スコアに応じた動画をランダム再生
- **採点詳細** — 問題ごとの〇✖を2列レイアウトで表示
- **正答率推移グラフ** — 受験者ごとの推移を折れ線グラフで表示
- **履歴管理** — ユーザー・試験名でフィルタリング可能
- **CSV エクスポート** — 採点履歴を CSV でダウンロード

---

## 🔌 API エンドポイント

| メソッド | URL                         | 説明             |
| -------- | --------------------------- | ---------------- |
| POST     | `/api/score/`               | 採点実行         |
| GET      | `/api/history/`             | 履歴一覧取得     |
| DELETE   | `/api/history/delete/<id>/` | 履歴削除         |
| GET      | `/api/history/export/`      | CSV エクスポート |

---

## 📝 Excel ファイル仕様

| セル   | 内容                                      |
| ------ | ----------------------------------------- |
| A13    | 試験名                                    |
| A14    | 受験者名（ユーザー回答ファイルのみ）      |
| 解答欄 | 問題番号・解答を4列ペアで記入（最大40問） |

---

## 🐎 ランク基準

| ランク | 正答率   |
| ------ | -------- |
| S      | 100%     |
| A      | 70% 以上 |
| B      | 50% 以上 |
| C      | 50% 未満 |
