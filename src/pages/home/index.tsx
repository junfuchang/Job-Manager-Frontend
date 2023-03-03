import React, { useEffect, useRef, useState } from "react";
import { Layout, Menu, Modal, Form, Input, Button } from "antd";
import type { MenuProps } from "antd";
import { useBoolean } from "ahooks";
import { createFromIconfontCN } from "@ant-design/icons";
import c from "classnames";
import "./index.scss";
import { Link, Outlet, useNavigate } from "react-router-dom";
import HomeHeader from "./home-header";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../store/RootStore";
import { MenuList } from "../../store/LoginStore";

const { Header, Sider, Content } = Layout;
type MenuItem = Required<MenuProps>["items"][number];

function bindMenu(menuList: MenuList[] = []) {
  let arr: any = [];
  menuList.map((item) => {
    const IconFont = createFromIconfontCN({
      scriptUrl: "//at.alicdn.com/t/c/font_3926371_3prqdkgqn7u.js",
    });

    if (item?.menuChilds?.length) {
      arr.push({
        key: item.menuUrl,
        icon: <IconFont type={item.menuImgClass} />,
        label: item.menuName,
        children: [...bindMenu(item.menuChilds)],
      });
    } else {
      arr.push({
        key: item.menuUrl,
        icon: <IconFont type={item.menuImgClass} />,
        label: <Link to={item.menuUrl}>{item.menuName}</Link>,
      });
    }
  });
  return arr;
}

const Home: React.FC = () => {
  const { loginStore } = useRootStore();
  const [menus] = useState(bindMenu(loginStore.getMenuInfo));
  const navigate = useNavigate();

  const [collapsed, { toggle: toggleCollapsed }] = useBoolean(false);

  const defaultPage = menus?.[0]?.key ?? "11";
  useEffect(() => {
    navigate("/home/" + defaultPage);
  }, []);

  return (
    <>
      <Layout className="home-page">
        <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed}>
          <div className="home-icon"></div>
          <Menu
            id="sideBarMenu"
            theme="dark"
            defaultSelectedKeys={[defaultPage]}
            items={menus}
            onClick={(value) => {
              navigate("/home/" + value.key);
            }}
          />
        </Sider>
        <Layout>
          <Header>
            <HomeHeader />
          </Header>
          <Content className="home-content">
            <div className="panel">
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default observer(Home);
