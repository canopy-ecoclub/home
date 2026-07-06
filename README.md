# images/ — what's here and what to swap

## Logos (placeholders — replace these three files)

| File | What it should be |
|---|---|
| `logo-canopy.svg` | The real Canopy logo (tree above a building, "Canopy · Together We Thrive · Est. 2026") |
| `logo-community-medicine.svg` | The Department of Community Medicine circular seal |
| `logo-gmc-hospital.svg` | The Government Medical College & Hospital emblem |

Right now these are hand-drawn stand-ins in the brand palette so the site
looks complete and on-brand out of the box. To use your real logo pack:

1. Drop your real files into this folder.
2. Keep the same filenames (easiest — nothing else to change), **or**
3. Use different filenames/extensions (e.g. `.png`) and update the matching
   `<img src="images/...">` tags in `index.html` (there are 5 references total:
   nav bar, department section, footer brand, footer logo row ×1 more, and the
   department seal).

Any reasonably square image works — the CSS already handles sizing,
drop-shadows and hover effects around whatever you place in these slots.

## Photography

The scroll-story photography (hero canopy light, the sapling-in-hand shot,
the campus-with-trees texture, and the aerial forest footer texture) is
**hotlinked directly from Unsplash** in `index.html` and `css/style.css` —
all real, verified photos, free to use under the [Unsplash License](https://unsplash.com/license)
(no attribution legally required, though it's credited in code comments
next to each URL as good practice).

That means the site works immediately with zero image files to manage.
If you'd rather self-host (recommended for a production/GitHub Pages site,
since hotlinked images depend on Unsplash's CDN staying up):

1. Download each photo from the URLs noted in the code comments.
2. Save them into this `images/` folder using these names:
   - `hero-canopy.jpg` (hero background layer)
   - `about-planting.jpg` (About section photo)
   - `department-campus.jpg` (subtle texture behind the department section)
   - `footer-texture.jpg` (footer background texture)
3. Search `images.unsplash.com` in `index.html` and `css/style.css` and swap
   each `url('https://images.unsplash.com/...')` for `url('images/<filename>.jpg')`.

## Adding more photography

If you want to add more real photos (e.g. actual photos from a past drive),
just drop them in here and reference them the same way — `images/your-file.jpg`.
