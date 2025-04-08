import classNames from 'classnames/bind';
import styles from './News.module.scss';
import { Avatar, Grid, Pagination, PaginationItem, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import newsMethods from '../../services/news';
import usersMethods from '../../services/users';
import MDEditor from '@uiw/react-md-editor';
import tagMethods from '../../services/tags';
import { Link, useLocation, useParams } from 'react-router-dom';
import queryString from 'query-string';

const cx = classNames.bind(styles);
const NewsList = () => {
  interface News {
    _id: string;
    title: string;
    content: string;
    image: string;
    author: string;
    tag_id: string;
    slug: string;
    createdAt: string;
  }

  interface User {
    _id: string;
    name: string;
    image: string;
    username: string;
    roles: string;
  }

  interface Tag {
    _id: string;
    name: string;
    slug: string;
  }
  const location = useLocation();
  const { slug } = useParams();
  const { page } = queryString.parse(location.search, {
    parseNumbers: true,
  });

  const [news, setNews] = useState<News[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        if (slug === 'all') {
          const { data, status } = await newsMethods.getNews(page as number);

          if (status) {
            setNews(data.news);
            setTotalPages(data.totalPages);
          }
        } else {
          const { data, status } = await newsMethods.getNewsByTag(slug as string, page as number);

          if (status) {
            setNews(data.news);
            setTotalPages(data.totalPages);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchNews();
  }, [page, slug]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, status } = await usersMethods.getUsers();

        if (status) {
          setUsers(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
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

  useEffect(() => {
    document.title = 'Tin tức | Mỹ phẩm Mỹ Hạnh';
    scroll({
      top: 0,
    });
  }, []);

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

  const countWords = (markdownContent: string) => {
    // Xóa các thẻ Markdown và đếm số từ
    const text = markdownContent
      .replace(/[#*`_>[\]()]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    return text.length > 0 ? text.split(' ').length : 0;
  };

  const calculateReadingTime = (markdownContent: string) => {
    const wordsPerMinute = 100; // Tốc độ đọc trung bình
    const wordCount = countWords(markdownContent);
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
  };

  return (
    <Grid container spacing={2} columnSpacing={8}>
      <Grid item md={12}>
        <div className={cx('wapper-top')}>
          <h1 className={cx('heading')}>Tin tức nổi bật</h1>
          <p className={cx('desc')}>Tổng hợp các bài viết về Mỹ phẩm Mỹ Hạnh</p>
        </div>
      </Grid>
      <Grid item md={8}>
        <div className={cx('wapper-right', 'd-none', 'd-md-block')}>
          <h3>Xem các bài viết theo chủ đề</h3>
          <ul className={cx('topic')}>
            {tags.map((tag) => (
              <li key={tag._id}>
                <Link to="">{tag.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        {news.map((news) => (
          <div className={cx('wapper')} key={news._id}>
            <div className={cx('header')}>
              {users.map((user) => {
                if (user._id === news.author) {
                  return (
                    <div className={cx('author')}>
                      <a href="/@sondangf8">
                        <div className={cx('avatar', user.roles === 'admin' && 'is-admin')}>
                          <Avatar src={`https://api.regis.id.vn${user.image}`} alt={user.username} />
                          {user.roles === 'admin' && (
                            <img
                              className={cx('crown')}
                              src="data:image/svg+xml,%3csvg%20width='10'%20height='11'%20viewBox='0%200%2010%2011'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M9.39379%209.23321C9.0651%209.45156%208.65127%209.35571%208.44241%209.04131C8.43292%209.02701%208.43292%209.02701%208.43292%209.02701L3.97587%2010.9373C3.74252%2011.0512%203.45241%2010.9555%203.31001%2010.7412L0.16768%206.01085C0.0252788%205.79648%200.0495717%205.49198%200.244949%205.321L3.73367%201.95298C3.73367%201.95298%203.73367%201.95298%203.72418%201.93869C3.51533%201.62429%203.58739%201.20567%203.91608%200.987317C4.23048%200.778461%204.6586%200.864817%204.86746%201.17922C5.06682%201.47933%204.98996%201.92174%204.67556%202.13059C4.54694%202.21604%204.39464%202.23482%204.24713%202.22982L4.07259%204.19953C4.05299%204.54211%204.3428%204.82333%204.68548%204.78107L6.87956%204.5182C6.87517%204.29455%206.97071%204.0663%207.18508%203.9239C7.49948%203.71504%207.9276%203.8014%208.14594%204.13009C8.3548%204.44449%208.25895%204.85832%207.94455%205.06718C7.73019%205.20958%207.48275%205.20917%207.26879%205.10413L6.17594%207.02475C6.00415%207.32425%206.16054%207.7147%206.48392%207.82944L8.35779%208.41781C8.41985%208.29419%208.5057%208.17537%208.63432%208.08993C8.94872%207.88107%209.36734%207.95314%209.58569%208.28183C9.79455%208.59623%209.70819%209.02435%209.39379%209.23321Z'%20fill='%23F5C70E'/%3e%3c/svg%3e"
                              alt="crown"
                            />
                          )}
                        </div>
                      </a>
                      <a href="/@sondangf8">
                        <span>{user.username}</span>
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
                      </a>
                    </div>
                  );
                }
              })}
            </div>
            <div className={cx('actions')}></div>
            <div className={cx('body')}>
              <div className={cx('info')}>
                <Link to={`/news/detail/${news.slug}`}>
                  <h2 className={cx('title')}>{news.title}</h2>
                </Link>
                <p className={cx('desc')}>
                  <MDEditor.Markdown source={news.content} className={cx('markdown-content')} />
                </p>
                <div className={cx('meta-info')}>
                  {tags.map(
                    (tag) =>
                      tag._id === news.tag_id && (
                        <Link className={cx('tags')} to={`/news/${tag.slug}`}>
                          {tag.name}
                        </Link>
                      ),
                  )}
                  <span>{caclTimePost(news.createdAt)}</span>
                  <span className={cx('dot')}>·</span>
                  {calculateReadingTime(news.content)} phút đọc
                </div>
              </div>
              <div className={cx('thumb', 'd-lg-none')}>
                <Link to={`/news/detail/${news.slug}`}>
                  <img
                    src={`https://api.regis.id.vn${news.image}`}
                    alt='Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án "AI Powered Learning"'
                  />
                </Link>
              </div>
            </div>
          </div>
        ))}
        {totalPages > 1 && (
          <div className="pagination">
            <Stack spacing={2}>
              <Pagination
                showFirstButton
                showLastButton
                size="large"
                color="primary"
                count={totalPages}
                renderItem={(item) => (
                  <PaginationItem component={Link} to={`${item.page === 1 ? '' : `?page=${item.page}`}`} {...item} />
                )}
                boundaryCount={2}
              />
            </Stack>
          </div>
        )}
      </Grid>
      <Grid item md={4}>
        <div className={cx('wapper-right', 'd-lg-none')}>
          <h3>Xem các bài viết theo chủ đề</h3>
          <ul className={cx('topic')}>
            {tags.map(
              (tag) =>
                tag.slug !== slug && (
                  <li key={tag._id}>
                    <Link to={`/news/${tag.slug}`}>{tag.name}</Link>
                  </li>
                ),
            )}
          </ul>
        </div>
        <div
          className={cx('wapper-sticky')}
          style={
            {
              '--sticky': '80px',
              '--align': 'flex-start',
            } as React.CSSProperties
          }
        >
          <div className={cx('content')}>
            <Link to="" className={cx('banner')}>
              <img src="https://myphammyhanh.com/frontend/img/half2.jpg" alt="" />
            </Link>
            <Link to="https://www.facebook.com/myhanhcosmetics" className={cx('banner')}>
              <img src="https://myphammyhanh.com/frontend/img/thuvien/9.jpeg" alt="" />
            </Link>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default NewsList;
