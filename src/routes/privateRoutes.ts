import configs from "../configs";
import CartLayout from "../layout/CartLayout";
import NotFound from "../pages/404/404";
import Cart from "../pages/cart/Cart";
import PaymentInfo from "../pages/paymentInfo/PaymentInfo";
import About from "../views/about/About";
import ProductDetail from "../views/details/ProductDetail";
import Home from "../views/home/Home";
import NewsDetail from "../views/news/NewsDetail";
import NewsList from "../views/news/NewsList";
import Products from "../views/product/Products";
const privateRoutes = [
  {
    path: configs.routes.cart,
    component: Cart,
    layout: CartLayout,
  },
  {
    path: configs.routes.paymentInfo,
    component: PaymentInfo,
    layout: CartLayout,
  },
  {
    path: configs.routes.home,
    component: Home,
  },
  {
    path: configs.routes.about,
    component: About,
  },
  {
    path: configs.routes.products,
    component: Products,
  },
  {
    path: configs.routes.productDetail,
    component: ProductDetail,
  },
  {
    path: configs.routes.news,
    component: NewsList,
  },
  {
    path: configs.routes.newsDetail,
    component: NewsDetail,
  },
  {
    path: configs.routes.notFound,
    component: NotFound,
  },
];

export default privateRoutes;
