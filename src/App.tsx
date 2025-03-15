import { BrowserRouter, Route, Routes } from "react-router";
import { privateRoutes, publicRoutes } from "./routes";
import DefaultLayout from "./layout/DefaultLayout";
import { Fragment } from "react/jsx-runtime";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { useDispatch } from "react-redux";
import { setShowAccountModal } from "./redux/features/isShowAccountModal/isShowAccountModalSlice";
import usersMethods from "./services/users";
import { setProfile } from "./redux/features/profile/profileSlice";

interface RouteType {
  path: string;
  component: React.FC;
  layout?: React.FC<{ children: React.ReactNode }> | null;
}
const App = () => {
  const isShowModalAccount = useSelector(
    (state: RootState) => state.modalAccount
  );

  const profile = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    const fectchProfile = async (cookie: string) => {
      try {
        const res = await usersMethods.profile(cookie as string);
        if (res.status) {
          dispatch(setProfile(res.data));
        }
      } catch (error) {
        console.log(error);
      }
    };

    const interval = setInterval(() => {
      const cookie = Cookies.get("customer");

      // Dừng interval nếu cookie tồn tại và modal đang hiển thị
      if (cookie && isShowModalAccount) {
        clearInterval(interval);
        dispatch(setShowAccountModal(false));
        if (cookie) {
          fectchProfile(cookie);
        }
      } else if (!isShowModalAccount) {
        clearInterval(interval);
      }
    }, 1000); // Kiểm tra mỗi giây

    return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
  }, [isShowModalAccount, dispatch]);

  useEffect(() => {
    const cookie = Cookies.get("customer");
    const fectchProfile = async (cookie: string) => {
      try {
        const res = await usersMethods.profile(cookie as string);
        if (res.status) {
          dispatch(setProfile(res.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (cookie && profile._id === "") {
      fectchProfile(cookie);
    }
  }, [dispatch, profile]);

  return (
    <BrowserRouter>
      <Routes>
        {(Cookies.get("customer") &&
          profile._id !== "" &&
          privateRoutes.map((route: RouteType, index: number) => {
            const Page = route.component;
            let Layout = DefaultLayout;

            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page></Page>
                  </Layout>
                }
              />
            );
          })) ||
          publicRoutes.map((route: RouteType, index: number) => {
            const Page = route.component;
            let Layout = DefaultLayout;

            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page></Page>
                  </Layout>
                }
              />
            );
          })}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
