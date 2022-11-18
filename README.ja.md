# Kindle Booklog Sync

**Warning**

書籍購入時にamazon から送られてくるメールの仕様が変更となったため、正しく動作しません。

[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp)
[![Node version](https://img.shields.io/badge/node-v14.16.1-blue)](https://github.com/ysmtegsr/kindle-booklog-sync)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/ysmtegsr/kindle-booklog-sync)
![GitHub](https://img.shields.io/github/license/ysmtegsr/kindle-booklog-sync)
[![Lint](https://github.com/ysmtegsr/kindle-booklog-sync/actions/workflows/lint.yml/badge.svg)](https://github.com/ysmtegsr/kindle-booklog-sync/actions/workflows/lint.yml)
[![Deployment](https://github.com/ysmtegsr/kindle-booklog-sync/actions/workflows/deploy.yml/badge.svg)](https://github.com/ysmtegsr/kindle-booklog-sync/actions/workflows/deploy.yml)

| [英語](https://github.com/ysmtegsr/kindle-booklog-sync) | 日本語 |
| --- | --- |

[Kindle](https://www.amazon.co.jp/ranking?type=top-sellers&ref_=nav_cs_bestsellers_1837a9214239486ba2b00680c5ef8837) で購入した書籍を [ブクログ](https://booklog.jp) へ自動で登録するスクリプトです。

![image](https://user-images.githubusercontent.com/38056766/124377095-2fa69580-dce5-11eb-9d14-e14891e6f168.png)

## 機能

- ブクログへの認証
- Gmail インボックスを検索
- メール本文から asin を取得
- 取得した asin を元にブクログにアップロード
- ログをスプレッドシートに残す
- メールをアーカイブ
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

## デプロイメント

<details><summary>デプロイメントの前に準備が必要です。ご自身のリポジトリの secret に下記を登録してください。</summary>

コマンドラインを使って認証済みであれば（ `clasp login` を実行済みであれば）、`~/.clasprc.json` というファイルが生成されているはずです。それを参照して登録を完了してください。

```sh
$ cat ~/.clasprc.json | jq .
{
  "token": {
    "access_token": "XXXXXXXXXXXXXXXXXXX",
    "scope": "https://www.googleapis.com/auth/cloud-platform https://www.googleapis.com/auth/script.webapp.deploy openid https://www.googleapis.com/auth/script.projects https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/service.management https://www.googleapis.com/auth/logging.read https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/script.deployments https://www.googleapis.com/auth/drive.metadata.readonly",
    "token_type": "Bearer",
    "id_token": "XXXXXXXXXXXXXXXX",
    "expiry_date": 1234567890,
    "refresh_token": "AAAAAAAAAAAAABBBBBBBBBBBCCCCCCCCCCCCCCCCCDDDDDDDDDDDDEEEEEEEEEEEEEFFFFFFFFFFFFFGGGGGGGGGGGGGGGHHHHHHHHHH"
  },
  "oauth2ClientSettings": {
    "clientId": "1111111111-abcdefghijklmn22222222222.apps.googleusercontent.com",
    "clientSecret": "abcdefghijklmn",
    "redirectUri": "http://localhost"
  },
  "isLocalCreds": false
}
```

リポジトリの secrets を登録します。
`リポジトリの TOP` > `Settings` > `Secrets` で登録画面に行くことができます。

最終的には以下の添付画像のようになります。

![](https://user-images.githubusercontent.com/38056766/124621061-ee64e000-deb4-11eb-80bf-9bd9ffed7cdc.png)

</details>

デプロイメントは、タグをトリガーに GitHub Actions で行われます。詳細は [deploy.yml](https://github.com/ysmtegsr/kindle-booklog-sync/blob/main/.github/workflows/deploy.yml) をご覧ください。プレフィックス "v" から始まるタグを打つようにしてください。
