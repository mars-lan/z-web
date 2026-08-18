# 18

Official website for **18**, deployed to Cloudflare Pages at [18-plus.app](https://18-plus.app).

## Setup

Requirements: Node.js with Corepack (Yarn 4.18+) and a Cloudflare account that already hosts the `18-plus.app` zone.

```sh
corepack enable
yarn
yarn wrangler login
```

## Local development

```sh
yarn dev
```

Serves `public/` through Wrangler Pages.

## Deploy

```sh
yarn deploy
```

Attaches production to the `18-plus-web` Pages project. Custom hostnames `18-plus.app` and `www.18-plus.app` are configured on that project in Cloudflare. Leave the zone’s Google MX and TXT records in place.
