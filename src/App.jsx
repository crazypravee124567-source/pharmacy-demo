import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout.jsx";

import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Medicines from "./pages/Medicines.jsx";
import AddMedicine from "./pages/AddMedicine.jsx";
import Batches from "./pages/Batches.jsx";
import Inventory from "./pages/Inventory.jsx";
import StockIn from "./pages/StockIn.jsx";
import StockOut from "./pages/StockOut.jsx";
import StockLedger from "./pages/StockLedger.jsx";
import BillingPos from "./pages/BillingPos.jsx";
import SalesHistory from "./pages/SalesHistory.jsx";
import Orders from "./pages/Orders.jsx";
import Prescriptions from "./pages/Prescriptions.jsx";
import Purchases from "./pages/Purchases.jsx";
import Suppliers from "./pages/Suppliers.jsx";
import SupplierDetail from "./pages/SupplierDetail.jsx";
import Customers from "./pages/Customers.jsx";
import CustomerDetail from "./pages/CustomerDetail.jsx";
import Payments from "./pages/Payments.jsx";
import Reports from "./pages/Reports.jsx";
import Notifications from "./pages/Notifications.jsx";
import Settings from "./pages/Settings.jsx";
import OwnerProfile from "./pages/OwnerProfile.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/medicines" element={<Medicines />} />
        <Route path="/medicines/add" element={<AddMedicine />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/batches" element={<Batches />} />
        <Route path="/stock-in" element={<StockIn />} />
        <Route path="/stock-out" element={<StockOut />} />
        <Route path="/stock-ledger" element={<StockLedger />} />
        <Route path="/billing-pos" element={<BillingPos />} />
        <Route path="/sales-history" element={<SalesHistory />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/prescriptions" element={<Prescriptions />} />
        <Route path="/purchases" element={<Purchases />} />
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/suppliers/detail" element={<SupplierDetail />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/customers/detail" element={<CustomerDetail />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<OwnerProfile />} />
        <Route path="*" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
