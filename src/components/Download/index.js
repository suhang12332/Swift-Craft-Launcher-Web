import React, { useState, useEffect } from 'react';
import './Download.css';

export default function Download() {
  const [latest, setLatest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/repos/suhang12332/SwiftCraftLauncher/releases/latest')
      .then((r) => r.json())
      .then((d) => {
        if (d.tag_name) {
          setLatest({
            version: d.tag_name,
            date: new Date(d.published_at).toLocaleDateString('zh-CN'),
            assets: d.assets || [],
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const url = latest
    ? (latest.assets.find((a) => a.name.endsWith('.zip') || a.name.endsWith('.dmg'))?.browser_download_url)
      || `https://github.com/suhang12332/SwiftCraftLauncher/releases/tag/${latest.version}`
    : 'https://github.com/suhang12332/SwiftCraftLauncher/releases';

  return (
    <section className="download-section" id="download">
      <div className="section-centered">
        <p className="section-eyebrow">获取 SwiftCraft</p>
        <h2 className="section-headline">开始使用。</h2>
        <p className="section-description">
          免费下载，永久使用。支持 macOS 14.0 及以上版本。
        </p>

        <div className="download-ctas">
          <a href={url} className="download-cta" target="_blank" rel="noopener noreferrer">
            <span className="icon-copy">{loading ? '获取最新版本...' : '下载 SwiftCraftLauncher'}</span>
          </a>
        </div>

        {latest && (
          <p className="download-version">{latest.version} · {latest.date}</p>
        )}

        <div className="download-links">
          <a href="https://github.com/suhang12332/SwiftCraftLauncher/releases" className="link-arrow" target="_blank" rel="noopener noreferrer">
            查看所有版本
          </a>
          <a href="https://github.com/suhang12332/SwiftCraftLauncher" className="link-arrow" target="_blank" rel="noopener noreferrer">
            源代码
          </a>
        </div>
      </div>
    </section>
  );
}
