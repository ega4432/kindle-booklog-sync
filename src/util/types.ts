export interface GmailApp {
  search(query: string): GmailThread[]
}

export interface UrlFetchApp {
  fetch(url: string, params: RequestParam): HTTPResponse
}

export interface RequestParam {
  method: string
  followRedirects: boolean
  headers: {
    Referer: string
    Cookie?: string
  }
  payload: LoginPayload | UploadPayload
}

export interface LoginPayload {
  account: string
  password: string
}

export interface UploadPayload {
  isbns: string
  category_id: number
  status: number
}
