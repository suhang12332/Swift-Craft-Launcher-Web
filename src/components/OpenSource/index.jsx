import React, { useState, useEffect } from "react";
import { useI18n } from "../../i18n";

const DEFAULT_AVATAR =
  "https://mc-heads.net/avatar/9dde22a18d5f488fb48e849335b748e9/50";

const githubContributors = [
  {
    login: "suhang12332",
    avatar_url: "https://avatars.githubusercontent.com/u/48873455?v=4",
    html_url: "https://github.com/suhang12332",
    contributions: 1490,
  },
  {
    login: "Hongbro886",
    avatar_url: "https://avatars.githubusercontent.com/u/185684679?v=4",
    html_url: "https://github.com/Hongbro886",
    contributions: 32,
  },
  {
    login: "hjy-233",
    avatar_url: "https://avatars.githubusercontent.com/u/186374453?v=4",
    html_url: "https://github.com/hjy-233",
    contributions: 15,
  },
  {
    login: "RayanceKing",
    avatar_url: "https://avatars.githubusercontent.com/u/88320297?v=4",
    html_url: "https://github.com/RayanceKing",
    contributions: 11,
  },
  {
    login: "ImReak",
    avatar_url: "https://avatars.githubusercontent.com/u/68633297?v=4",
    html_url: "https://github.com/ImReak",
    contributions: 6,
  },
  {
    login: "DeepChTi",
    avatar_url: "https://avatars.githubusercontent.com/u/136802016?v=4",
    html_url: "https://github.com/DeepChTi",
    contributions: 4,
  },
  {
    login: "mvanhorn",
    avatar_url: "https://avatars.githubusercontent.com/u/455140?v=4",
    html_url: "https://github.com/mvanhorn",
    contributions: 2,
  },
  {
    login: "Mengobs",
    avatar_url: "https://avatars.githubusercontent.com/u/143482922?v=4",
    html_url: "https://github.com/Mengobs",
    contributions: 2,
  },
  {
    login: "AndyOctopus",
    avatar_url: "https://avatars.githubusercontent.com/u/134780670?v=4",
    html_url: "https://github.com/AndyOctopus",
    contributions: 1,
  },
  {
    login: "PotatoNR",
    avatar_url: "https://avatars.githubusercontent.com/u/175548456?v=4",
    html_url: "https://github.com/PotatoNR",
    contributions: 1,
  },
];

function getAvatar(url) {
  if (!url || !url.startsWith("http")) return DEFAULT_AVATAR;
  return url;
}

export default function OpenSource() {
  const { t } = useI18n();
  const [coreContributors, setCoreContributors] = useState([]);

  useEffect(() => {
    fetch(
      "https://suhang12332.github.io/Swift-Craft-Launcher-Assets/contributors/contributors.json",
    )
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
