# Known issues

Found while adding the book to Selected work, August 2026. None of these is
fixed here. Each one is real but separate from that change.

## Dead code

**`osmCaseStudy` is defined and never used.** `src/data/projects.js` opens with
about sixty lines of case-study data for `osm-link-inference`, but the
`projects` array has no entry with that slug, so nothing reads the constant.
Either add the project entry or drop the constant.

## Unreachable content

**The AEC case study cannot be reached from the site.** `aecCaseStudy` is
exported from `src/data/projects.js` and rendered by the `AecCaseStudy`
component in `src/pages/Project.jsx`, roughly 150 lines of markup. That
component only runs when a project has `caseStudy: true` and no `study`. Every
entry in the array has a `study`, so the branch is never taken and the flagship
pipeline write-up is not on the live site.

## Broken link

**`ComingSoon` points at a slug that does not exist.** `src/pages/Project.jsx`
sends the reader to `/projects/aec-pipeline`, and `getProject` returns nothing
for it, so the page renders "Project not found". The link is currently
unreachable for the same reason as the item above: no entry hits the
`ComingSoon` branch. It will surface the moment a project is added without a
`study`.

## Smaller things

- **`ProjectCard` can only link inside the site.** It always renders
  `<Link to={/projects/:slug}>`. There is no card variant for a project that
  lives entirely outside the site.
- **A `tech` block renders one link.** `src/components/CaseStudy.jsx` reads
  `block.link`, singular. More than one external link has to go in the entry's
  `links` array, which the page header renders instead.
- **Five of the six motifs are unused by projects.** Only `router` was in use
  before the book took `strata`. `plan`, `graph`, `contour` and `roads` are
  defined in `src/components/Motif.jsx` and referenced nowhere in the array.
- **The README has no Korean edition.** Every other document pair in the
  author's repositories ships `README.md` and `README.ko.md` together.
