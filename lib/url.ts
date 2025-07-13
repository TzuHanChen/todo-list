export function getBaseUrl() {
  let base = '';
  if (typeof window !== "undefined") {
    base = window.location.origin;
  } else {
    base = process.env.NEXT_PUBLIC_VERCEL_URL ||
      process.env.NEXT_PUBLIC_VERCEL_DEV_URL ||
      "http://localhost:3000";
  }

  return /^https?:\/\//.test(base) ? base : `https://${base}`;
}

export function getQueryString(searchParams: { [key: string]: string | string[] | undefined }) {
  if (Object.entries(searchParams).length > 0) {
    return '?' + Object.entries(searchParams)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return value.map((v) => `${key}=${v}`).join("&");
        } else if (typeof value === "string") {
          return `${key}=${value}`;
        }
        return "";
      })
      .filter((str) => str !== "")
      .join("&");
  } else {
    return ''
  }
}