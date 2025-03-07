import classnames from "classnames/bind";
import styles from "./Footer.module.scss";
import { Grid } from "@mui/material";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import categoryMethods from "../../services/categories";
import tagMethods from "../../services/tags";
const cx = classnames.bind(styles);
const Footer = () => {
  interface Category {
    _id: string;
    name: string;
    slug: string;
  }

  interface Tag {
    _id: string;
    name: string;
    slug: string;
  }

  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

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

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const { data, status } = await tagMethods.getTags();

        if (status) {
          setTags(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTags();
  }, []);
  return (
    <footer className={cx("footer")}>
      <div className={cx("wapper")}>
        <Grid container columnSpacing={4}>
          <Grid item md={3} xl={12}>
            <div>
              <div className={cx("column-top")}>
                <a href="/">
                  <img className={cx("logo")} src={logo} alt="F8" />
                </a>
              </div>
              <p className={cx("contact-list")}>
                <b>Điện thoại:</b>{" "}
                <a href="tel:091 875 53 83"> 091 875 53 83</a>
                <br />
                <b>Email:</b>
                <a href="mailto:lanhmyhanh@gmail.com"> lanhmyhanh@gmail.com</a>
                <br />
                <b>Địa chỉ:</b> Số 240, Tổ 6, Ấp Long Hạ, Xã Kiến An, Huyện Chợ
                Mới, Tỉnh An Giang, Việt Nam
              </p>
            </div>
          </Grid>
          <Grid item xl={4} md={2}>
            <div>
              <div className={cx("heading")}>Về Mỹ Hạnh</div>
              <ul className={cx("list")}>
                <li>
                  <Link to="/">Trang chủ</Link>
                </li>
                <li>
                  <Link to="/">Giới thiệu</Link>
                </li>
                <li>
                  <Link to="/">Liên hệ</Link>
                </li>
                <li>
                  <Link to="/">Bằng khen</Link>
                </li>
              </ul>
            </div>
          </Grid>
          <Grid item xl={4} md={2}>
            <div>
              <div className={cx("heading")}>Sản phẩm</div>
              <ul className={cx("list")}>
                {categories.map((category) => (
                  <li key={category._id}>
                    <Link to={`/products/${category.slug}`}>
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Grid>
          <Grid item md={2} xl={4}>
            <div>
              <div className={cx("heading")}>Tin tức</div>
              <ul className={cx("list")}>
                {tags.map((tag) => (
                  <li key={tag._id}>
                    <Link to={`/news/${tag.slug}`}>{tag.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </Grid>
          <Grid item md={3} xl={12}>
            <div>
              <div className={cx("heading")}>
                CÔNG TY TNHH MỘT THÀNH VIÊN MỸ PHẨM MỸ HẠNH
              </div>
              <ul className={cx("list")}>
                <li>
                  <b>Mã số thuế:</b> 0109922901
                </li>
                <li>
                  <b>Ngày thành lập:</b> 04/03/2022
                </li>
                <li>
                  <b>Lĩnh vực hoạt động:</b> Sản xuất mỹ phẩm, xà phòng, chất
                  tẩy rửa, làm bóng và chế phẩm vệ sinh
                </li>
              </ul>
            </div>
          </Grid>
        </Grid>
      </div>
    </footer>
  );
};

export default Footer;
