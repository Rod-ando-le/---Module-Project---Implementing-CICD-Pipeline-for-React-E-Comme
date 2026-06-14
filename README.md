# 🛍️ Nimbus — React E‑Commerce (Firebase + CI/CD)

An advanced React e‑commerce app with **Firebase Authentication + Firestore**,
**unit & integration tests** (Jest + React Testing Library), and a full
**CI/CD pipeline** (GitHub Actions) that builds, tests, and deploys to **Vercel**.

## 🌐 Live demo

👉 **https://YOUR-PROJECT.vercel.app**  ← replace with your Vercel URL after deploying

---

## ✨ Features

- **Auth (Firebase):** register, login, logout; protected pages.
- **Users (Firestore CRUD):** profile create/read/update, delete account.
- **Products (Firestore CRUD):** create/read/update/delete from the Manage page.
- **Cart (Redux Toolkit):** add, change quantity, remove; persisted in sessionStorage.
- **Orders (Firestore):** checkout saves an order; order history + order details.

---

## 🧪 Testing (TDD)

Tests use **Jest** + **React Testing Library**.

| File                        | Type        | What it checks                                        |
| --------------------------- | ----------- | ----------------------------------------------------- |
| `cartSlice.test.js`         | Unit        | Cart reducer: add, increment, remove, clear, totals.  |
| `ProductCard.test.jsx`      | Unit        | Renders product info; clicking the button adds to cart.|
| `cartIntegration.test.jsx`  | Integration | Adding a product updates the cart count and total.    |

Run the tests:

```bash
npm test
```

All tests are focused, independent, and deterministic, and they avoid Firebase so
they run reliably in CI without credentials.

---

## 🔁 CI/CD pipeline (GitHub Actions → Vercel)

The workflow lives in `.github/workflows/main.yml` and has two stages:

1. **CI — `build-and-test`** (runs on every push/PR to `main`):
   installs dependencies, runs the Jest tests, and builds the app.
   If any test fails, the job fails and **deployment is blocked**.

2. **CD — `deploy`** (runs only after CI passes, on pushes to `main`):
   deploys the app to **Vercel** using the Vercel CLI.

### One‑time Vercel setup

1. Install the CLI and link the project locally (creates `.vercel/project.json`):

   ```bash
   npm install -g vercel
   vercel login
   vercel link
   ```

2. Get the IDs and a token:
   - `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` are inside `.vercel/project.json`.
   - Create a `VERCEL_TOKEN` at Vercel → **Settings → Tokens**.

3. In GitHub: **repo → Settings → Secrets and variables → Actions → New repository secret**,
   and add these three secrets:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`

After that, every push to `main` runs the tests and (if they pass) deploys to Vercel.

> `vercel.json` adds an SPA rewrite so client‑side routes like `/cart` and `/orders`
> work correctly when the page is refreshed.

---

## 🔥 Firebase setup

The app needs your own Firebase project. Paste your config into `firebase.js`, then in
the Firebase console enable **Authentication → Email/Password** and create a
**Firestore** database (test mode is fine for development).

Firestore data model:

    users/{uid}    -> { uid, email, name, address, createdAt }
    products/{id}  -> { title, price, category, description, image }
    orders/{id}    -> { userId, userEmail, items: [...], total, createdAt }

---

## 🚀 Run locally

Requires Node.js 18+.

```bash
npm install
npm run dev      # start the dev server
npm test         # run the tests
npm run build    # production build
```

Open the URL Vite prints (usually http://localhost:5173). First run is empty:
register, log in, open **Manage**, and add a few products.

---

## 🧱 Tech stack

React 18 · Vite · Redux Toolkit · React Query · React Router · Firebase
(Auth + Firestore) · Jest · React Testing Library · GitHub Actions · Vercel
