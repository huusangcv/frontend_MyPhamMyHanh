import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import styles from './ProductMenu.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import categoryMethods from '../../services/categories';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCategory } from '../../redux/features/category/categorySlice';
import { useAppSelector } from '../../../hooks';

const cx = classNames.bind(styles);

interface Category {
  _id: string;
  name: string;
  slug: string;
}

const ProductMenu: React.FC = () => {
  const dispatch = useDispatch();
  const categories: Category[] = useAppSelector((state) => state.category.categories);
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  useEffect(() => {
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

  const handleToggleDropdown = () => {
    setShowDropDown((prev) => !prev);
  };

  return (
    <div className={cx('product-menu')}>
      <h2
        className={cx('menu-heading')}
        onClick={handleToggleDropdown} // Sử dụng onClick để mở/đóng dropdown
        onMouseEnter={() => setShowDropDown(true)} // Hiện dropdown khi hover
      >
        Sản phẩm <ArrowDropDownIcon />
      </h2>
      <ul
        className={cx('menu-dropdown', { active: showDropDown })} // Sử dụng đối tượng để thêm class
        onMouseLeave={() => setShowDropDown(false)}
      >
        {categories?.length > 0 ? (
          categories.map((category) => (
            <li key={category._id}>
              <Link to={`/products/${category.slug}`} className={cx('list-link')}>
                {category.name}
              </Link>
            </li>
          ))
        ) : (
          <li>
            <span className={cx('list-link')}>Không có danh mục nào</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default ProductMenu;
