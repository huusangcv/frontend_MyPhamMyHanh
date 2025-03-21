import classNames from "classnames/bind";
import styles from "./SidebarMember.module.scss";
import menuItems from "./menuItems";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);

const SidebarMember = () => {
  const navigate = useNavigate();

  const path = window.location.pathname;

  return (
    <div className={cx("wapper")}>
      <div className={cx("block-menu")}>
        {menuItems &&
          menuItems.length > 0 &&
          menuItems.map((item, index) => (
            <div
              className={cx("block-menu__item-menu", {
                active: path === item.href,
              })}
              key={index}
              onClick={() => navigate(`${item.href}`)}
            >
              <div className={cx("item-menu")}>
                <div className={cx("box-icon")} data-v-5170e23d="">
                  {item.icon}
                </div>
                <p>{item.label}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SidebarMember;
