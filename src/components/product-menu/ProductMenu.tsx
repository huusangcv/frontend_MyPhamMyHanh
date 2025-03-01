import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import styles from "./ProductMenu.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import categoryMethods from "../../services/categories";

const cx = classNames.bind(styles);
const ProductMenu = () => {
  interface Category {
    _id: string;
    name: string;
  }

  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, status } = await categoryMethods.getCategories();
        if (status) {
          setCategories(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className={cx("product-menu")}>
      <h2
        className={cx("menu-heading")}
        onMouseOver={() => setShowDropDown(true)}
      >
        Sản phẩm <ArrowDropDownIcon />
      </h2>
      <ul
        className={cx("menu-dropdown", showDropDown && "active")}
        onMouseLeave={() => setShowDropDown(false)}
      >
        {categories.map((category) => (
          <li key={category._id}>
            <a href="#!" className={cx("list-link")}>
              {category.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductMenu;
