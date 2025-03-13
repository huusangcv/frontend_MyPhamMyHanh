// import * as React from "react";
// import Box from "@mui/material/Box";
// import BottomNavigation from "@mui/material/BottomNavigation";
// import BottomNavigationAction from "@mui/material/BottomNavigationAction";
// import RestoreIcon from "@mui/icons-material/Restore";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
import classNames from "classnames/bind";
import styles from "./BottomNavigation.module.scss";
const cx = classNames.bind(styles);
const BottomNav = () => {
  // const [value, setValue] = React.useState(0);

  return (
    <div className={cx("bottom-navigation")}>
      {/* <Box sx={{ width: "100vw", position: "fixed", bottom: 0, zIndex: 9999 }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(_event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
          <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
          <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
        </BottomNavigation>
      </Box> */}
    </div>
  );
};

export default BottomNav;
