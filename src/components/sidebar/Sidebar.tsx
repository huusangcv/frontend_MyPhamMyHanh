import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import FeedIcon from "@mui/icons-material/Feed";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import { Link } from "react-router-dom";
import { useState } from "react";
const cx = classNames.bind(styles);
const Sidebar = () => {
  const [active, setActive] = useState("/");

  const handleClick = (path: string) => {
    setActive(path);
  };
  return (
    <div className={cx("sidebar")}>
      <ul className={cx("sidebar__list")}>
        <li>
          <Link
            aria-current="page"
            to="/"
            className={cx("sidebar__item", { active: active === "/" })}
            onClick={() => handleClick("/")}
          >
            <HomeIcon />
            <span>Trang chủ</span>
          </Link>
        </li>
        <li>
          <Link
            aria-current="page"
            to="/gioi-thieu"
            className={cx("sidebar__item", {
              active: active === "/gioi-thieu",
            })}
            onClick={() => handleClick("/gioi-thieu")}
          >
            <InfoIcon />
            <span>Giới thiệu</span>
          </Link>
        </li>
        <li>
          <Link
            aria-current="page"
            to="/bang-khen"
            className={cx("sidebar__item", { active: active === "/bang-khen" })}
            onClick={() => handleClick("/bang-khen")}
          >
            <WorkspacePremiumIcon />
            <span>Bằng khen</span>
          </Link>
        </li>
        <li>
          <Link
            aria-current="page"
            to="/"
            className={cx("sidebar__item", { active: active === "/about" })}
            onClick={() => handleClick("/about")}
          >
            <ProductionQuantityLimitsIcon />
            <span>Sản phẩm</span>
          </Link>
        </li>
        <li>
          <Link
            aria-current="page"
            to="/tin-tuc"
            className={cx("sidebar__item", { active: active === "/tin-tuc" })}
            onClick={() => handleClick("/tin-tuc")}
          >
            <FeedIcon />
            <span>Tin tức</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
