export default async function request(url, { method = 'GET', credentials = 'same-origin', allowedStatusCodes = [], timeout = 5000, }) {
  const res = await fetch(url, { method, credentials, timeout, });
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
}
