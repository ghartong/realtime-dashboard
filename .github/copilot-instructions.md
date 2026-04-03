# Copilot Instructions for realtime-dashboard

- Project type: React + TypeScript + Vite, with Tailwind/shadcn UI primitives and Zustand store.
- Main workflow commands:
  - `npm run dev` (local HMR development)
  - `npm run build` (TypeScript build + Vite production bundle)
  - `npm run preview` (local production preview)
  - `npm run lint` (eslint check)

- Path alias: `@/*` maps to `src/*` (see `tsconfig.json`). Use this alias especially for `components/ui` imports.

- Big picture:
  - `src/App.tsx` is root component; wraps everything with `SidebarProvider`, renders `AppSidebar` and `LineChartComponent`.
  - `src/components/app-sidebar.tsx` glues sidebar + `MetricSelector`; callback flows metric changes up via `onMetricChange` prop.
  - `src/hooks/useRealtimeSimulation.ts` updates data every 5s through `useDataStore`.
  - `src/store/useDataStore.ts` is the single global data source for time series points (Zustand, keeps last 20 points).
  - `src/lib/mockData.ts` defines `DataPoint` and `generateMockData(metric, count)`.

- Critical patterns:
  - `useDataStore((s) => s.addDataPoint)` in hooks and components.
  - immutably keep latest 20 entries: `set((state) => ({ data: [...state.data.slice(-19), point] }))`.
  - custom UI toggle + responsive navigation lives in `src/components/ui/sidebar.tsx`.

- Data flow clarifications (avoid wrong assumptions):
  - `LineChartComponent` expects metric-specific DataPoint shape (currently typed `({ metric }: { metric: DataPoint })` but `App` passes `'metric'` string. fix to pass `'cpu'|'memory'|'requests'` and/or use `useDataStore` data instead of `generateMockData` if aiming real-time.

- Integration points:
  - `recharts` chart library in `src/components/LineChart.tsx`.
  - `zustand` state in `src/store/useDataStore.ts`.
  - shadcn component wrappers in `src/components/ui` (`button.tsx`, `sidebar.tsx`, `toggle.tsx`, etc.).

- Style & lint expectations:
  - TypeScript strictness by Vite default; maintain explicit prop types (avoid `any`).
  - Keep React function components as FCs and avoid untyped callback wrappers.

- What to avoid:
  - Do not introduce new test framework assumptions (no `npm test` script currently).
  - Do not change the `src/components/ui/sidebar.tsx` behavior unless required for downstream side-effect logic (it contains keyboard shortcuts and cookie-based open state).

- Example change scope:
  - Adding new metric: update `DataPoint.metric` union in `src/lib/mockData.ts`, update `MetricSelector` options, update `LineChartComponent` labeling.
  - Fix type mismatch: in `App.tsx` send `metric` state value to `LineChartComponent`, and/or change `LineChartComponent` props from `DataPoint` to `DataPoint['metric']`.

> Feedback request: please review if any screens, important integration edges, or local debug commands are missing. I’ll iterate immediately.