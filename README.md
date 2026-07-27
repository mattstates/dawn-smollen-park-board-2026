# Dawn Smollen for Park Board 2026 Division #2 - Campaign Brochure Site

This is a responsive static brochure website for **Dawn Smollen for Park Board 2026 Division #2** (Rancho Simi Recreation and Park District), designed for static hosting on **Cloudflare Pages**.

## 📁 Project Structure

```text
dawn-smollen-site/
├── index.html                   # Main semantic HTML structure & tabbed layout
├── styles.css                   # Custom Maroon & Green design system CSS
├── main.js                      # Tab controller, theme toggle & hash navigation
├── assets/
│   └── images/                  # Photo assets folder
│       ├── dawn-about-1.jpg     # About Dawn photo 1 (Hero & Bio)
│       ├── dawn-about-2.jpg     # About Dawn photo 2 (Community)
│       ├── priority-1.jpg       # Priority 1 photo (Safety & Maintenance)
│       ├── priority-2.jpg       # Priority 2 photo (Youth & Senior Programs)
│       ├── priority-3.jpg       # Priority 3 photo (Fiscal Integrity)
│       └── division-map-screenshot.jpg # Rancho Simi ArcGIS Map screenshot
├── _headers                     # Security & caching headers for Cloudflare Pages
├── wrangler.toml                # Cloudflare Pages deployment config
└── README.md                    # This documentation file
```

---

## 📷 How to Add / Replace Client Photos

Simply replace or copy your client's campaign photos into `assets/images/` with the following filenames:

1. **`assets/images/dawn-about-1.jpg`** - Main campaign portrait / About Dawn photo 1
2. **`assets/images/dawn-about-2.jpg`** - Community gathering / About Dawn photo 2
3. **`assets/images/priority-1.jpg`** - Priority 1 (Park Safety & Trail upkeep)
4. **`assets/images/priority-2.jpg`** - Priority 2 (Youth Sports & Senior Recreation)
5. **`assets/images/priority-3.jpg`** - Priority 3 (Fiscal Integrity & Open Space)
6. **`assets/images/division-map-screenshot.jpg`** - District Division Map screenshot

---

## ✏️ How to Fill In Custom Information in `index.html`

- **To Donate**: Search for `( will be filled in )` in `index.html` and replace the button disabled state with your actual donation portal URL (e.g. Anedot, ActBlue, or PayPal).
- **Yard Sign Google Form**: Search for `https://forms.google.com` in `index.html` and paste your actual Google Form URL.
- **In the News**: Update the 5 news card links (`<a href="#"...`) with the actual article URLs and titles.

---

## 🚀 How to Host on Cloudflare Pages

### Option A: Direct Drag-and-Drop (Easiest)
1. Log into your [Cloudflare Dashboard](https://dash.cloudflare.com).
2. Navigate to **Workers & Pages** -> **Create Application** -> **Pages** -> **Upload assets**.
3. Drag and drop the `dawn-smollen-site` folder into Cloudflare.
4. Click **Deploy site**.

### Option B: Git / GitHub Integration
1. Push this folder to a GitHub repository.
2. In Cloudflare Pages, select **Connect to Git** and choose the repository.
3. Set the build output directory to `/` or `.`.
4. Click **Save and Deploy**.
