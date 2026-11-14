# NearFix

NearFix is a React, TypeScript, and Vite application. This file documents the existing source layout and the conventions to follow when adding or changing features. Read it before moving files or introducing a new component pattern.

## Source structure

```text
src/
├── pages/                         # Route-level pages, grouped by area
│   ├── Admin/                     # Admin routes and page-level admin code
│   │   └── AdminSkeleton/         # Admin loading skeletons
│   ├── Auth/                      # Authentication routes
│   │   └── AuthSkeleton/          # Authentication loading skeletons
│   ├── Common/                    # Pages shared by roles
│   │   └── Skeleton/              # Common page loading skeletons
│   ├── Customer/                  # Customer routes
│   │   └── CustomerSkeleton/      # Customer loading skeletons
│   └── Provider/                  # Provider routes
│       └── ProviderSkeleton/      # Provider loading skeletons
│
├── components/
│   ├── Auth/                      # Reusable authentication UI
│   ├── common/                    # UI shared across different areas/roles
│   ├── Pages/                     # Page feature components, grouped by area
│   │   ├── ADMIN/
│   │   │   ├── Dashboard/
│   │   │   └── Shared/            # Reused by multiple admin pages
│   │   ├── COMMONPAGES/
│   │   │   ├── <Feature>/         # Common page feature components
│   │   │   └── Shared/            # Reused by multiple common pages
│   │   ├── CUSTOMER/
│   │   │   ├── <Feature>/         # Customer page feature components
│   │   │   └── Shared/            # Reused by multiple customer pages
│   │   └── PROVIDER/
│   │       ├── <Feature>/         # Provider page feature components
│   │       └── Shared/            # Reused by multiple provider pages
│   └── ui/                        # Low-level UI primitives
│
├── context/                       # Shared React state and data contexts
├── data/                           # Role-specific API and TanStack Query layers
│   ├── ADMIN/                     # Admin keys, types, services, queries, mutations
│   ├── CUSTOMER/                  # Customer keys, services, queries, mutations
│   └── PROVIDER/                  # Provider keys, services, queries, mutations
├── hooks/                         # Reusable React hooks
├── lib/                           # Shared infrastructure and utilities
│   ├── userKeys.ts                # Shared current-user query keys
│   ├── userQueries.ts             # Shared current-user query hooks
│   └── userServices.ts            # Shared user/auth service functions
├── graphql/                       # Generated GraphQL operations/types
├── assets/                        # Imported static assets
└── testing/                       # Testing and feature-flag helpers
```

`<Feature>` means the page or feature name, for example `Booking`, `Favourite`, `ServiceProvider`, `Earnings`, or `ServiceManager`. Keep the established directory casing (`Admin`, `Customer`, `Provider` under `pages`; uppercase role names under `components/Pages`).

## Where code belongs

### Route-level pages

Put each screen that is registered in `src/Router.tsx` in its matching `src/pages/<Area>/` folder. Route-level page files own the page composition and connect UI to data, loading/error state, and actions. For example:

- `src/pages/Provider/ProviderDashboard.tsx` is the provider dashboard route.
- Its feature sections belong in `src/components/Pages/PROVIDER/Dashboard/`.
- `src/pages/Admin/ProviderManagement.tsx` is an admin route; its role-specific visual pieces belong under `src/components/Pages/ADMIN/`.

When adding a route, follow the existing route grouping and protection rules in `src/Router.tsx`. Do not put a route component in a feature-components folder just because that folder has a similar name.

### Page and feature components

Put a component used only by one page/feature in that page's feature folder:

```text
src/components/Pages/CUSTOMER/Booking/
├── BookingHeader.tsx
├── BookingCards.tsx
└── BookingListing.tsx
```

Keep feature-specific labels, layout, cards, lists, modals, and actions close to their feature. The route-level page should compose these pieces and pass the data or callbacks they need through props.

### Shared components and reuse

Before writing a component, search for an existing component that already serves the same purpose. Reuse it if it fits; extend it with clear props when that keeps the API understandable.

Use these locations according to the reuse boundary:

- **One page/feature only:** `src/components/Pages/<AREA>/<Feature>/`.
- **Several pages in one role:** `src/components/Pages/<ROLE>/Shared/`.
- **Several common pages:** `src/components/Pages/COMMONPAGES/Shared/`.
- **Unrelated roles or app-wide UI:** `src/components/common/`.
- **Authentication UI:** `src/components/Auth/`.
- **Small, generic primitives:** `src/components/ui/`.

Examples already following this convention:

- Admin page header, panel, table, status badge, and refresh controls live in `src/components/Pages/ADMIN/Shared/`.
- Customer page header is in `src/components/Pages/CUSTOMER/Shared/`.
- Provider page header and refresh button are in `src/components/Pages/PROVIDER/Shared/`.
- Common page header is in `src/components/Pages/COMMONPAGES/Shared/`.

If a component is reused by only two or more pages in the same role, extract the repeated UI into that role's `Shared` folder and keep page-specific content as props or children. Do not move a component to a broader folder unless its actual consumers cross that boundary. Avoid abstracting one-off UI just to make it look reusable.

Prefer named props with explicit TypeScript types. Pass data and event handlers in from the page/context rather than making a presentational shared component fetch unrelated application data. Keep each shared component's API focused on the UI it owns.

Use direct imports from the component file (the current convention). Do not add an `index.ts` barrel just to re-export files; only add one if the project develops a clear, consistent need for it.

### Skeletons and loading states

Put page-area skeletons in the matching page skeleton directory:

- Admin: `src/pages/Admin/AdminSkeleton/`
- Auth: `src/pages/Auth/AuthSkeleton/`
- Common: `src/pages/Common/Skeleton/`
- Customer: `src/pages/Customer/CustomerSkeleton/`
- Provider: `src/pages/Provider/ProviderSkeleton/`

Name a skeleton for the page it represents, such as `ProviderProfilePageSkeleton`. Use the skeleton while that page's real data is loading, and make its shape resemble the content it replaces. Put a small skeleton primitive in `src/components/common/` only when multiple areas genuinely reuse it. Keep page-specific loading behavior with its route/page; do not show a skeleton after loading has completed.

### API access with TanStack Query

Keep API calls out of route pages, feature components, contexts, and UI hooks. Those layers should call query or mutation hooks and render their state. Put each role's data code in its matching `src/data/<ROLE>/` directory:

```text
src/data/ADMIN/     AdminKeys.ts, AdminTypes.ts, AdminServices.ts, AdminQueries.ts, AdminMutation.ts
src/data/CUSTOMER/  CustomerKey.ts, CustomerServices.ts, CustomerQueries.ts, CustomerMutation.ts
src/data/PROVIDER/  ProviderKeys.ts, ProviderServices.ts, ProviderQueries.ts, ProviderMutation.ts
```

Follow this flow for new API-backed features:

1. **Keys:** Add a stable, role-namespaced query key to that role's `*Key(s).ts`. Include relevant IDs and filters in the key so distinct resources do not share cache entries.
2. **Services:** Put Amplify model, GraphQL, storage, and other network calls in `*Services.ts`. Services accept plain arguments, return typed data, and convert API errors into useful thrown errors. They should not import React or TanStack Query.
3. **Queries:** Export `useQuery` hooks from `*Queries.ts`, using the service function and key. Pages/components consume the hook's `data`, `isPending`/`isLoading`, and `error` states.
4. **Mutations:** Export `useMutation` hooks from `*Mutation.ts`. Keep writes in service functions and invalidate or update the relevant query keys in mutation callbacks so every consumer sees fresh data.
5. **UI:** Call the hooks from the page or feature component. Do not call `client.models.*`, `.graphql()`, `getUrl`, `uploadData`, or similar SDK methods there. Contexts may compose query hooks to preserve an existing context API, but should not make their own network calls.

Use the root `src/lib/userServices.ts`, `userQueries.ts`, and `userKeys.ts` for data/authentication shared across roles, such as the current user's profile. Keep role-specific operations inside their role folder rather than adding them to a generic service.

For live data, put the Amplify `observeQuery()` subscription and its cleanup lifecycle behind the service/query layer. The service owns the subscription and maps incoming records to the data the UI needs; a hook in `*Queries.ts` subscribes/unsubscribes and exposes live state. Do not replace a live feed with polling, and suppress the initial synced snapshot when the UI should only announce new records.

When changing an existing feature, search pages, components, hooks, and contexts for direct SDK calls and migrate them to this flow. Keep the existing UI/context interface where possible, and add or update this README guidance when the convention changes.

## Data, state, and utilities

- `src/context/` owns state/data that is shared across a route area or the app, such as current user, admin data, and provider data. Follow the existing context's auth, refresh, and error-handling patterns.
- `src/hooks/` owns reusable React hooks. A hook used only by one feature can stay with that feature unless existing project patterns indicate otherwise.
- `src/data/` owns role-specific API services, query keys/hooks, and mutations. `src/lib/` owns shared infrastructure and generic helpers such as the Amplify client, query client, error handling, and utilities.
- Use Amplify model APIs and generated `Schema` types consistent with nearby code. Treat `src/graphql/` and other generated files as generated output; do not hand-edit them.
- Keep loading, empty, and error states explicit. For live data, follow the existing `observeQuery()` subscription and cleanup patterns rather than introducing polling.

## Preserve existing patterns

When working in this repository:

1. Read this guide and inspect neighboring files before editing.
2. Follow the file locations, naming, imports, styling tokens, and data patterns already used by that area.
3. Make the smallest change that completes the requested feature. Do not rename directories, reorganize unrelated files, replace established patterns, or modify other role areas unless the request requires it.
4. Keep a component in its current location if it is feature-specific. Extract it only when there is real repeated use or the user explicitly asks for shared UI.
5. Update imports and the relevant route when adding or moving a page/component. Update this guide when the project structure or conventions intentionally change.
6. Do not add mock data to production UI unless it is explicitly requested for testing; keep temporary test data isolated and easy to remove.

## Development

Install dependencies and start the Vite development server:

```bash
npm install
npm run dev
```

Available project scripts include:

```bash
npm run build   # Type-check and build the production app
npm run lint    # Run ESLint
npm run preview # Preview the production build locally
```
