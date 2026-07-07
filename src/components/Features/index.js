import React, { useEffect, useRef } from 'react';
import './Features.css';

const features = [
  {
    eyebrow: '加载器',
    headline: '五大加载器，一键切换。',
    desc: '内置 Vanilla、Fabric、Forge、NeoForge、Quilt 五大 Mod 加载器。自动检测版本兼容性，无需手动配置，点击即可启动。',
    highlight: '一键切换，零配置。',
  },
  {
    eyebrow: 'Mod 平台',
    headline: 'Modrinth 与 CurseForge，尽在掌握。',
    desc: '两大 Mod 平台深度整合，统一搜索界面、智能版本匹配、一键安装到游戏实例。再也不用在不同网站之间来回切换。',
    highlight: '统一搜索，一键安装。',
  },
  {
    eyebrow: '账户',
    headline: '多账户，轻松管理。',
    desc: '支持 Microsoft 正版、Yggdrasil 第三方服务器、离线模式三种登录方式。多账号切换自如，管理毫不费力。',
    highlight: '三种登录方式，一个启动器。',
  },
];

function StorySection({ eyebrow, headline, desc, highlight }) {
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
    <div className="product-stories-section reveal" ref={ref}>
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

export default function Features() {
  return (
    <section className="features-section" id="features">
      {features.map((f) => (
        <StorySection key={f.eyebrow} {...f} />
      ))}
    </section>
  );
}
