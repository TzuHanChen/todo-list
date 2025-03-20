// Helper function to get the base URL
export function getBaseUrl() {
  // In production, use the VERCEL_URL environment variable
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  // In development, use localhost
  return "http://localhost:3000"
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