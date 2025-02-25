import { BrowserRouter, Route, Routes } from "react-router";
import { publicRoutes } from "./routes";
import DefaultLayout from "./layout/DefaultLayout";
import { Fragment } from "react/jsx-runtime";
// import DefaultLayout from "./layout/DefaultLayout";

interface RouteType {
  path: string;
  component: React.FC;
  layout?: React.FC | null;
}
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route: RouteType, index: number) => {
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
