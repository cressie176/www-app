import Cookies from 'universal-cookie';
import Url from 'url';

export default async function request(url, { method = 'GET', headers = {}, credentials = 'same-origin', allowedStatusCodes = [], timeout = 5000, }) {

  const res = await fetch(url, { method, credentials, timeout, headers: assignCsrfToken(headers), });
  switch (res.status) {
    case 200: {
      return await res.json();
    }
    case 201:
    case 204: {
      return;
    }
    default: {
      if (allowedStatusCodes.indexOf(res.status) >= 0) return;
      throw new Error(`${url} returned ${res.status} ${res.statusText}`);
    }
  }

  function assignCsrfToken(headers) {
    const { host } = Url.parse(url);
    if (host) return headers;

    const cookies = new Cookies();
    const csrfToken = cookies.get('x-csrf-token', { path: '/', });
    return {
      ...headers,
      'x-csrf-token': csrfToken,
    }
  }
}
