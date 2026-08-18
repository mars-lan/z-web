# 18

Official website for **18**, deployed to Cloudflare Pages.

- Production: [https://18-plus-web.pages.dev](https://18-plus-web.pages.dev)
- Custom hostnames (pending DNS): [https://18-plus.app](https://18-plus.app) and `www.18-plus.app`

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

Publishes to the `18-plus-web` Pages project. After the first deploy, add proxied CNAME records in the `18-plus.app` zone (leave Google MX and TXT records in place):

| Name | Type | Content | Proxy |
| --- | --- | --- | --- |
| `@` | CNAME | `18-plus-web.pages.dev` | Proxied |
| `www` | CNAME | `18-plus-web.pages.dev` | Proxied |
