# MedCare RxOS (Vite + React + Tailwind)

Clinical dispensary / pharmacy management UI, converted from two single-file CDN/Babel HTML prototypes.

## Run
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Structure
```
src/
  main.jsx                 BrowserRouter + ToastProvider
  App.jsx                  all routes (login outside layout, rest inside AppLayout)
  components/AppLayout.jsx sidebar + header + <Outlet/>
  context/ToastContext.jsx useToast() -> showToast(message, icon)
  pages/                   one file per screen (23)
tailwind.config.js         design tokens (colors, spacing, fonts, font sizes)
```

## Routes
/ (login) · /dashboard · /medicines · /medicines/add · /inventory · /batches · /stock-in · /stock-out · /stock-ledger ·
/billing-pos · /sales-history · /orders · /prescriptions · /purchases · /suppliers · /suppliers/detail ·
/customers · /customers/detail · /payments · /reports · /notifications · /settings · /profile
