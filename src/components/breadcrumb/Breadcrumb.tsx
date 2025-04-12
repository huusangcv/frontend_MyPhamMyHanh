import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { Grid, Typography } from '@mui/material';
interface Breacrumb {
  name: string;
  to: string;
}
interface BreadcrumbProps {
  breadcrums: Breacrumb[];
}
export default function Breadcrumb({ breadcrums }: BreadcrumbProps) {
  const navigate = useNavigate();

  return (
    <Grid container spacing={2}>
      <Grid item>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="large" />} aria-label="breadcrumb" className="breadcrumbs">
          <Link key="2" color="inherit" to="/" onClick={() => navigate('/')}>
            <HomeIcon sx={{ mr: 0.5 }} fontSize="large" />
            Trang chủ
          </Link>
          {breadcrums.map((breadcrum, index) => {
            if (index === breadcrums.length - 1) {
              return (
                <Typography variant="body1" key="3" sx={{ color: 'text.primary' }}>
                  {breadcrum.name}
                </Typography>
              );
            }
            return (
              <Link key={index} color="inherit" to={breadcrum.to} onClick={() => navigate('/')}>
                {breadcrum.name}
              </Link>
            );
          })}
          ,
        </Breadcrumbs>
      </Grid>
    </Grid>
  );
}
