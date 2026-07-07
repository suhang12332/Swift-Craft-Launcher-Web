import React, { useEffect, useRef } from 'react';
import './Highlights.css';

const highlights = [
  {
    eyebrow: '性能',
    headline: '原生 Swift，极速启动。',
    desc: '基于 SwiftUI 从零构建，充分利用 Apple Silicon 的强大性能。游戏启动、Mod 扫描、资源下载——每一步都快人一步。',
    highlight: '每一步都快人一步。',
  },
  {
    eyebrow: 'AI',
    headline: 'AI 驱动的智能管理。',
    desc: '内置 AI 助手分析崩溃日志、推荐 Mod、回答问题。支持 OpenAI API 和 Ollama 本地模型，数据完全由你掌控。',
    highlight: '数据完全由你掌控。',
  },
];

function HighlightSection({ eyebrow, headline, desc, highlight }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) e.target.classList.add('visible'); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const parts = desc.split(highlight);

  return (
    <div className="highlight-section reveal" ref={ref}>
      <div className="section-centered">
        <p className="section-eyebrow">{eyebrow}</p>
        <h2 className="section-headline">{headline}</h2>
        <p className="section-description">
          {parts.map((part, j, arr) => (
            <React.Fragment key={j}>
              {part}
              {j < arr.length - 1 && <span className="highlight">{highlight}</span>}
            </React.Fragment>
          ))}
        </p>
        <div className="section-cta">
          <a href="#download" className="link-arrow">了解更多</a>
        </div>
      </div>
    </div>
  );
}

export default function Highlights() {
  return (
    <section className="highlights" id="highlights">
      {highlights.map((h) => (
        <HighlightSection key={h.eyebrow} {...h} />
      ))}
    </section>
  );
}
