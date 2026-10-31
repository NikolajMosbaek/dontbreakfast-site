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

## Stylesheet and script versions

Every page loads `/assets/styles.css` and `/assets/site.js` with a `?v=` date.
When either file changes, change that date in all eight pages in the same
commit. GitHub Pages lets browsers cache assets for ten minutes, and without a
new address a browser can render new markup with the old stylesheet.

The app icon in the pages and `dist/assets/mark.svg` is the app's own
`design/icon/01-weekly-rhythm.svg` from the SimpleFastingTimer repository.

## Deployment

Push to `main`. GitHub Actions uploads `dist/` and deploys it to GitHub Pages.
The workflow can also be run manually from the Actions tab.

Keep this website repository public while using the current GitHub plan.
Changing it to private disables GitHub Pages; making it public again requires
restoring Pages settings and deploying the site again.

The `dbf.nsscode.com` DNS record must be a CNAME pointing to
`nikolajmosbaek.github.io`. DNS is managed through Simply.com. After a DNS
change, wait for GitHub to provision the certificate before enabling enforced
HTTPS in the repository’s Pages settings.
