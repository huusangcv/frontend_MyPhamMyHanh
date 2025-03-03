import configs from "../configs";
import About from "../views/about/About";
import ProductDetail from "../views/details/ProductDetail";
import Home from "../views/home/Home";

const publicRoutes = [
  {
    path: configs.routes.home,
    component: Home,
  },
  {
    path: configs.routes.about,
    component: About,
  },
  {
    path: configs.routes.productDetail,
    component: ProductDetail,
  },
];

export default publicRoutes;
