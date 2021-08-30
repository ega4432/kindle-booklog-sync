# Kindle Booklog Sync

[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp)
[![Node version](https://img.shields.io/badge/node-v14.16.1-blue)](https://github.com/ega4432/kindle-booklog-sync)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/ega4432/kindle-booklog-sync)
![GitHub](https://img.shields.io/github/license/ega4432/kindle-booklog-sync)
[![Lint](https://github.com/ega4432/kindle-booklog-sync/actions/workflows/lint.yml/badge.svg)](https://github.com/ega4432/kindle-booklog-sync/actions/workflows/lint.yml)
[![Deployment](https://github.com/ega4432/kindle-booklog-sync/actions/workflows/deploy.yml/badge.svg)](https://github.com/ega4432/kindle-booklog-sync/actions/workflows/deploy.yml)

| English | [Japanese](https://github.com/ega4432/kindle-booklog-sync/blob/main/README.ja.md) |
| --- | --- |

A program that automatically uploads books purchased on [Kindle](https://www.amazon.co.jp/ranking?type=top-sellers&ref_=nav_cs_bestsellers_1837a9214239486ba2b00680c5ef8837) to [Booklog](https://booklog.jp).

![image](https://user-images.githubusercontent.com/38056766/124377095-2fa69580-dce5-11eb-9d14-e14891e6f168.png)

## Features

- Login to Booklog
- Search your Gmail inbox
- Get asin code from email body
- Upload new book to booklog using asin
- Leave a log on the spreadsheet
- Archive uploaded book notification emails

## Environments

```sh
$ node --version
v14.16.1

$ yarn --version
1.22.10

$ clasp --version
2.3.1
```

## Setup

### Installation

```sh
# If you haven't installed it yet, do the following
$ npm install -g @google/clasp

$ git clone git@github.com:ega4432/kindle-booklog-sync.git

$ yarn
```

### Dependencies

- Google Account
  - Apps Script
  - Gmail
  - Spreadsheet
- Booklog Account

## Usage

```sh
# Auth
$ clasp login

# Create project
$ clasp create --title "kindle-booklog-sync" \
    --type sheets \
    --rootDir ./src

# Deploy
$ yarn push
```

### Tips

```sh
# Lint
$ yarn lint

# In development
$ yarn watch
```

## Deployment

<details><summary>Preparation is required before deployment. Please register the following in the secret.</summary>

If you have been authenticated using the command line ( e.g. `clasp login` ), there should have generated `~/.clasprc.json`. Please refer to it and complete the registration.

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

You can go to that page with `Your Repository TOP` > `Settings` > `Secrets`.

The final result will be the attached image below.

![](https://user-images.githubusercontent.com/38056766/124621061-ee64e000-deb4-11eb-80bf-9bd9ffed7cdc.png)

</details>

Deployment is triggered by tags in GitHub Actions. See [deploy.yml](https://github.com/ega4432/kindle-booklog-sync/blob/main/.github/workflows/deploy.yml) for more details.
Please type the tag starting with the prefix "v".
