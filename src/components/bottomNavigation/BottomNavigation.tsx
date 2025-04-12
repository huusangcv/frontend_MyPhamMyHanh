import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import InfoIcon from '@mui/icons-material/Info';
import StarIcon from '@mui/icons-material/Star';
import classNames from 'classnames/bind';
import styles from './BottomNavigation.module.scss';
import { Link } from 'react-router-dom';
import categoryMethods from '../../services/categories';
import { setCategory } from '../../redux/features/category/categorySlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../hooks';
const cx = classNames.bind(styles);

interface Category {
  _id: string;
  name: string;
  slug: string;
}

const BottomNav = () => {
  const [value, setValue] = React.useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const dispatch = useDispatch();
  const categories: Category[] = useAppSelector((state) => state.category.categories);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, status } = await categoryMethods.getCategories();
        if (status) {
          dispatch(setCategory(data));
        } else {
          console.error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching categories: ', error);
      }
    };

    if (categories.length === 0) {
      fetchCategories();
    }
  }, [categories, dispatch]);

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };

  return (
    <div className={cx('bottom-navigation')}>
      <Box sx={{ width: '100%', position: 'fixed', bottom: 0, zIndex: 9999 }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(_event: any, newValue: any) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction component={Link} to="/" label="Trang chủ" icon={<HomeIcon />} />
          <BottomNavigationAction label="Danh mục" icon={<ListIcon />} onClick={toggleDrawer(true)} />
          <BottomNavigationAction component={Link} to="/news/all" label="Tin tức" icon={<AnnouncementIcon />} />
          <BottomNavigationAction component={Link} to="/introduce" label="Giới thiệu" icon={<InfoIcon />} />
          <BottomNavigationAction component={Link} to="/certificates" label="Bằng khen" icon={<StarIcon />} />
        </BottomNavigation>
      </Box>

      {/* Drawer */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
          role="presentation"
        >
          {/* Header with Close Button */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 16px',
              borderBottom: '1px solid #ddd',
            }}
          >
            <h3 style={{ margin: 0 }}>Sản phẩm</h3>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* List of Categories */}
          <List>
            {categories.map((category) => (
              <Link
                to={`/products/${category.slug}`}
                key={category._id}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <ListItem button key={category._id}>
                  <ListItemText primary={category.name} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
};

export default BottomNav;
