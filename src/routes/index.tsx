import { useRoutes } from "react-router-dom";
import { LoginPage, Home } from "../pages";
import loadable from "@loadable/component";
import { useRootStore } from "../store/RootStore";
import { MenuList } from "../store/LoginStore";
import { observer } from "mobx-react-lite";

export type RouterType = {
  path?: string;
  element?: React.ReactNode;
  root?: string[];
  children?: RouterType[];
  notExect?: boolean;
};

const Router = () => {
  const { loginStore } = useRootStore();
  const menuInfo = loginStore.getMenuInfo;

  function bindRouter(list: MenuList[]) {
    let arr: RouterType[] = [];
    list.map((item) => {
      const ComponentNode = loadable(() => {
        return import("../pages/" + item.componentPath);
      });
      if (item.menuChilds && item.menuChilds.length > 0) {
        if (item.isContainChildren) {
          arr.push({
            path: item.pathName,
            element: <ComponentNode />,
            children: [...bindRouter(item.menuChilds)],
          });
        } else {
          arr.push({
            path: item.pathName,
            //element:<ComponentNode/>
            children: [...bindRouter(item.menuChilds)],
          });
        }
      } else {
        arr.push({
          path: item.pathName,
          element: <ComponentNode />,
        });
      }
    });
    return arr;
  }

  const routes: RouterType[] = [
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/home",
      element: <Home />,
      children: [...bindRouter(menuInfo)],
    },
  ];

  return useRoutes(routes);
};

export default observer(Router);
