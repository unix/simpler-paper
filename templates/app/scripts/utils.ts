const headers = new Headers()
headers.append('Accept', 'text/html,application/xhtml+xml,application/xml')

export const findHTML = (url: string): Promise<Response> => {
  
  return new Promise((r, j) => {
    window.fetch(url, {
      method: 'GET',
      mode: 'no-cors',
      cache: 'default',
      credentials: 'same-origin',
      headers,
    })
    .then(res => r(res))
    .catch(e => j(e))
  })
}
