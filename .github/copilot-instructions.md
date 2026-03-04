<!-- Repo-specific Copilot instructions: concise, actionable, and code-aware -->

# Quick agent guide for this codebase

Purpose

- Help contributors and AI agents understand the app structure, common patterns, and project quirks.

Big picture

- Minimal Express + Mongoose API. Entry: [src/index.js](src/index.js). Mongo connect in [config/db.js](config/db.js).
- HTTP surface: auth routes under `/auth` and product routes under `/product` (see [src/routes/user.js](src/routes/user.js) and [src/routes/product.js](src/routes/product.js)).
- Controllers live in `src/controller/*` and talk to Mongoose models in `src/models/*`.

Run / debug

- Start dev server: `npm run dev` (runs `nodemon src/index.js`). See `scripts` in [package.json](package.json).
- Env vars: `PORT`, `MONGODB_URL`, `JWT_SECRET`, `EXPIREIN` (app reads `.env`).

Conventions and coding patterns

- Module system: CommonJS (`require`, `module.exports`). Preserve when editing files.
- Controllers return JSON with `{ status: <boolean|string>, message: <string>, ... }`. Follow the same response shape for consistency.
- Validation: models declare Mongoose validation messages; prefer reusing those errors rather than replacing with custom messages.

Notable quirks & safety notes

- Typo in `User` model: the boolean field is named `isAmin` in [src/models/user.js](src/models/user.js) but controller code refers to `isAdmin`. Do not rename the DB field without an explicit migration plan—document and confirm with maintainers.
- Response `status` values are inconsistent (sometimes string "true", sometimes boolean true). Keep the existing pattern when adding code, and prefer minimal, well-scoped fixes.
- `src/middleware/role.js` is currently a stub. Do not assume role enforcement exists; implement middleware only with tests and a clear spec.

How to add or change an API endpoint (example)

- Add route: update [src/routes/product.js](src/routes/product.js) (or `user.js`) and export the router.
- Add controller: implement handler in [src/controller/\*](src/controller) and keep try/catch returning consistent JSON.
- Update model only if needed: [src/models/\*](src/models). If renaming fields, plan a DB migration.

Integration points

- JWT auth: token created in [src/controller/user.js](src/controller/user.js) using `JWT_SECRET` and `EXPIREIN`.
- DB connection: [config/db.js](config/db.js) uses `process.env.MONGODB_URL`.

What agents should not do automatically

- Do not convert the codebase to ESM or change module style without consent.
- Do not silently rename DB fields (e.g., `isAmin` → `isAdmin`) or migrate data.
- Avoid broad stylistic rewrites; keep code style consistent (indentation, CommonJS usage).

If something is missing or unclear

- Ask for confirmation before changing database fields, auth behavior, or middleware semantics.
- If adding authorization, include unit/integration tests and a short migration or feature note.

Feedback

- If any part of this guide is unclear or you want a more prescriptive policy (tests, lint, PR format), tell me what to add.
