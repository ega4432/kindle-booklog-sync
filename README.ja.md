# Kindle Booklog Sync

[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp)
[![Node version](https://img.shields.io/badge/node-v14.16.1-blue)](https://github.com/ysmtegsr/kindle-booklog-sync)
![GitHub](https://img.shields.io/github/license/ysmtegsr/kindle-booklog-sync)
[![Lint](https://github.com/ysmtegsr/kindle-booklog-sync/actions/workflows/lint.yml/badge.svg)](https://github.com/ysmtegsr/kindle-booklog-sync/actions/workflows/lint.yml)
[![Deployment](https://github.com/ysmtegsr/kindle-booklog-sync/actions/workflows/deploy.yml/badge.svg)](https://github.com/ysmtegsr/kindle-booklog-sync/actions/workflows/deploy.yml)

| [英語](https://github.com/ysmtegsr/kindle-booklog-sync) | 日本語 |
| --- | --- |

[Kindle](https://www.amazon.co.jp/ranking?type=top-sellers&ref_=nav_cs_bestsellers_1837a9214239486ba2b00680c5ef8837) で購入した書籍を [ブクログ](https://booklog.jp) へ自動で登録するスクリプトです。

## 環境

```sh
$ node --version
v14.16.1

$ yarn --version
1.22.10

$ clasp --version
2.3.1
```

## セットアップ

### インストール

```sh
# clasp CLI を導入していない場合は実行
$ npm install -g @google/clasp

$ git clone git@github.com:ysmtegsr/kindle-booklog-sync.git

$ yarn
```

### 事前に準備するもの

- Google Account
  - Apps Script
  - Gmail
  - Spreadsheet
- Booklog Account

## 開発手順

```sh
# clasp 認証
$ clasp login

# プロジェクトを作成
$ clasp create --title "kindle-booklog-sync" \
    --type sheets \
    --rootDir ./src

# デプロイ
$ yarn push
```

### Tips

```sh
# コードチェック
$ yarn lint

# 変更を監視
$ yarn watch
```
