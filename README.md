# ichbinlucaskim.github.io

Personal portfolio for Lucas Kim — spatial ML engineer. Built with Vite + React +
Tailwind CSS, routed with React Router (HashRouter), deployed to GitHub Pages.

Clean, Apple-inspired design: light canvas, near-black ink, generous whitespace, one
blue accent, a single sans family (San Francisco on Apple devices, Inter as
fallback). The signature element is a **geometric line-art motif system** — each
project gets a domain-true wireframe (floor plan, node-edge graph, contour field,
strata) instead of a fake screenshot.

## Run locally

```bash
npm install
npm run dev      # dev server at http://localhost:5173
npm run build    # production build → dist/
npm run preview  # serve the production build locally
```

## Routes (HashRouter — works on GitHub Pages with no server config)

- `/#/` — Home: hero, **Selected work** project grid, About, Contact (anchored
  sections; the nav scrolls to them).
- `/#/projects/aec-pipeline` — full case study with a sticky "On this page" TOC.
- `/#/projects/:slug` — other projects render a minimal "case study coming" stub.

## Structure

```
index.html               # entry, fonts (Inter fallback), meta
src/
  main.jsx              # HashRouter + routes + Layout (Nav / Outlet / Footer)
  index.css            # Tailwind v4 + design tokens (@theme) + motion
  data/
    profile.js         # ← name, email, links, credentials
    projects.js        # ← project cards + the AEC case-study content
  components/
    Nav.jsx            # sticky nav, scroll-aware, section scrolling
    Footer.jsx
    ProjectCard.jsx    # whole-card link + motif thumbnail
    Motif.jsx          # the geometric motif system (plan/graph/contour/strata)
    HeroGraph.jsx      # hero node-graph with the one load animation
    SectionNav.jsx     # sticky case-study TOC (active-section highlight)
    Tag.jsx
  pages/
    Home.jsx
    Project.jsx        # case study + coming-soon + not-found
.github/workflows/deploy.yml   # Pages-from-Actions deploy
```

## Design tokens (quick reference)

- **Color:** `canvas` #FFFFFF · `surface` #F5F5F7 · `ink` #1D1D1F · `muted` #6E6E73 ·
  `faint` #86868B · `line` #D2D2D7 · `accent` #1564FF. Defined in `src/index.css`
  under `@theme`.
- **Type:** one SF/Inter sans family; hierarchy by size + weight; mono only for
  metrics. Body 17px (Apple's body size).
- **Motion:** hero node-graph draws its edges once on load; card hover lifts.
  Respects `prefers-reduced-motion`.

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds with Vite and
publishes `dist/` via the official Pages-from-Actions flow.

**One-time setup:** repo **Settings → Pages → Source → GitHub Actions**. User site, so
it serves at the domain root (`base: '/'` in `vite.config.js`). HashRouter means deep
links like `/#/projects/aec-pipeline` work without a 404 fallback.

## Placeholders waiting on assets

- **Project cards** — `gnn-spatial`, `geospatial`, `subsurface` are honest
  "case study coming" stubs in `src/data/projects.js`; the AEC pipeline is fully
  written.
- **AEC case study → Visuals** — three labelled placeholders (floor-plan→IFC clip,
  pipeline-stages diagram, future 3D assembly sequence). The 3D is **not** built —
  it's planned as a react-three-fiber scene.
- **Contact** — confirm `profile.linkedin` in `src/data/profile.js` before sharing.
  Email + GitHub are real.
