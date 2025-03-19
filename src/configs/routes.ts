const routes = {
  home: "/",
  productDetail: "product/:slug",
  products: "/products/:slug",
  cart: "/cart",
  payment: "/cart/payment",
  paymentInfo: "/cart/payment-info",
  paymentResult: "/cart/payment-result",
  about: "/gioi-thieu",
  contact: "/lien-he",
  certificate: "/bang-khen",
  news: "/news/:slug",
  newsDetail: "/news/detail/:slug",
  login: "/login",
  register: "/register",
  profile: "/profile",
  notFound: "*",
};

export default routes;
