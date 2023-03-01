import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Router } from "./routes";
import { message } from "antd";
import { useRootStore } from "./store/RootStore";
import "./App.css";

const whiteRoute: string[] = [];

const App: React.FC = () => {
  const { loginStore } = useRootStore();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    location.pathname === "/" && navigate("/login");
  });

  useEffect(() => {
    const token = loginStore.getToken;
    if (
      location.pathname !== "/login" &&
      location.pathname !== "/" &&
      !token &&
      whiteRoute.every((e) => !location.pathname.includes(e))
    ) {
      message.warning("登陆失效，请重新登录!");
      navigate("/login");
    }
  }, [location]);

  return <div className="App">{Router()}</div>;
};

export default App;
