## WIP....More to come

# Realtime Dashboard 🚀

A sleek, real-time data visualization dashboard built with modern React and TypeScript. Watch your metrics come alive with live updates, beautiful charts, and a responsive sidebar interface.

![Dashboard Preview](https://via.placeholder.com/800x400?text=Realtime+Dashboard+Preview) *(Add your own screenshot here)*

## ✨ Features

- **Real-time Data Simulation**: Automatic updates every 5 seconds with simulated CPU, memory, and request metrics
- **Interactive Charts**: Powered by Recharts for smooth, responsive line charts
- **Responsive Design**: Collapsible sidebar with shadcn UI components and Tailwind CSS
- **State Management**: Efficient global state with Zustand, keeping the last 20 data points
- **TypeScript**: Fully typed for reliability and developer experience
- **Fast Development**: Vite-powered HMR for instant feedback

## 🛠 Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Charts**: Recharts
- **State**: Zustand
- **Build**: Vite (ESM, fast bundling)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/ghartong/realtime-dashboard.git
   cd realtime-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser** to `http://localhost:5173` and watch the magic happen!

### Build for Production

```bash
npm run build
npm run preview  # Test the production build locally
```

### Linting

```bash
npm run lint
```

## 📁 Project Structure

```
src/
├── components/
│   ├── AppSidebar.tsx       # Sidebar with metric selector
│   ├── LineChart.tsx        # Recharts visualization
│   └── ui/                  # shadcn UI primitives
├── hooks/
│   └── useRealtimeSimulation.ts  # Real-time data updates
├── lib/
│   └── mockData.ts          # Data types and mock data generator
├── store/
│   └── useDataStore.ts      # Zustand global state
└── App.tsx                  # Root component
```

## 🤝 Contributing

We love contributions! Here's how to get involved:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Tips

- Use `@/*` path aliases for imports (maps to `src/*`)
- Follow TypeScript strictness and explicit prop types
- Test your changes with `npm run dev` and `npm run lint`

## 📋 Copilot Instructions

These guidelines help maintain consistency and follow project patterns when using GitHub Copilot or contributing to the codebase.

### Project Type
- React + TypeScript + Vite, with Tailwind/shadcn UI primitives and Zustand store.

### Main Workflow Commands
- `npm run dev` (local HMR development)
- `npm run build` (TypeScript build + Vite production bundle)
- `npm run preview` (local production preview)
- `npm run lint` (eslint check)

### Path Alias
- `@/*` maps to `src/*` (see `tsconfig.json`). Use this alias especially for `components/ui` imports.

### Big Picture
- `src/App.tsx` is root component; wraps everything with `SidebarProvider`, renders `AppSidebar` and `LineChartComponent`.
- `src/components/app-sidebar.tsx` glues sidebar + `MetricSelector`; callback flows metric changes up via `onMetricChange` prop.
- `src/hooks/useRealtimeSimulation.ts` updates data every 5s through `useDataStore`.
- `src/store/useDataStore.ts` is the single global data source for time series points (Zustand, keeps last 20 points).
- `src/lib/mockData.ts` defines `DataPoint` and `generateMockData(metric, count)`.

### Critical Patterns
- `useDataStore((s) => s.addDataPoint)` in hooks and components.
- Immutably keep latest 20 entries: `set((state) => ({ data: [...state.data.slice(-19), point] }))`.
- Custom UI toggle + responsive navigation lives in `src/components/ui/sidebar.tsx`.

### Data Flow Clarifications
- `LineChartComponent` expects metric-specific DataPoint shape (currently typed `({ metric }: { metric: DataPoint })` but `App` passes `'metric'` string. Fix to pass `'cpu'|'memory'|'requests'` and/or use `useDataStore` data instead of `generateMockData` if aiming real-time.

### Integration Points
- `recharts` chart library in `src/components/LineChart.tsx`.
- `zustand` state in `src/store/useDataStore.ts`.
- shadcn component wrappers in `src/components/ui` (`button.tsx`, `sidebar.tsx`, `toggle.tsx`, etc.).

### Style & Lint Expectations
- TypeScript strictness by Vite default; maintain explicit prop types (avoid `any`).
- Keep React function components as FCs and avoid untyped callback wrappers.

### What to Avoid
- Do not introduce new test framework assumptions (no `npm test` script currently).
- Do not change the `src/components/ui/sidebar.tsx` behavior unless required for downstream side-effect logic (it contains keyboard shortcuts and cookie-based open state).

### Example Change Scope
- Adding new metric: update `DataPoint.metric` union in `src/lib/mockData.ts`, update `MetricSelector` options, update `LineChartComponent` labeling.
- Fix type mismatch: in `App.tsx` send `metric` state value to `LineChartComponent`, and/or change `LineChartComponent` props from `DataPoint` to `DataPoint['metric']`.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ using React, TypeScript, and a dash of real-time magic. Star this repo if you find it useful! 🌟