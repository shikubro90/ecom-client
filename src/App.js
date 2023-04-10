import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./components/nav/Menu";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/routes/PrivateRoute";
import Dashboard from "./pages/user/Dashboard";
import AdminRoute from "./components/routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
// import Category from "./pages/admin/AdminCategory";
import Products from "./pages/admin/Products";
import PageFotFound from "./pages/PageFotFound";
import AdminCategory from "./pages/admin/AdminCategory";
import AdminProducts from "./pages/admin/AdminProducts";
import Shop from "./pages/Shop";
import Search from "./pages/Search";
import ProductsCardView from "./pages/ProductsCardView";
import Cart from "./pages/Cart";

function App() {
  return (
    <>
      <BrowserRouter>
        <Menu />
        <Toaster />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<Search/>} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/products/:slug" element={ <ProductsCardView/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<Dashboard />} />
          </Route>
          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/category" element={<AdminCategory />} />
            <Route path="admin/product" element={<Products />} />
            <Route path="admin/products" element={<AdminProducts />} />
          </Route>
          <Route path="*" element={<PageFotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
