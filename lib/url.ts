export function getBaseUrl() {
  // Check if we're running in the browser
  if (typeof window !== "undefined") {
    // In the browser, use the current window location as the base
    return window.location.origin
  }

  // For server-side, use environment variables
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return process.env.NEXT_PUBLIC_VERCEL_URL
  }
  if (process.env.NEXT_PUBLIC_VERCEL_DEV_URL) {
    return process.env.NEXT_PUBLIC_VERCEL_DEV_URL
  }

  // Fallback for local development
  return "http://localhost:3000"
  // return /^https?:\/\//.test(base) ? base : `https://${base}`;
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