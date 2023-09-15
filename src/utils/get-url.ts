// utils/getURL.ts
const IS_SERVER = typeof window === "undefined";
export function getURL(path = "/") {
  if (!process.env.NEXT_PUBLIC_SITE_URL) {
    return `https://${process.env.VERCEL_URL!}`;
  }
  const baseURL = IS_SERVER
    ? process.env.NEXT_PUBLIC_SITE_URL!
    : window.location.origin;
  return new URL(path, baseURL).toString();
}
