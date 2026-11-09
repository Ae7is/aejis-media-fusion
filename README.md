# Aejis Media Fusion — Marketing Site

A premium, single-page marketing website for Aejis Media Fusion, a subscription-based AI short-video studio.

## File Structure

```
aejis-media-fusion/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── config.js        # Edit form URL, plans, and contact links here
│   └── main.js          # Rendering, mobile menu, FAQ, scroll reveal
├── assets/
│   ├── logo.svg         # Placeholder wordmark (replace with real logo)
│   ├── favicon.svg
│   └── og-image.png     # Optional — add a 1200x630 PNG here
├── netlify.toml         # Netlify build + header config
└── README.md
```

## How to Run Locally

No build step, no npm, no frameworks. Just open the file:

```bash
# Option 1: open directly in your browser
xdg-open index.html   # Ubuntu/Linux
# or double-click index.html in your file manager

# Option 2: simple static server (Python)
python3 -m http.server 8000
# Then visit http://localhost:8000
```

## How to Edit the Config

Open `js/config.js` and update:

- **`formUrl`** — the Google Form intake URL used by every "Get Started" button
- **`plans`** — pricing names, amounts, features, and which plan is "Most popular"
- **`contact`** — email, WhatsApp, Instagram, TikTok. Leave a value empty to hide that footer item

## How to Deploy to Netlify

### Drag-and-drop (fastest)
1. Zip the `aejis-media-fusion` folder
2. Go to [netlify.com/drop](https://netlify.com/drop)
3. Drag and drop the zip file
4. Your site is live instantly

### Connect a Git repository
1. Push this folder to GitHub/GitLab/Bitbucket
2. In Netlify, click "Add new site" → "Import an existing project"
3. Connect your repo and deploy
4. Build command: leave empty; Publish directory: `.`

## How to Replace the Logo

1. Create your real logo as an SVG (or PNG)
2. Replace `assets/logo.svg`
3. If your logo is not square, update the `width`/`height`/`viewBox` in `index.html` header and footer accordingly

## How to Add a Custom Domain

1. In Netlify, go to **Domain settings** → **Add custom domain**
2. Enter your domain and follow the DNS verification steps
3. Netlify provisions SSL automatically

## Things to Replace Before Launch

- `assets/logo.svg` — placeholder wordmark; swap for your brand logo
- `assets/og-image.png` — add a 1200×630 social preview image and update the `og:image` meta tag in `index.html`
- Sample work section — currently CSS placeholders marked "Sample coming soon"; replace with real client videos/images
- `js/config.js` `contact` object — add your email, WhatsApp, Instagram, and TikTok links
- Canonical URL — update the `rel="canonical"` href in `index.html` to your live domain

## Accessibility & Performance

- Semantic HTML, skip-to-content link, visible focus states
- FAQ accordion is keyboard operable (Enter/Space)
- Respects `prefers-reduced-motion`
- WCAG AA contrast ratios on dark theme
- Deferred scripts, inline critical SVGs, no large images
- Works without JavaScript (pricing CTAs are plain `<a>` links to the form)
