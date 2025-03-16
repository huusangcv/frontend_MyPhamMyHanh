import { Avatar, Grid } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./News.module.scss";
import { useEffect, useState } from "react";
import newsMethods from "../../services/news";
import { useParams } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import tagMethods from "../../services/tags";
import Loading from "../../components/isLoading/IsLoading";
import ModelComment from "../../components/modelComment/ModelComment";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { setShowAccountModal } from "../../redux/features/isShowAccountModal/isShowAccountModalSlice";

const cx = classNames.bind(styles);
const NewsDetail = () => {
  interface User {
    _id: string;
    name: string;
    image: string;
    username: string;
    roles: string;
    segment_ids: string[];
  }
  interface News {
    _id: string;
    title: string;
    content: string;
    likes: string[];
    image: string;
    author: string;
    tag_id: string;
    createdAt: string;
  }

  interface Tag {
    _id: string;
    name: string;
    slug: string;
  }
  interface Comment {
    _id: string;
    content: string;
    user_id: string;
    createdAt: string;
    replies: string[];
    news_id: string;
    likes: string[];
  }

  const [tags, setTags] = useState<Tag[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [closing, setClosing] = useState<boolean>(true);
  const profile = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();

  const [news, setNews] = useState<News>({
    _id: "",
    title: "",
    content: "",
    image: "",
    likes: [],
    author: "",
    tag_id: "",
    createdAt: "",
  });
  const [user, setUser] = useState<User>({
    _id: "",
    name: "",
    image: "",
    username: "",
    roles: "",
    segment_ids: [],
  });
  const { slug } = useParams();

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const { data, status } = await newsMethods.getDetailNews(
          slug as string
        );

        if (status) {
          if (data.comments) {
            setNews(data.news);
            setComments(data.comments);
          } else {
            setNews(data.news);
          }
          setUser(data.user);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (slug) {
      fetchNewsDetail();
    }
  }, [slug]);

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

  useEffect(() => {
    document.title = `${news.title}`;
    scroll({
      top: 0,
    });
  }, [news.title]);

  const countWords = (markdownContent: string) => {
    // Xóa các thẻ Markdown và đếm số từ
    const text = markdownContent
      .replace(/[#*`_>[\]()]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    return text.length > 0 ? text.split(" ").length : 0;
  };

  const calculateReadingTime = (markdownContent: string) => {
    const wordsPerMinute = 100; // Tốc độ đọc trung bình
    const wordCount = countWords(markdownContent);
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
  };

  const caclTimePost = (createdAt: string) => {
    const date = new Date(createdAt);
    const now = new Date();
    const secondsDiff = Math.floor((now.getTime() - date.getTime()) / 1000); // Tính số giây chênh lệch

    let timeAgo;

    if (secondsDiff < 60) {
      timeAgo = `${secondsDiff} giây trước`;
    } else if (secondsDiff < 3600) {
      const minutes = Math.floor(secondsDiff / 60);
      timeAgo = `${minutes} phút trước`;
    } else if (secondsDiff < 86400) {
      const hours = Math.floor(secondsDiff / 3600);
      timeAgo = `${hours} giờ trước`;
    } else if (secondsDiff > 86400) {
      const days = Math.floor(secondsDiff / 86400);
      timeAgo = `${days} ngày trước`;
    } else {
      timeAgo = date.toLocaleString();
    }

    return timeAgo;
  };

  const handleLikeNew = async () => {
    const data = {
      userId: profile._id,
    };
    try {
      const res = await newsMethods.likeNews(news._id, data);

      if (res.status) {
        setNews(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnLikeNew = async () => {
    const data = {
      userId: profile._id,
    };
    try {
      const res = await newsMethods.unlikeNews(news._id, data);

      if (res.status) {
        setNews(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const tag = tags.find((tag) => tag._id === news?.tag_id);

  const handleClosing = () => {
    setClosing(!closing);
  };
  return (
    <>
      {(isLoading && <Loading />) || (
        <div className={cx("wapper-detail")}>
          <Grid container spacing={2}>
            <Grid item md={2}>
              <div className={cx("aside")}>
                <div>
                  <h4 className={cx("userName")}>
                    {news && user && user._id === news.author && user.username}
                  </h4>
                </div>
                <p className={cx("userTitle")}>123</p>
                <hr />
                <div className={cx("wapper")}>
                  {(news.likes.includes(profile._id) && (
                    <div
                      className={cx("btnReact", "active")}
                      title="Bạn đã thích bài này"
                      onClick={handleUnLikeNew}
                    >
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="heart"
                        className="svg-inline--fa fa-heart "
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
                        ></path>
                      </svg>
                      <span> {news.likes.length}</span>
                    </div>
                  )) || (
                    <div
                      className={cx("btnReact")}
                      title="Nhấn để thích bài này"
                      onClick={() =>
                        (profile._id !== "" && handleLikeNew()) ||
                        dispatch(setShowAccountModal(true))
                      }
                    >
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="far"
                        data-icon="heart"
                        className="svg-inline--fa fa-heart "
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"
                        ></path>
                      </svg>
                      <span> {news.likes.length}</span>
                    </div>
                  )}
                  <div className={cx("btnReact")} onClick={handleClosing}>
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="far"
                      data-icon="comment"
                      className="svg-inline--fa fa-comment "
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z"
                      ></path>
                    </svg>
                    <span>{comments.length}</span>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item md={8}>
              <div className={"bannerTopHead topBarHeader"}>
                <div className={"block-breadcrumbs affix"}>
                  <div className="container">
                    <Breadcrumb
                      breadcrums={[
                        {
                          name: "Tin tức",
                          to: "/news/all",
                        },
                        {
                          name: (tag && tag.name) || "...",
                          to: (tag && `/news/${tag.slug}`) || "...",
                        },
                        {
                          name: (tag && news?.title) || "...",
                          to: "...",
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
              <div className={cx("wapper")}>
                <article>
                  <div className={cx("heading")}>{news && news.title}</div>
                  <div className={cx("header")}>
                    {news && user && (
                      <div className={cx("author")}>
                        <div>
                          <div
                            className={cx(
                              "avatar",
                              user.roles === "admin" && "is-admin"
                            )}
                          >
                            <Avatar
                              src={`http://localhost:8080${user.image}`}
                              alt={user.username}
                            />
                            {user.roles === "admin" && (
                              <img
                                className={cx("crown")}
                                src="data:image/svg+xml,%3csvg%20width='10'%20height='11'%20viewBox='0%200%2010%2011'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M9.39379%209.23321C9.0651%209.45156%208.65127%209.35571%208.44241%209.04131C8.43292%209.02701%208.43292%209.02701%208.43292%209.02701L3.97587%2010.9373C3.74252%2011.0512%203.45241%2010.9555%203.31001%2010.7412L0.16768%206.01085C0.0252788%205.79648%200.0495717%205.49198%200.244949%205.321L3.73367%201.95298C3.73367%201.95298%203.73367%201.95298%203.72418%201.93869C3.51533%201.62429%203.58739%201.20567%203.91608%200.987317C4.23048%200.778461%204.6586%200.864817%204.86746%201.17922C5.06682%201.47933%204.98996%201.92174%204.67556%202.13059C4.54694%202.21604%204.39464%202.23482%204.24713%202.22982L4.07259%204.19953C4.05299%204.54211%204.3428%204.82333%204.68548%204.78107L6.87956%204.5182C6.87517%204.29455%206.97071%204.0663%207.18508%203.9239C7.49948%203.71504%207.9276%203.8014%208.14594%204.13009C8.3548%204.44449%208.25895%204.85832%207.94455%205.06718C7.73019%205.20958%207.48275%205.20917%207.26879%205.10413L6.17594%207.02475C6.00415%207.32425%206.16054%207.7147%206.48392%207.82944L8.35779%208.41781C8.41985%208.29419%208.5057%208.17537%208.63432%208.08993C8.94872%207.88107%209.36734%207.95314%209.58569%208.28183C9.79455%208.59623%209.70819%209.02435%209.39379%209.23321Z'%20fill='%23F5C70E'/%3e%3c/svg%3e"
                                alt="crown"
                              />
                            )}
                          </div>
                        </div>
                        <div className={cx("info")}>
                          <div>
                            <span className={cx("name")}>{user.username}</span>
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              data-prefix="fas"
                              data-icon="circle-check"
                              className="svg-inline--fa fa-circle-check _icon_1jdb1_1"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                            >
                              <path
                                fill="currentColor"
                                d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
                              ></path>
                            </svg>
                          </div>
                          <p className={cx("time")}>
                            {caclTimePost(news.createdAt)}
                            <span className={cx("dot")}>·</span>
                            {calculateReadingTime(news.content)} phút đọc
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className={cx("content")}>
                    <MDEditor.Markdown
                      source={news?.content}
                      className={cx("markdown-content")}
                    />
                  </div>
                </article>
              </div>
            </Grid>
            <Grid item md={2}></Grid>
          </Grid>
        </div>
      )}
      <ModelComment
        user={user}
        isClosing={closing}
        onHandleClosing={handleClosing}
        comments={comments}
        handleSetComments={setComments}
      />
    </>
  );
};

export default NewsDetail;
