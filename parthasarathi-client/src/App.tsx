import "./App.css";
import { Routes, Route } from "react-router-dom";
import Head from "./components/Head";
import { Toaster } from "sonner";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";
import ShippingPolicy from "./pages/ShippingPolicy";
import ReturnsPolicy from "./pages/ReturnsPolicy";
import Support from "./pages/Support";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import SupportLogin from "./pages/SupportLogin";
import SupportDashboard from "./pages/SupportDashboard";
import SupportTickets from "./pages/SupportTickets";
// @ts-ignore
import ScrollToHash from "./utils/ScrollToHash";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminAddProduct from "./pages/AdminAddProduct";
import AdminSupport from "./pages/AdminSupport";
import AdminLogin from "./pages/AdminLogin";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import SuperAdminLogin from "./pages/SuperAdminLogin";
import ProtectedRoute from "./services/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <Head title="Parthasarathi Musical - Home Page" />
      <ScrollToHash />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/shipping" element={<ShippingPolicy />} />
          <Route path="/returns" element={<ReturnsPolicy />} />
          <Route path="/support" element={<Support />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/support/login" element={<SupportLogin />} />
          <Route
            path="/support/dashboard"
            element={
              <ProtectedRoute
                allowedRoles={["SUPER_ADMIN", "ADMIN", "SUPPORT"]}
              >
                <SupportDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/support/tickets"
            element={
              <ProtectedRoute
                allowedRoles={["SUPER_ADMIN", "ADMIN", "SUPPORT"]}
              >
                <SupportTickets />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/super-admin/login" element={<SuperAdminLogin />} />

          {/* Super Admin Routes */}
          <Route
            path="/super-admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
                <SuperAdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["SUPER_ADMIN", "ADMIN"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute allowedRoles={["SUPER_ADMIN", "ADMIN"]}>
                <AdminProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products/add"
            element={
              <ProtectedRoute allowedRoles={["SUPER_ADMIN", "ADMIN"]}>
                <AdminAddProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/support"
            element={
              <ProtectedRoute allowedRoles={["SUPER_ADMIN", "ADMIN"]}>
                <AdminSupport />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Home />} />
        </Routes>
      </AuthProvider>
      <Toaster position="top-center" richColors />
    </>
  );
}

export default App;
