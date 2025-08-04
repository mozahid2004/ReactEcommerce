// React Router imports
import { Routes, Route, Navigate } from "react-router-dom";

// Custom AuthContext hook
import { useAuth } from "./context/AuthContext";

// Shared layout components
import NavigationBar from "./components/Navigation";
import Footer from "./components/Footer";

// Public pages
import Home from "./pages/user/Home";
import Shop from "./pages/user/Shop";
import ProductDetails from "./pages/user/ProductDetails"; // ✅ Corrected import
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SearchPage from "./components/SearchPage";
import VerifyEmail from './pages/VerifyEmail'; 

// User features
import Cart from "./pages/user/Cart";
import Wishlist from "./pages/user/Wishlist";
import PatmentPage from "./pages/user/PatmentPage";
// import OrderConfirmation from "./pages/user/OrderConfirmation"; // Uncomment if needed
import ReviewOrder from './pages/user/ReviewOrder';
// import OrderSummary from './pages/user/OrderSummary';
import OrderSummary from "./pages/user/orderSummary";
import OrderConfirmation from './pages/user/OrderConfirmation';
import UserOrders from "./pages/user/UserOrders";

// Dashboards
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserDashboard from "./pages/user/UserDashbord";

// Admin-only features
import AddProduct from "./pages/admin/AddProduct";
import ProductList from "./pages/admin/ProductList";
import EditProduct from "./pages/admin/EditProduct";
import ManageUsers from "./pages/admin/ManageUsers";
import  Support  from "./pages/user/Support";

function App() {
  const { user } = useAuth(); // Get current user and role

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <NavigationBar />

      {/* App routes */}
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} /> {/* ✅ Updated here */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/payment" element={<PatmentPage />} />
        {/* <Route path="/order-confirmation" element={<OrderConfirmation />} /> */}
        <Route path="/verify-email" element={<VerifyEmail />} />


        {/* User-only routes */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/review-order" element={<ReviewOrder />} />
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/orders" element={<UserOrders />} />
        <Route path="/support" element={<Support />} />




        {/* Redirect based on role */}
        <Route
          path="/dashboard"
          element={
            user ? (
              user.role === "admin" ? (
                <Navigate to="/admin/dashboard" />
              ) : (
                <Navigate to="/user/dashboard" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Dashboards */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />

        {/* Admin-only routes */}
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/products" element={<ProductList />} />
        <Route path="/admin/edit-product/:id" element={<EditProduct />} />
        <Route path="/admin/users" element={<ManageUsers />} />

        {/* Shared feature */}
        <Route path="/search" element={<SearchPage />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
