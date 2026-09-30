import { useEffect, useRef, useState } from "react";
import { useI18n } from "../../i18n";
import { useTheme } from "../ThemeContext";

const FEATURE_IDS = ["native", "account", "skins"];
const ACCENTS = ["#2997ff", "#bf5af2", "#ff9f0a"];

const svgProps = (key) => ({
  key,
  viewBox: "0 0 24 24",
  fill: "none",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: "false",
});

const MORE_ICONS = [
  <svg {...svgProps("loaders")} stroke={ACCENTS[0]}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="2" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="2" strokeOpacity="0.45" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="2" strokeOpacity="0.45" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="2" />
  </svg>,
  <svg {...svgProps("instances")} stroke={ACCENTS[1]}>
    <path
      d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"
      strokeOpacity="0.45"
    />
    <rect x="8" y="8" width="12" height="12" rx="3" />
  </svg>,
  <svg {...svgProps("updates")} stroke={ACCENTS[2]}>
    <path d="M23 4v6h-6" strokeOpacity="0.45" />
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
  </svg>,
  <svg {...svgProps("dark-mode")} stroke={ACCENTS[0]}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    <path d="M19 4.5v2.5M17.75 5.75h2.5" strokeOpacity="0.45" />
  </svg>,
  <svg {...svgProps("languages")} stroke={ACCENTS[1]}>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" strokeOpacity="0.45" />
    <path
      d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
      strokeOpacity="0.45"
    />
  </svg>,
  <svg {...svgProps("open-source")} stroke={ACCENTS[2]}>
    <path d="M16 18l6-6-6-6" />
    <path d="M8 6l-6 6 6 6" strokeOpacity="0.45" />
  </svg>,
];

function FeatureMock() {
  return (
    <div className="feature-mock" aria-hidden="true">
      <div className="feature-mock-titlebar">
        <span className="feature-mock-dot" />
        <span className="feature-mock-dot" />
        <span className="feature-mock-dot" />
        <span className="feature-mock-titlebar-fill" />
      </div>
      <div className="feature-mock-body">
        <div className="feature-mock-sidebar">
          <div className="feature-mock-row feature-mock-row--active" />
          <div className="feature-mock-row" />
          <div className="feature-mock-row" />
          <div className="feature-mock-row" />
        </div>
        <div className="feature-mock-content">
          <div className="feature-mock-hero" />
          <div className="feature-mock-line feature-mock-line--w80" />
          <div className="feature-mock-line feature-mock-line--w60" />
          <div className="feature-mock-grid">
            <div className="feature-mock-card" />
            <div className="feature-mock-card" />
            <div className="feature-mock-card" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureMedia({ src, fallbackSrc, alt }) {
  const [current, setCurrent] = useState(src);

  useEffect(() => {
    setCurrent(src);
  }, [src]);

  if (!current) return <FeatureMock />;

  const handleError = () => {
    if (fallbackSrc && current !== fallbackSrc) {
      setCurrent(fallbackSrc);
    } else {
      setCurrent(null);
    }
  };

  return (
    <img
      src={current}
      alt={alt}
      loading="lazy"
      onError={handleError}
    />
  );
}

export default function Features() {
  const { t, locale } = useI18n();
  const { theme } = useTheme();
  const sectionRef = useRef(null);

  useEffect(() => {
    const nodes = sectionRef.current
      ? sectionRef.current.querySelectorAll("[data-reveal]")
      : [];

    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const items = t.features?.items || [];

  return (
    <section className="features" id="features" ref={sectionRef}>
      <div className="features-header" data-reveal>
        <h2 className="features-title">{t.features.title}</h2>
        <p className="features-subtitle">{t.features.subtitle}</p>
      </div>

      <div className="feature-list">
        {items.map((item, i) => (
          <article
            key={FEATURE_IDS[i] || i}
            className={`feature-block${i % 2 ? " feature-block--reverse" : ""}`}
            style={{ "--feature-accent": ACCENTS[i % ACCENTS.length] }}
            data-reveal
          >
            <div className="feature-copy">
              <h3 className="feature-title">{item.title}</h3>
              <p className="feature-body">{item.body}</p>
            </div>
            <div className="feature-media">
              <FeatureMedia
                src={`/${locale}/features/${theme}/${FEATURE_IDS[i]}.png`}
                fallbackSrc={`/${locale}/features/${
                  theme === "dark" ? "light" : "dark"
                }/${FEATURE_IDS[i]}.png`}
                alt={item.title}
              />
            </div>
          </article>
        ))}
      </div>

      <div className="features-more" data-reveal>
        <h3 className="features-more-title">{t.features.moreTitle}</h3>
        <div className="features-more-grid">
          {(t.features.more || []).map((item, i) => (
            <div className="features-more-item" key={item.title}>
              <span className="features-more-icon">
                {MORE_ICONS[i % MORE_ICONS.length]}
              </span>
              <h4 className="features-more-item-title">{item.title}</h4>
              <p className="features-more-item-body">{item.body}</p>
            </div>
          ))}
        </div>

        <p className="features-more-cta">
          {t.features.moreCta}{" "}
          <a href="#hero" className="features-more-cta-link">
            {t.features.moreCtaLink}
            <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
              <path
                d="M6 3.5l4.5 4.5L6 12.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </p>
      </div>
    </section>
  );
}
