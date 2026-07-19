# Kishor Choudhary — Portfolio

> Building something new — a personal portfolio site with a technical, engineering-drawing aesthetic.

A single-file, no-framework portfolio built with plain HTML, CSS, and JavaScript. Designed around a "blueprint" theme — deep navy background, drafting-style grid lines, an animated schematic in the hero, and a persistent corner title block (like a real engineering drawing) that tracks which section you're scrolled to.

**[🔗 Live Demo](#)** &nbsp;·&nbsp; **[🐛 Report an issue](../../issues)**

![Portfolio preview](./preview.png)

---

## ✨ Features

- **Blueprint-style visual theme** — drafting grid background, ink-cyan accent lines, engineering title block
- **Animated hero schematic** — SVG line-draw animation on load
- **Scroll-tracked title block** — corner tag updates to show the current section, like a sheet number
- **Scroll-reveal animations** — sections fade/slide in as you scroll, powered by `IntersectionObserver`
- **Fully responsive** — collapses cleanly to a mobile layout
- **Zero dependencies** — no build step, no framework, just one HTML file
- **Fast** — nothing to compile, nothing to install, deploys anywhere static files are served

## 🧱 Sections

| Sheet | Section | Description |
|---|---|---|
| 01 | Introduction | Hero with name, tagline, and animated schematic |
| 02 | About | Bio + quick-reference spec table |
| 03 | Skills | Languages, AI tools, and backend/web skills grouped by category |
| 04 | Projects | Featured builds with descriptions, tags, and repo links |
| 05 | Journey | Timeline from first learning to code to current projects |
| 06 | Contact | Email, GitHub, LinkedIn, and Discord |

## 🛠 Tech Stack

- **HTML5** — semantic structure
- **CSS3** — custom properties, CSS Grid/Flexbox, no framework
- **Vanilla JavaScript** — `IntersectionObserver` for scroll effects, no libraries
- **Fonts** — [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk), [IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans), [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) via Google Fonts

## 🚀 Getting Started

This is a single static HTML file — no build tools required.

```bash
# Clone the repo
git clone https://github.com/kishor-choudhary/portfolio.git
cd portfolio

# Open it directly in your browser
open portfolio.html      # macOS
start portfolio.html     # Windows
xdg-open portfolio.html  # Linux
```

Or just double-click `portfolio.html` — that's it.

### Deploying

Since it's a single static file, you can host it for free on any of these in a couple of minutes:

- **GitHub Pages** — push to a repo, enable Pages in Settings, done
- **Netlify** — drag and drop the file onto [netlify.com/drop](https://app.netlify.com/drop)
- **Vercel** — `vercel deploy` from the project folder

## 🎨 Customizing

All content lives directly in `portfolio.html` — no config files or CMS. Look for these anchors when editing:

- `<section id="about">` — bio and quick-facts table
- `<section id="skills">` — skill chip groups
- `<section id="projects">` — project cards (`.proj-card`)
- `<section id="experience">` — timeline entries (`.t-item`)
- `<section id="contact">` — contact links

Color palette and type scale are defined as CSS custom properties at the top of the `<style>` block (`:root { ... }`) — change them once and the whole site updates.

## 📌 Roadmap

- [ ] Add resume PDF and wire up the download button
- [ ] Add correct GitHub link for the Akinator project
- [ ] Add LinkedIn profile URL
- [ ] Add live demo links for deployed projects

## 📬 Contact

- **Email:** [kishorchoudhary395395@gmail.com](mailto:kishorchoudhary395395@gmail.com)
- **GitHub:** [@kishor-choudhary](https://github.com/kishor-choudhary)
- **Discord:** kishor.dev

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<sub>Drawn by Kishor Choudhary — Sheet 06 of 06 — Scale not to size.</sub>
