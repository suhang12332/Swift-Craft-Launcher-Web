import React from 'react';
import './Hero.css';

export default function Hero() {
  return (
    <section className="marquee" id="hero">
      <div className="marquee-scrim" />

      <div className="marquee-content">
        <p className="marquee-eyebrow">SwiftCraftLauncher</p>
        <h1 className="marquee-headline">
          Minecraft 启动器。
        </h1>
        <p className="marquee-tagline">
          专为 macOS 打造，Swift 原生构建。
        </p>

        <div className="marquee-ctas">
          <a href="#download" className="marquee-cta">
            <span className="icon-copy">下载</span>
          </a>
          <a href="#features" className="marquee-cta marquee-cta--link">
            <span className="icon-copy">了解更多</span>
            <span className="icon icon-after more" />
          </a>
        </div>
      </div>
    </section>
  );
}
