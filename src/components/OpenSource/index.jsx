import { useState, useEffect } from "react";
import { useI18n } from "../../i18n";
import { DEFAULT_AVATAR } from "./contributors";

function getAvatar(url) {
  if (!url || !url.startsWith("http")) return DEFAULT_AVATAR;
  return url;
}

export default function OpenSource() {
  const { t } = useI18n();
  const [githubContributors, setGithubContributors] = useState([]);
  const [coreContributors, setCoreContributors] = useState([]);

  useEffect(() => {
    fetch("https://swift-craft-launcher-contributors.suhang12332.workers.dev/contributors", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setGithubContributors(data);
        } else if (data.contributors) {
          setGithubContributors(data.contributors);
        }
      })
      .catch(() => {});

    fetch("https://swift-craft-launcher-contributors.pages.dev/contributors.json", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.contributors) {
          setCoreContributors(data.contributors);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="open-source-section" id="contributors">
      <div className="section-centered">
        <div className="contributors-group">
          <h3 className="contributors-subtitle">{t.contributors.github}</h3>
          <div className="contributors-list">
            {githubContributors.map((user) => (
              <a
                key={user.login}
                href={user.html_url}
                className="contributor-item"
                target="_blank"
                rel="noopener noreferrer"
                title={`${user.login} (${user.contributions} ${t.contributors.contributions})`}
              >
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="contributor-avatar"
                  loading="lazy"
                />
                <span className="contributor-name">{user.login}</span>
              </a>
            ))}
          </div>
        </div>

        {coreContributors.length > 0 && (
          <div className="contributors-group">
            <h3 className="contributors-subtitle">{t.contributors.core}</h3>
            <div className="contributors-list">
              {coreContributors.map((user) => {
                const Wrapper = user.url ? "a" : "div";
                const wrapperProps = user.url
                  ? {
                      href: user.url,
                      target: "_blank",
                      rel: "noopener noreferrer",
                    }
                  : {};
                return (
                  <Wrapper
                    key={user.name}
                    className="contributor-item"
                    title={user.name}
                    {...wrapperProps}
                  >
                    <img
                      src={getAvatar(user.avatar)}
                      alt={user.name}
                      className="contributor-avatar"
                      loading="lazy"
                    />
                    <span className="contributor-name">{user.name}</span>
                  </Wrapper>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
