# O.L Services website

Static site built with [Eleventy](https://www.11ty.dev/). The site contains no placeholder text.

## Develop

```bash
npm install
npm start        # dev server at http://localhost:8765
npm run build    # outputs the static site to _site/
```

- **Phone number, service list and city list:** `src/_data/site.js`. Change them once there and they update everywhere.
- **Service pages:** `src/services/*.md` (Markdown with front matter)
- **Blog posts:** add a `.md` file to `src/blog/` with `title`, `description`, `date`, `readTime`, `image` and `alt`
- **FAQ:** `src/faq.njk` front matter (also generates FAQ structured data)
- **City blurbs:** `src/service-areas.njk` front matter

## Deploy

Netlify: build command `npm run build`, publish directory `_site` (already set in `netlify.toml`).

## Worth confirming with the client
- **Service area cities and blurbs.** Trim or add as needed.
- **Texting.** The quote form opens a pre-filled text to (916) 940-9693, so the number must be able to receive texts.
- **Business hours.** Not shown. Add them to the Contact page once the client provides them.
- **About page.** It describes the company's approach only. Add the real history, years in business and credentials once the client provides them. Don't invent these.
- **Reviews page.** It invites feedback and shows no testimonials. Add real, attributable reviews (with permission) when available.

## Nice to have
- Canonical URLs and `"url"` in the JSON-LD once the domain is known
- Favicon and Open Graph image
- Real job photos to replace the AI-generated images in `src/images/`
