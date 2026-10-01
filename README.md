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

The `dbf.nsscode.com` DNS record must be a CNAME pointing to
`nikolajmosbaek.github.io`. DNS is managed through Simply.com. After a DNS
change, wait for GitHub to provision the certificate before enabling enforced
HTTPS in the repository’s Pages settings.
