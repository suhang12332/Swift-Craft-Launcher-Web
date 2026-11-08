# Swift Craft Launcher Website

The marketing site for [Swift Craft Launcher](https://github.com/suhang12332/Swift-Craft-Launcher),
a lightweight, native Minecraft launcher for macOS built with Swift and SwiftUI.

- Live site: <https://web.scl.isiah.top>
- Website repository: <https://github.com/suhang12332/Swift-Craft-Launcher-Web>
- Product repository: <https://github.com/suhang12332/Swift-Craft-Launcher>

## Tech stack

- Next.js 14 (Pages Router)
- React 18
- styled-components
- react-feather
- react-parallax

## Getting started

Requirements: Node.js 18.17 or later.

```bash
npm ci
npm run dev
```

Open <http://localhost:3000>.

Production build:

```bash
npm run build
npm start
```

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |

## Features

- Hero, header, feature grid, contributors, community section, and footer
- Download links to the latest GitHub release, with architecture detection
- GitHub, Discord, QQ group, Bilibili, documentation, and license links
- Responsive desktop, tablet, and mobile layouts, including the mobile menu
- Automatic light/dark appearance based on `prefers-color-scheme`
- Parallax hero with scroll-driven window and MacBook transforms
- Runtime contributor data from the Swift Craft Launcher APIs

## Internationalization

The site supports English, Simplified Chinese, and Traditional Chinese.

- The default language follows the system language via `navigator.language`.
- `zh-CN`, `zh-SG`, and other Simplified Chinese variants use `zh-CN`.
- `zh-TW`, `zh-HK`, `zh-MO`, and `zh-Hant` variants use `zh-TW`.
- Unsupported system languages fall back to English.

Because the site is statically generated, English is rendered first and the
detected language is applied after hydration. Translation files live in
`i18n/locales/`.

## Project structure

```text
components/
  common/          Header, Footer, contributors, community, Typography, Button, Site, layout primitives
  pages/home/      Hero section, hero artwork, feature grid
data/              Site links and navigation config
hooks/             Window dimensions, download, and responsive visibility helpers
i18n/              Locale detection, provider, and translation files
pages/             Next.js entry points (_app, _document, index)
public/            Hero artwork and MacBook masks (app icons load remotely)
styles/            Global CSS, theme tokens, typography, spacing, breakpoints
assets/            Community SVG icons
```

## Hero artwork

The hero uses a floating app window plus a masked MacBook with a separate screen
image. Replace these files with your own artwork while keeping the same names:

```text
public/app-window-light.png        floating app window, light appearance
public/app-window-dark.png         floating app window, dark appearance
public/macbook-light.jpg           MacBook hardware, light appearance
public/macbook-dark.jpg            MacBook hardware, dark appearance
public/macbook-screen-light.jpg    MacBook screen content, light appearance
public/macbook-screen-dark.jpg     MacBook screen content, dark appearance
public/macbook-mask.png            MacBook screen mask
public/macbook-mask-2x.png         MacBook screen mask (retina)
public/macbook-shape-mask.png      MacBook body mask
public/macbook-shape-mask-2x.png   MacBook body mask (retina)
```

Recommended dimensions follow the current files: app window `3434 × 2020`,
MacBook hardware `1204 × 736`, and screen content `984 × 636`.

## Notes

Release metadata (`v1.3.8`, macOS 14+) is hard-coded in `pages/index.js` so the
site can build without calling the GitHub API. Update it when a new release
ships.
