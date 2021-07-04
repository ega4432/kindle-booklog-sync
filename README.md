# Kindle Booklog Sync

[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp)
[![Node version](https://img.shields.io/badge/node-v14.16.1-blue)](https://github.com/ysmtegsr/kindle-booklog-sync)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/ysmtegsr/kindle-booklog-sync)
![GitHub](https://img.shields.io/github/license/ysmtegsr/kindle-booklog-sync)
[![Lint](https://github.com/ysmtegsr/kindle-booklog-sync/actions/workflows/lint.yml/badge.svg)](https://github.com/ysmtegsr/kindle-booklog-sync/actions/workflows/lint.yml)
[![Deployment](https://github.com/ysmtegsr/kindle-booklog-sync/actions/workflows/deploy.yml/badge.svg)](https://github.com/ysmtegsr/kindle-booklog-sync/actions/workflows/deploy.yml)

| English | [Japanese](https://github.com/ysmtegsr/kindle-booklog-sync/blob/main/README.md) |
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

$ git clone git@github.com:ysmtegsr/kindle-booklog-sync.git

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
