import configs from "../configs";
import About from "../views/about/About";
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
];

export default publicRoutes;
