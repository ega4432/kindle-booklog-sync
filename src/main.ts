type Headers = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

const booklogId: string = PropertiesService.getScriptProperties()
  .getProperty('BOOKLOG_ID') || ""

const booklogPassword: string = PropertiesService.getScriptProperties()
  .getProperty('BOOKLOG_PASSWORD') || ""

const logSheet = SpreadsheetApp.getActiveSpreadsheet()
  .getSheetByName('log')

const searchEmail = () => {
  return GmailApp.search("from:digital-no-reply@amazon.co.jp in:inbox")
}

const loginToBooklog = (): string[] => {
  const url = 'https://booklog.jp/login'
  const params = {
    method: 'post',
    followRedirects: false,
    headers: { Referer: url },
    payload: {
      account: booklogId,
      password: booklogPassword
    }
  } as GoogleAppsScript.URL_Fetch.URLFetchRequestOptions
  const res = UrlFetchApp.fetch(url, params)

  const headers = res.getAllHeaders() as Headers

  if ('Set-Cookie' in headers) {
    const cookies = headers['Set-Cookie'] === 'string'
      ? [headers['Set-Cookie']]
      : headers['Set-Cookie']

    for (let i = 0; i < cookies.length; i++) {
      cookies[i] = cookies[i].split(';')[0]
    }

    return cookies
    return []
  } else {
    return []
  }
}

const getAsinList = (thread: GoogleAppsScript.Gmail.GmailThread): string[] => {
  const asinList = thread.getMessages()[0]
    .getBody()
    .match(/dp%2F.{10}/g)

  if (!asinList) {
    return []
  }

  for (let i = 0; i < asinList.length; i++) {
    asinList[i] = asinList[i].slice(-10)
  }

  return asinList
}

const uploadBook = (cookies: string[], asinList: string[]): GoogleAppsScript.URL_Fetch.HTTPResponse => {
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
  if (logSheet && text) {
    logSheet.appendRow([new Date(), asin, text])
  }
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

  threads.forEach((thread: GoogleAppsScript.Gmail.GmailThread): void => {
    const asinList = getAsinList(thread)
    if (typeof asinList !== 'undefined') {
      Logger.log('asin is: ' + asinList.join(', '))

      const res = uploadBook(cookies, asinList)
      const results = res.getContentText()
        .match(/.*tc(?:pink|blue) t10M.*/g)

      if (results) {
        results.forEach((result: string) => {
          const text = result.match(/>(.*)</)
          if (text) {
            log(asinList.join(', '), text[1])
          }
        })
      }

      thread.markRead().moveToArchive()
    } else {
      Logger.log('asin is undefined')
    }
  })
}

