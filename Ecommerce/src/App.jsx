// React Router imports
import { Routes, Route, Navigate } from "react-router-dom";
// Custom AuthContext hook to access logged-in user info
import { useAuth } from './context/AuthContext';

// Pages and Components
import Home from './pages/user/Home';
import Shop from './pages/user/Shop';
// Product detail page for individual product view
import ProductDetail from './pages/user/ProductDeatils';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Dashboards
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserDashboard from "./pages/user/UserDashbord";

// Shared Layout Components
import NavigationBar from './components/Navigation'
import Footer from './components/Footer';

// User Features
// import Cart from "./pages/user/Cart";
import Cart from "./pages/user/Cart"
import SearchPage from "./components/SearchPage"
import Wishlist from "./pages/user/Wishlist";
import ProductList from './pages/admin/ProductList';
import EditProduct from "./pages/admin/EditProduct";

import AddProduct from './pages/admin/AddProduct'; // ✅ Update path if needed

function App() {
  // Get currently logged-in user and their role
  const { user } = useAuth();

  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* Top navigation bar */}
        <NavigationBar />

        {/* Define application routes */}
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Authenticated user pages */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />

          {/* Role-based dashboard redirect */}
          <Route
            path="/dashboard"
            element={
              user ? (
                user.role === 'admin' ? (
                  <Navigate to="/admin/dashboard" /> // If admin, redirect to admin dashboard
                ) : (
                  <Navigate to="/user/dashboard" /> // If normal user, redirect to user dashboard
                )
              ) : (
                <Navigate to="/login" /> // If not logged in, go to login
              )
            }
          />

          {/* Dashboard routes for admin and user */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/products" element={<ProductList />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="/admin/edit-product/:id" element={<EditProduct />} />


        </Routes>


        {/* Footer always shown */}
        <Footer />
      </div>
    </>
  );
}

export default App;
