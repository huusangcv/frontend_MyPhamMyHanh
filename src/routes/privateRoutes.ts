import configs from "../configs";
import CartLayout from "../layouts/CartLayout";
import MemberLayout from "../layouts/memberLayout/MemberLayout";
import NotFound from "../pages/404/404";
import Cart from "../pages/cart/Cart";
import Payment from "../pages/payment/Payment";
import PaymentInfo from "../pages/paymentInfo/PaymentInfo";
import PaymentResult from "../pages/paymentResult/PaymentResult";
import About from "../views/about/About";
import ProductDetail from "../views/details/ProductDetail";
import Home from "../views/home/Home";
import Member from "../views/memberGroups/member/Member";
import Order from "../views/memberGroups/order/Order";
import OrderDetail from "../views/memberGroups/orderDetail/OrderDetail";
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
    path: configs.routes.payment,
    component: Payment,
    layout: CartLayout,
  },
  {
    path: configs.routes.paymentInfo,
    component: PaymentInfo,
    layout: CartLayout,
  },
  {
    path: configs.routes.paymentResult,
    component: PaymentResult,
    layout: CartLayout,
  },
  {
    path: configs.routes.member,
    component: Member,
    layout: MemberLayout,
  },
  {
    path: configs.routes.memberOrder,
    component: Order,
    layout: MemberLayout,
  },
  {
    path: configs.routes.memberOrderDetail,
    component: OrderDetail,
    layout: MemberLayout,
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
