import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import { Box, Grid, Pagination, PaginationItem, Stack, MenuItem, IconButton, Menu } from '@mui/material';
import { useEffect, useState } from 'react';
import productMethods from '../../services/products';
import CardItem from '../../components/card/Card';
import categoryMethods from '../../services/categories';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Link, useLocation, useParams } from 'react-router-dom';
import queryString from 'query-string';
const cx = classNames.bind(styles);
const Products = () => {
  interface Product {
    _id: string;
    name: string;
    images: string[];
    discount: number;
    price: number;
    category_id: string;
    note: string;
    description: string;
    slug: string;
    bestseller: boolean;
  }

  interface Category {
    _id: string;
    name: string;
    slug: string;
  }

  const { slug } = useParams();
  const location = useLocation();
  const { page } = queryString.parse(location.search, {
    parseNumbers: true,
  });
  const [categoryName, setCategoryName] = useState('TẤT CẢ SẢN PHẨM');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [categoryDesc, setCategoryDesc] = useState<string>('Khám phá tất cả sản phẩm của chúng tôi.');
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [sortOption, setSortOption] = useState<string>('default');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const categoryDescriptions: { [key: string]: string } = {
    all: 'Khám phá tất cả sản phẩm của chúng tôi.',
    'my-hanh': 'Sản phẩm Mỹ Hạnh mang đến vẻ đẹp tự nhiên.',
    'my-hanh-vip': 'Dòng sản phẩm cao cấp Mỹ Hạnh Vip.',
    priswhite: 'PRISWHITE - Giải pháp làm trắng da hiệu quả.',
    'thien-diep-lien': 'Thiên Diệp Liên - Sự kết hợp hoàn hảo từ thiên nhiên.',
    'pristine-white': 'PRISTINE WHITE - Làn da trắng sáng không tì vết.',
  };

  const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPriceFilter(event.target.value as string);
  };

  const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSortOption(event.target.value as string);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterSelect = (filter: string) => {
    setPriceFilter(filter);
    handleClose();
  };

  const handleSortSelect = (sort: string) => {
    setSortOption(sort);
    handleClose();
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (slug === 'all') {
          const { status, data } = await productMethods.getProducts(page as number);

          if (status) {
            setProducts(data.products);
            setTotalPages(data.totalPages);
          } else {
            setTotalPages(1);
          }
        } else {
          const { status, data } = await productMethods.getProductsByCategory(slug as string, page as number);

          if (status) {
            setProducts(data.products);
            setTotalPages(data.totalPages);
          } else {
            setTotalPages(1);
          }
        }

        window.scroll({
          top: 0,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, [slug, page]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { status, data } = await categoryMethods.getCategories();

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
    document.title = 'Sản phẩm | Tất cả sản phẩm';
    scroll({
      top: 0,
    });
  }, []);

  useEffect(() => {
    setCategoryDesc(categoryDescriptions[slug || 'all'] || 'Khám phá sản phẩm của chúng tôi.');
  }, [slug]);

  // useEffect(() => {
  //   const fetchFilteredProducts = async () => {
  //     try {
  //       const { status, data } = await productMethods.getFilteredProducts({
  //         category: slug || 'all',
  //         page: page as number,
  //         price: priceFilter,
  //         sort: sortOption,
  //       });

  //       if (status) {
  //         setProducts(data.products);
  //         setTotalPages(data.totalPages);
  //       } else {
  //         setTotalPages(1);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchFilteredProducts();
  // }, [slug, page, priceFilter, sortOption]);
  console.log('show', handleFilterChange, handleSortChange, priceFilter, sortOption);
  return (
    <div className={cx('wapper')}>
      <div className={cx('header')}>
        <h1 className={cx('heading')}>{categoryName}</h1>
        <p className={cx('desc')}>{categoryDesc}</p>
      </div>
      <hr />
      <div className={cx('filters')}>
        <div>
          <IconButton onClick={handleClick}>
            <FilterListIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem disabled>Lọc theo giá</MenuItem>
            <MenuItem onClick={() => handleFilterSelect('all')}>Tất cả</MenuItem>
            <MenuItem onClick={() => handleFilterSelect('low')}>Dưới 500k</MenuItem>
            <MenuItem onClick={() => handleFilterSelect('medium')}>500k - 1 triệu</MenuItem>
            <MenuItem onClick={() => handleFilterSelect('high')}>Trên 1 triệu</MenuItem>
            <MenuItem disabled>Sắp xếp</MenuItem>
            <MenuItem onClick={() => handleSortSelect('default')}>Mặc định</MenuItem>
            <MenuItem onClick={() => handleSortSelect('price-asc')}>Giá tăng dần</MenuItem>
            <MenuItem onClick={() => handleSortSelect('price-desc')}>Giá giảm dần</MenuItem>
            <MenuItem onClick={() => handleSortSelect('bestseller')}>Bán chạy</MenuItem>
          </Menu>
          <IconButton onClick={toggleExpand}>
            {isExpanded ? <ExpandLessIcon title="Thu gọn" /> : <ExpandMoreIcon title="Mở rộng" />}
          </IconButton>
        </div>
        <div className={cx('our-products')}>SẢN PHẨM CỦA CHÚNG TÔI</div>
        <div></div>
      </div>
      <div className={cx('body')}>
        <Grid container>
          {!isExpanded && (
            <Grid item md={3}>
              <div className={cx('sidebar-category')}>
                <div className={cx('heading')}>Danh mục sản phẩm</div>
                <ul className={cx('list-categories')}>
                  <li
                    className={cx(slug === 'all' && 'active')}
                    onClick={() => {
                      setCategoryName('TẤT CẢ SẢN PHẨM');
                    }}
                  >
                    <Link to="/products/all">Tất cả sản phẩm</Link>
                    <span className={cx('category-arrow')}>
                      <ArrowForwardIosIcon />
                    </span>
                  </li>
                  {categories.map((category) => (
                    <li
                      key={category._id}
                      className={cx(category.slug === slug && 'active')}
                      onClick={() => {
                        setCategoryName(category.name);
                      }}
                    >
                      <Link to={`/products/${category.slug}`}>{category.name}</Link>
                      <span className={cx('category-arrow')}>
                        <ArrowForwardIosIcon />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Grid>
          )}
          <Grid item md={isExpanded ? 12 : 9}>
            <div className={cx('list-products')}>
              {(products && (
                <Box
                  sx={{
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
                    gap: 2,
                  }}
                >
                  <CardItem products={products} isBestseller={false} />
                </Box>
              )) || <span>Sản phẩm trống</span>}
            </div>

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
                      <PaginationItem
                        component={Link}
                        to={`${item.page === 1 ? '' : `?page=${item.page}`}`}
                        {...item}
                      />
                    )}
                    boundaryCount={2}
                  />
                </Stack>
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Products;
