export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
export const privacyEmail = process.env.NEXT_PUBLIC_PRIVACY_EMAIL || "";
const configuredX = process.env.NEXT_PUBLIC_X_URL || "https://x.com/routarachain";
const configuredTelegram = process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me/routarachain";
export const xUrl = /^https:\/\/(www\.)?(x\.com|twitter\.com)\/[A-Za-z0-9_]{1,15}\/?$/.test(configuredX) ? configuredX : "";
export const telegramUrl = /^https:\/\/t\.me\/[A-Za-z0-9_]{5,32}\/?$/.test(configuredTelegram) ? configuredTelegram : "";
export const navigation = [
  { label: "Overview", href: "/#overview" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Vision", href: "/#vision" },
  { label: "FAQ", href: "/#faq" },
];
