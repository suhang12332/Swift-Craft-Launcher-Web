# Swift Craft Launcher Website

The official website for Swift Craft Launcher, built with React.

## Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

Production build:

```bash
npm run build
npm start
```

## What is implemented

- Homepage hero, header, feature grid, contributors, community section, and footer
- Swift Craft Launcher copy, remote app icons, and hero artwork
- Download links to the latest GitHub release
- GitHub, Discord, QQ group, Bilibili, documentation, and license links
- Responsive desktop/tablet/mobile layouts, including the mobile navigation menu
- Automatic light/dark appearance based on `prefers-color-scheme`
- System-language detection with English, Simplified Chinese, and Traditional
  Chinese translations, falling back to English
- Parallax hero with scroll-driven window and MacBook transforms
- Local product artwork

## Hero image slots

The hero uses the original two-layer composition: a floating app window plus a masked
MacBook with a separate screen image. Replace these files with your own artwork while
keeping the same names:

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

Recommended dimensions follow the current files: app window `3434 × 2020`, MacBook
hardware `1204 × 736`, and screen content `984 × 636`.

## Structure

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

## Notes

Release metadata (`v1.3.8`, macOS 14+) is hard-coded in `pages/index.js` so the site
can build without calling the GitHub API. Update it when a new release ships.
