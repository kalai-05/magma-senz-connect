import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { CcrMatches } from "./pages/CcrMatches";
import { FarmerProducts } from "./pages/FarmerProducts";
import { BuyerDemands } from "./pages/BuyerDemands";
import { AdminUsers } from "./pages/AdminUsers";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Layout } from "./components/Layout";

export const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/ccr/matches"
            element={
              <ProtectedRoute allowedRoles={["ccr", "admin"]}>
                <Layout>
                  <CcrMatches />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/farmer/products"
            element={
              <ProtectedRoute allowedRoles={["farmer"]}>
                <Layout>
                  <FarmerProducts />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/buyer/demands"
            element={
              <ProtectedRoute allowedRoles={["buyer"]}>
                <Layout>
                  <BuyerDemands />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Layout>
                  <AdminUsers />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
