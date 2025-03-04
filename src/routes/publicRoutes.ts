import configs from "../configs";
import About from "../views/about/About";
import ProductDetail from "../views/details/ProductDetail";
import Home from "../views/home/Home";
import NewsDetail from "../views/news/NewsDetail";
import NewsList from "../views/news/NewsList";

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
  {
    path: configs.routes.news,
    component: NewsList,
  },
  {
    path: configs.routes.newsDetail,
    component: NewsDetail,
  },
];

export default publicRoutes;
