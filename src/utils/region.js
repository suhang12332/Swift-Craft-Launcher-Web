const CHINA_PROXY = "https://gh-proxy.com";

export function isChinaTimezone() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return tz === "Asia/Shanghai" || tz === "Asia/Chongqing" || tz === "Asia/Harbin" || tz === "Asia/Urumqi";
  } catch {
    return false;
  }
}

export function proxyUrl(url) {
  if (!url) return url;
  return isChinaTimezone() ? `${CHINA_PROXY}/${url}` : url;
}
