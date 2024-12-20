import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import WebsiteLayout from "./pages/layouts/WebsiteLayout";
import HomePage from "./pages/user/HomePage";
import AboutPage from "./pages/user/AboutPage";
import ProductPage from "./pages/user/ProductPage";
import ProductByCate from "./pages/user/ProductByCate";
import ProductSearchPage from "./pages/user/ProductSearchPage";
import ProductDetailPage from "./pages/user/ProductDetailPage";
import NewsPage from "./pages/user/NewsPage";
import NewsByCatePage from "./pages/user/NewsByCatePage";
import NewsDetail from "./pages/user/NewsDetail";
import ContactPage from "./pages/user/ContactPage";
import StorePage from "./pages/user/StorePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPage from "./pages/auth/ForgotPage";
import CartPage from "./pages/user/cart/CartPage";
import CheckoutPage from "./pages/user/cart/CheckoutPage";
import ThankPage from "./pages/user/cart/ThankPage";
import PrivateRouter from "./components/admin/PrivateRouter";
import UpdateInfoPage from "./pages/user/my-account/UpdateInfoPage";
import { ToastContainer } from "react-toastify";

import "sweetalert2/dist/sweetalert2.css";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MyAccountLayout from "./pages/layouts/MyAccountLayout";
import UpdatePasswordPage from "./pages/user/my-account/UpdatePasswordPage";
import MyCartPage from "./pages/user/my-account/MyCartPage";
import MyCartDetailPage from "./pages/user/my-account/MyCartDetailPage";
import AdminLayout from "./pages/layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AdminUserList from "./pages/admin/user/UserListPage";
import AddUserPage from "./pages/admin/user/AddUserPage";
import EditUserPage from "./pages/admin/user/EditUserPage";
import NewsListPage from "./pages/admin/news/NewsListPage";
import AddNewsPage from "./pages/admin/news/AddNewsPage";
import EditNewsPage from "./pages/admin/news/EditNewsPage";
import CateNewsListPage from "./pages/admin/category-news/CateNewsListPage";
import AddCateNewsPage from "./pages/admin/category-news/AddCateNewsPage";
import EditCateNewsPage from "./pages/admin/category-news/EditCateNewsPage";
import ProductListPage from "./pages/admin/product/ProductListPage";
import AddProductPage from "./pages/admin/product/AddProductPage";
import EditProductPage from "./pages/admin/product/EditProductPage";
import SliderListPage from "./pages/admin/slider/SliderListPage";
import AddSlidePage from "./pages/admin/slider/AddSlidePage";
import EditSlidePage from "./pages/admin/slider/EditSlidePage";
import CategoryListPage from "./pages/admin/category/CategoryListPage";
import EditCategoryPage from "./pages/admin/category/EditCategoryPage";
import CartListPage from "./pages/admin/cart/CartListPage";
import CartDetailPage from "./pages/admin/cart/CartDetailPage";
import AddCategoryPage from "./pages/admin/category/AddCategoryPage";
import ContactListPage from "./pages/admin/contact/ContactListPage";
import ContactDetailPage from "./pages/admin/contact/ContactDetailPage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "",
      element: <WebsiteLayout />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
        {
          path: "gioi-thieu",
          element: <AboutPage />,
        },
        {
          path: "thuc-don",
          element: <ProductPage />,
        },
        {
          path: "thuc-don/page/:page",
          element: <ProductPage />,
        },
        {
          path: "danh-muc/:slug",
          element: <ProductByCate />,
        },
        {
          path: "danh-muc/:slug/page/:page",
          element: <ProductByCate />,
        },
        {
          path: "tim-kiem/:keyword",
          element: <ProductSearchPage />,
        },
        {
          path: "tim-kiem/:keyword/page/:page",
          element: <ProductSearchPage />,
        },
        {
          path: "san-pham/:slug",
          element: <ProductDetailPage />,
        },
        {
          path: "san-pham/:slug/page/:page",
          element: <ProductDetailPage />,
        },
        {
          path: "tin-tuc",
          element: <NewsPage />,
        },
        {
          path: "tin-tuc/page/:page",
          element: <NewsPage />,
        },
        {
          path: "tin-tuc/:slug",
          element: <NewsByCatePage />,
        },
        {
          path: "tin-tuc/:slug/page/:page",
          element: <NewsByCatePage />,
        },
        {
          path: "bai-viet/:slug",
          element: <NewsDetail />,
        },
        {
          path: "lien-he",
          element: <ContactPage />,
        },
        {
          path: "cua-hang",
          element: <StorePage />,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "register",
          element: <RegisterPage />,
        },
        {
          path: "forgot",
          element: <ForgotPage />,
        },
        {
          path: "cart",
          element: <CartPage />,
        },
        {
          path: "checkout",
          element: <CheckoutPage />,
        },
        {
          path: "thank-you",
          element: <ThankPage />,
        },
        {
          path: "my-account",
          element: (
            <PrivateRouter page="user">
              <MyAccountLayout />
            </PrivateRouter>
          ),
          children: [
            {
              path: "",
              element: <UpdateInfoPage />,
            },
            {
              path: "update-password",
              element: <UpdatePasswordPage />,
            },
            {
              path: "cart",
              element: <MyCartPage />,
            },
            {
              path: "cart/page/:page",
              element: <MyCartPage />,
            },
            {
              path: "cart/:id",
              element: <MyCartDetailPage />,
            },
          ],
        },
      ],
    },
    {
      path: "/admin",
      element: (
        <PrivateRouter page="admin">
          <AdminLayout />
        </PrivateRouter>
      ),
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
        {
          path: "user",
          children: [
            {
              path: "",
              element: <AdminUserList />,
            },
            {
              path: "page/:page",
              element: <AdminUserList />,
            },
            {
              path: "add",
              element: <AddUserPage />,
            },
            {
              path: ":id/edit",
              element: <EditUserPage />,
            },
          ],
        },
        {
          path: "news",
          children: [
            {
              path: "",
              element: <NewsListPage />,
            },
            {
              path: "page/:page",
              element: <NewsListPage />,
            },
            {
              path: "add",
              element: <AddNewsPage />,
            },
            {
              path: ":id/edit",
              element: <EditNewsPage />,
            },
          ],
        },
        {
          path: "category-news",
          children: [
            {
              path: "",
              element: <CateNewsListPage />,
            },
            {
              path: "add",
              element: <AddCateNewsPage />,
            },
            {
              path: ":id/edit",
              element: <EditCateNewsPage />,
            },
          ],
        },
        {
          path: "product",
          children: [
            {
              path: "",
              element: <ProductListPage />,
            },
            {
              path: "page/:page",
              element: <ProductListPage />,
            },
            {
              path: "add",
              element: <AddProductPage />,
            },
            {
              path: ":id/edit",
              element: <EditProductPage />,
            },
          ],
        },
        {
          path: "slider",
          children: [
            {
              path: "",
              element: <SliderListPage />,
            },
            {
              path: "add",
              element: <AddSlidePage />,
            },
            {
              path: ":id/edit",
              element: <EditSlidePage />,
            },
          ],
        },
        {
          path: "category",
          children: [
            {
              path: "",
              element: <CategoryListPage />,
            },
            {
              path: "add",
              element: <AddCategoryPage />,
            },
            {
              path: ":id/edit",
              element: <EditCategoryPage />,
            },
          ],
        },
        {
          path: "cart",
          children: [
            {
              path: "",
              element: <CartListPage />,
            },
            {
              path: "page/:page",
              element: <CartListPage />,
            },
            {
              path: ":id/detail",
              element: <CartDetailPage />,
            },
          ],
        },
        {
          path: "contact",
          children: [
            {
              path: "",
              element: <ContactListPage />,
            },
            {
              path: "page/:page",
              element: <ContactListPage />,
            },
            {
              path: ":id/detail",
              element: <ContactDetailPage />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />

      <ToastContainer />
    </>
  );
};

export default App;
