import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import FeedIcon from '@mui/icons-material/Feed';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
const cx = classNames.bind(styles);
const Sidebar = () => {
  const location = useLocation();
  const isDetailPage = location.pathname.startsWith('/news/detail/');
  const isProductPage = location.pathname.startsWith('/product/');
  const [active, setActive] = useState('/');
  const handleClick = (path: string) => {
    setActive(path);
  };

  return (
    <div className={cx('sidebar', isProductPage && 'hidden', isDetailPage && 'hidden')}>
      <ul className={cx('sidebar__list')}>
        <li>
          <Link
            aria-current="page"
            to="/"
            className={cx('sidebar__item', { active: active === '/' })}
            onClick={() => handleClick('/')}
          >
            <HomeIcon />
            <span>Trang chủ</span>
          </Link>
        </li>
        <li>
          <Link
            aria-current="page"
            to="/introduce"
            className={cx('sidebar__item', {
              active: active === '/introduce',
            })}
            onClick={() => handleClick('/introduce')}
          >
            <InfoIcon />
            <span>Giới thiệu</span>
          </Link>
        </li>
        <li>
          <Link
            aria-current="page"
            to="/certificates"
            className={cx('sidebar__item', { active: active === '/certificates' })}
            onClick={() => handleClick('/certificates')}
          >
            <WorkspacePremiumIcon />
            <span>Bằng khen</span>
          </Link>
        </li>
        <li>
          <Link
            aria-current="page"
            to="/news/all"
            className={cx('sidebar__item', { active: active === '/news/all' })}
            onClick={() => handleClick('/news/all')}
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
