# BuilderClan AISAT

This is the static Astro site for the BuilderClan AISAT community. It recreates the reference site while keeping its content, shared visual values, and interactive behaviour easier to maintain.

## Run it locally

- Install the packages once with `npm install`.
- Start the local site with `npm run dev`.
- Check a production build with `npm run build`.
- Preview that build with `npm run preview`.

## Make changes

- Change shared colours, text sizes, and spacing in `src/styles/values.css`.
- Add or edit a Hall of Fame member in `src/data/members.ts`.
- Add or edit a question in `src/data/faqs.ts`.
- Keep the rules in `AGENTS.md`, including its checklist, whenever changing the site.

## Publish it

Push the `main` branch to GitHub. The workflow in `.github/workflows/deploy.yml` builds the site and publishes it to GitHub Pages at https://ryoshi123.github.io/builderclan/.
