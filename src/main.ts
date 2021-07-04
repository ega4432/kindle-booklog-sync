const booklogId: string = PropertiesService.getScriptProperties()
  .getProperty('BOOKLOG_ID')

const booklogPassword: string = PropertiesService.getScriptProperties()
  .getProperty('BOOKLOG_PASSWORD')

const logSheet: Sheet = SpreadsheetApp.getActiveSpreadsheet()
  .getSheetByName('log')

const searchEmail = (): GmailThread[] => {
  return GmailApp.search("from:digital-no-reply@amazon.co.jp in:inbox")
}

const loginToBooklog = (): string[] => {
  const url = 'https://booklog.jp/login'
  const res = UrlFetchApp.fetch(url, {
    method: 'post',
    followRedirects: false,
    headers: { Referer: url },
    payload: {
      account: booklogId,
      password: booklogPassword
    }
  })

  const headers = res.getAllHeaders()

  if (typeof headers['Set-Cookie'] === 'undefined') {
    return []
  }

  const cookies = headers['Set-Cookie'] === 'string'
      ? [headers['Set-Cookie']]
      : headers['Set-Cookie']

  for (let i = 0; i < cookies.length; i++) {
    cookies[i] = cookies[i].split(';')[0]
  }

  return cookies
}

const getAsinList = (thread: GmailThread): string[] => {
  const asinList = thread.getMessages()[0]
    .getBody()
    .match(/dp%2F.{10}/g)

  for (let i = 0; i < asinList.length; i++) {
    asinList[i] = asinList[i].slice(-10)
  }

  return asinList
}

const uploadBook = (cookies: string[], asinList: string[]): HTTPResponse => {
  const url = 'https://booklog.jp/input'

  return UrlFetchApp.fetch(url, {
    method: 'post',
    headers: {
      Cookie: cookies.join(';'),
      Referer: url
    },
    payload: {
      isbns: asinList.join("\n"),
      category_id: 0, // なし
      status: 4 // 積読
    }
  })
}

const log = (asin: string, text: string): void => {
  logSheet.appendRow([new Date(), asin, text])
}

export const main = (): void => {
  const threads = searchEmail()

  if (!threads.length) {
    Logger.log('Nothing new book.')
    return
  }

  const cookies = loginToBooklog()

  if (!cookies.length) {
    Logger.log('Failed to authenticate to booklog.')
    return
  }

  threads.forEach((thread: GmailThread) => {
    const asinList = getAsinList(thread)
    if (typeof asinList !== 'undefined') {
      Logger.log('asin is: ' + asinList.join(', '))

      const res = uploadBook(cookies, asinList)
      const results = res.getContentText()
        .match(/.*tc(?:pink|blue) t10M.*/g)

      results.forEach((result: string) => {
        log(asinList.join(', '), result.match(/>(.*)</)[1])
      })

      thread.markRead().moveToArchive()
    } else {
      Logger.log('asin is undefined')
    }
  })
}

