type HTTPMIMEType =
    | "application/json"
    | "application/x-www-form-urlencoded"
    | "text/html"
    | "image/*"
    | "multipart/form-data"

type HTTPMethod =
    | "GET"
    | "POST"
    | "PUT"
    | "PATCH"
    | "DELETE"

type HTTPHeaders = {
    "Content-Type": HTTPMIMEType
    "Accept": HTTPMIMEType
    "Authorization": string
    "Cookie": string
}

const apiCall = (method: HTTPMethod, cb: Function) => <T>(url: string) => {
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  })
    .then(res => res.json())
    .then(res => cb(res))
    .catch(err => { throw err })
}

export {}