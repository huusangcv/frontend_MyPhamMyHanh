import SlideSlick from "../../components/sildeslick/SlideSlick";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { Box } from "@mui/material";
import CardItem from "../../components/card/Card";

const cx = classNames.bind(styles);
const Home = () => {
  return (
    <div className={cx("home")} style={{ width: "100%" }}>
      <SlideSlick></SlideSlick>
      <div className={cx("wapper")}>
        <h2 className={cx("heading")}>
          <span>Sản phẩm nổi bật</span>
        </h2>

        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
            gap: 2,
          }}
        >
          <CardItem />
        </Box>
      </div>
    </div>
  );
};

export default Home;
