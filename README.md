# Currency input mask demo

A small React + TypeScript demo comparing two currency input approaches in a real form built with React Hook Form.

## Live demo

The project is deployed to GitHub Pages:

https://arkarlov.github.io/sandbox/

## What this demo shows

- `react-number-format` with locale-aware currency formatting
- a lightweight ATM-style custom input for digits-only behavior
- switching between currencies and locales in real time
- form state preview for both approaches

## Tech stack

- React
- TypeScript
- Vite
- React Hook Form
- `react-number-format`

## Local development

```bash
npm install
npm run dev
```

Then open the local Vite URL in your browser.

## Production build

```bash
npm run build
```

## GitHub Pages deployment

This project includes a deployment workflow in `.github/workflows/deploy.yml` for GitHub Actions.

1. Push the repository to GitHub.
2. In the repo settings, enable GitHub Pages with the source set to GitHub Actions.
3. The `base` value in `vite.config.ts` is set to `/sandbox/` to match this repository's Pages URL.
4. The demo will be available at the Pages URL for the repository.
