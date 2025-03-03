import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import classNames from "classnames/bind";
import styles from "./News.module.scss";
import newsMethods from "../../services/news";
import usersMethods from "../../services/users";
import { CardActions } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
const cx = classNames.bind(styles);
export default function News() {
  interface News {
    _id: string;
    title: string;
    image: string;
    view: number;
    author: string;
  }

  interface User {
    _id: string;
    username: string;
    image: string;
  }

  const [news, setNews] = React.useState<News[]>([]);
  const [users, setUsers] = React.useState<User[]>([]);
  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { status, data } = await newsMethods.getNews();

        if (status) {
          setNews(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { status, data } = await usersMethods.getUsers();

        if (status) {
          setUsers(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return (
    <>
      {news.map((news) => (
        <Card sx={{ maxWidth: 345 }} key={news._id} className={cx("card")}>
          <a href="#!">
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image={`http://localhost:8080${news.image}`}
            />
          </a>
          <CardContent>
            <a href="#!">
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className={cx("heading")}
              >
                {news.title}
              </Typography>
            </a>
          </CardContent>
          <CardActions>
            <div className={cx("more-info")}>
              {users.map((user) => {
                if (user._id === news.author) {
                  return (
                    <div key={user._id}>
                      <div className={cx("info-item")}>
                        <div className={cx("avatar")}>
                          <img
                            src={`http://localhost:8080${user.image}`}
                            alt=""
                          />
                        </div>
                        <span>{user.username}</span>
                      </div>
                      <div className={cx("view")}>
                        {formatter.format(news.view)}
                        <VisibilityIcon />
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </CardActions>
        </Card>
      ))}
    </>
  );
}
