import { useState, useEffect } from "react";
import { useI18n } from "../../i18n";
import { useTheme } from "../ThemeContext";
import { RELEASES_URL } from "../../constants/urls";

const APPCAST_BASE =
  "https://swift-craft-launcher-update.suhang12332.workers.dev";

const GITHUB_DOWNLOAD = "https://github.com/suhang12332/Swift-Craft-Launcher/releases/download";
const DOWNLOAD_PROXY = "https://swift-craft-launcher-download.suhang12332.workers.dev";

function toProxyUrl(url) {
  return url.replace(GITHUB_DOWNLOAD, DOWNLOAD_PROXY);
}

function parseAppcast(xmlText) {
  const doc = new DOMParser().parseFromString(xmlText, "text/xml");
  const item = doc.querySelector("item");
  if (!item) return null;
  const version =
    item.querySelector("sparkle\\:shortVersionString, shortVersionString")
      ?.textContent || "";
  const url =
    item.querySelector("enclosure")?.getAttribute("url") || "";
  return { version, url: toProxyUrl(url) };
}

function fetchAppcast(arch) {
  const filename = arch === "arm" ? "appcast-arm64.xml" : "appcast-x86_64.xml";
  return fetch(`${APPCAST_BASE}/${filename}`, { cache: "no-store" })
    .then((r) => {
      if (!r.ok) throw new Error(r.status);
      return r.text();
    })
    .then(parseAppcast);
}

export default function Hero() {
  const { t, locale } = useI18n();
  const { theme } = useTheme();
  const [latest, setLatest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetchAppcast("arm")
      .then((data) => {
        if (cancelled || !data) throw new Error("parse failed");
        setLatest({ version: data.version, downloads: { arm: data.url } });
        // 拉 x86 补全下载链接
        return fetchAppcast("intel");
      })
      .then((data) => {
        if (cancelled || !data) return;
        setLatest((prev) =>
          prev ? { ...prev, downloads: { ...prev.downloads, intel: data.url } } : prev,
        );
      })
      .catch(() => setFetchError(true))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  const getDownloadUrl = (arch) => {
    if (!latest) return RELEASES_URL;
    if (arch === "arm" && latest.downloads?.arm) return latest.downloads.arm;
    if (arch === "intel" && latest.downloads?.intel) return latest.downloads.intel;
    return RELEASES_URL;
  };

  const handleArchChange = (e) => {
    const arch = e.target.value;
    if (arch) {
      const a = document.createElement("a");
      a.href = getDownloadUrl(arch);
      a.download = "";
      a.click();
      e.target.value = "";
    }
  };

  return (
    <section className="marquee" id="hero">
      <div className="marquee-scrim" />

      <div className="marquee-content">
        <p className="marquee-eyebrow">Swift Craft Launcher</p>
        <p className="marquee-tagline">{t.hero.tagline}</p>
        <p className="marquee-requirement">{t.hero.requirement}</p>
        <div className="marquee-ctas">
          <div className="marquee-download-select">
            <select
              className="marquee-cta-btn marquee-select"
              onChange={handleArchChange}
              defaultValue=""
              disabled={!loading && !latest}
            >
              <option value="" disabled>
                {loading
                  ? t.hero.loading
                  : fetchError
                    ? t.hero.fetchError
                    : `${t.hero.download} v${latest?.version || ""}`}
              </option>
              <option value="arm">{t.hero.appleChip}</option>
              <option value="intel">{t.hero.intel}</option>
            </select>
          </div>
        </div>

        <div className="marquee-brew">
          <code>
            brew install --cask
            suhang12332/swiftcraftlauncher/swift-craft-launcher
          </code>
        </div>
      </div>

      <div className="marquee-hero-image">
        <img src={`/${locale}/${theme}.png`} alt="Swift Craft Launcher" />
      </div>
    </section>
  );
}
