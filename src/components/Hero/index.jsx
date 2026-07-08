import { useState, useEffect } from "react";
import { useI18n } from "../../i18n";
import { proxyUrl } from "../../utils/region";
import { RELEASES_URL } from "../../constants/urls";

function findAsset(assets, arch) {
  return assets.find((a) => {
    const name = a.name.toLowerCase();
    if (!name.endsWith(".zip") && !name.endsWith(".dmg")) return false;
    if (arch === "arm") return /arm|aarch/i.test(name);
    return /x86|x64|intel/i.test(name);
  });
}

export default function Hero() {
  const { t, locale } = useI18n();
  const [latest, setLatest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://api.github.com/repos/suhang12332/Swift-Craft-Launcher/releases/latest",
    )
      .then((r) => r.json())
      .then((d) => {
        if (d.tag_name) {
          setLatest({
            version: d.tag_name,
            date: new Date(d.published_at).toLocaleDateString(locale),
            assets: d.assets || [],
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [locale]);

  const getDownloadUrl = (arch) => {
    if (!latest) return RELEASES_URL;
    const asset = findAsset(latest.assets, arch);
    if (asset) return proxyUrl(asset.browser_download_url);
    return `https://github.com/suhang12332/Swift-Craft-Launcher/releases/tag/${latest.version}`;
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
            >
              <option value="" disabled>
                {loading ? t.hero.loading : t.hero.download}
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
        <img src="/slice.png" alt="Swift Craft Launcher" />
      </div>
    </section>
  );
}
