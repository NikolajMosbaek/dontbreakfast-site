# Don’t Break Fast website

Static marketing, support, privacy and terms pages for
[Don’t Break Fast](https://dbf.nsscode.com/).

The site is deployed to GitHub Pages from `dist/` by
`.github/workflows/pages.yml`. The custom domain is declared in `dist/CNAME`.

## Local preview

```sh
python3 -m http.server --directory dist 8080
```

Then open <http://localhost:8080/>.

## Deployment

Push to `main`. GitHub Actions uploads `dist/` and deploys it to GitHub Pages.
The workflow can also be run manually from the Actions tab.
