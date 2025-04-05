import configs from '../configs';
import NotFound from '../pages/404/404';
import About from '../views/about/About';
import Certificates from '../views/certificates/Certificates';
import ProductDetail from '../views/details/ProductDetail';
import Home from '../views/home/Home';
import NewsDetail from '../views/news/NewsDetail';
import NewsList from '../views/news/NewsList';
import Products from '../views/product/Products';

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
    path: configs.routes.certificates,
    component: Certificates,
  },

  {
    path: configs.routes.notFound,
    component: NotFound,
  },
];

export default publicRoutes;
