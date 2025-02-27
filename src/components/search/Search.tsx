import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import SearchIcon from "@mui/icons-material/Search";
const cx = classNames.bind(styles);
const Search = () => {
  return (
    <div className={cx("search")}>
      <div className={cx("search__icon")}>
        <SearchIcon />
      </div>
      <input
        type="text"
        className={cx("search__input")}
        placeholder="Tìm kiếm sản phẩm, tìn tức,..."
      />
    </div>
  );
};

export default Search;
