export default async function request(url, { credentials = 'same-origin', allowedStatusCodes = [], timeout = 5000, }) {
  const res = await fetch(url, { credentials, timeout, });
  switch (res.status) {
    case 200: {
      return await res.json();
    }
    default: {
      if (allowedStatusCodes.indexOf(res.status) >= 0) return;
      throw new Error(`${url} returned ${res.status} ${res.statusText}`);
    }
  }
}
