export const url =
  process.env.NEXT_PUBLIC_SITE_URL ||
  `https://${process.env.VERCEL_URL}` ||
  "http://localhost:3000";

export const config = {
  headers: {
    Accept: "application/json",
  },
};

export const key = "6d207e02198a847aa98d0a2a901485a5";
