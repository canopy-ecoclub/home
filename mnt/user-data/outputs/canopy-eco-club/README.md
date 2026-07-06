# Canopy — Eco Club · Tree Plantation Drive Invite

A single-page, scroll-driven invitation microsite for the Canopy Eco Club's
Tree Plantation Drive at Government Omandurar Medical College, Chennai
(10 July 2026, 9–11 AM, Tower 5 GMC OGE).

Plain HTML/CSS/JS, GSAP + ScrollTrigger via CDN for scroll choreography,
no build step, no framework. Just open `index.html` or host the folder as-is.

## File structure

```
canopy/
├── index.html          ← all page markup and content
├── css/
│   └── style.css       ← design tokens, glass system, layout, responsive rules
├── js/
│   └── main.js         ← intro animation, nav, scroll reveals, parallax, countdown, CTA fx
├── images/
│   ├── logo-canopy.svg               ← placeholder — swap with the real logo
│   ├── logo-community-medicine.svg   ← placeholder — swap with the real seal
│   ├── logo-gmc-hospital.svg         ← placeholder — swap with the real emblem
│   └── README.md                     ← swap instructions for logos + photography
└── README.md            ← this file
```

## Before you publish — 3 things to check

1. **Google Form link.** Search the codebase for `PLACEHOLDER` — it appears
   twice in `index.html` (`#registerBtn` and the mobile sticky CTA). Replace
   `https://forms.gle/PLACEHOLDER` with your real form URL in both places.
2. **Logos.** See `images/README.md`. The three logo files are tasteful
   placeholders drawn in the brand palette so the site isn't broken — swap
   them for the real Canopy / Community Medicine / GMC & Hospital marks
   whenever they're ready.
3. **Event date, if it ever changes.** The countdown target is set once, in
   `js/main.js`, in this line:
   ```js
   var target = new Date("2026-07-10T09:00:00+05:30").getTime();
   ```
   `+05:30` is IST — adjust only if the venue's timezone changes.

## Hosting on GitHub Pages

1. Create a new GitHub repository (public repos get free Pages hosting).
2. Push everything in this folder to the repo root:
   ```bash
   git init
   git add .
   git commit -m "Canopy — Eco Club invite site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
3. In the repo on GitHub: **Settings → Pages → Build and deployment → Source:
   Deploy from a branch → Branch: `main` / `root`.** Save.
4. GitHub gives you a live URL within a minute or two, typically:
   `https://<your-username>.github.io/<your-repo>/`

No build step, no dependencies to install — the two CDN `<script>` tags for
GSAP at the bottom of `index.html` are the only external code the page loads.

## Notes on the build

- **Animation library:** GSAP + ScrollTrigger (CDN). If either fails to load
  (e.g. offline, or the CDN is blocked), `main.js` detects this and falls
  back to plain CSS transitions and `IntersectionObserver` — the page still
  works, just with slightly simpler motion.
- **Accessibility:** semantic headings, alt text on every image, visible
  focus states, and a full `prefers-reduced-motion` fallback that disables
  parallax/particles and swaps reveals for simple fades.
- **Glass panels** degrade gracefully via `@supports not (backdrop-filter)`
  to a solid, still-readable background for older browsers.
- **Photography** is hotlinked from verified Unsplash photo URLs (free under
  the Unsplash License) — see `images/README.md` if you'd rather self-host
  the image files instead of hotlinking.
