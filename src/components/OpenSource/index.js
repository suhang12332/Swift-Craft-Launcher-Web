import React from 'react';
import './OpenSource.css';

export default function OpenSource() {
  return (
    <section className="open-source-section" id="open-source">
      <div className="section-centered">
        <p className="section-eyebrow">开源</p>
        <h2 className="section-headline">完全开源。</h2>
        <p className="section-description">
          采用 AGPL v3 协议开源，每一行代码都对社区透明。欢迎贡献代码、报告问题、提出建议。
        </p>
        <div className="open-source-ctas">
          <a href="https://github.com/suhang12332/SwiftCraftLauncher" className="open-source-cta" target="_blank" rel="noopener noreferrer">
            在 GitHub 上查看
          </a>
          <a href="https://github.com/suhang12332/SwiftCraftLauncher/issues" className="open-source-cta open-source-cta--ghost" target="_blank" rel="noopener noreferrer">
            报告问题
          </a>
        </div>
      </div>
    </section>
  );
}
