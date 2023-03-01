import { useRoutes } from "react-router-dom";
import { LoginPage, Home } from "../pages";

export type RouterType = {
  path: string;
  element: React.ReactNode;
  root?: string[];
  children?: RouterType[];
  notExect?: boolean;
};

const routes: RouterType[] = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/home",
    element: <Home />,
  },
];
export const Router = () => {
  return useRoutes(routes);
};
