# Kindle Booklog Sync

[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp)

| English | [Japanese]() |
| --- | --- |

[Kindle](#) で購入した書籍を [ブクログ](#) へ自動で登録するスクリプトです。

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
