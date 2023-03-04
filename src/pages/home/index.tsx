import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { useBoolean } from "ahooks";
import { createFromIconfontCN } from "@ant-design/icons";
import "./index.scss";
import { Link, Outlet, useNavigate } from "react-router-dom";
import HomeHeader from "./home-header";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../store/RootStore";
import { MenuList } from "../../store/LoginStore";

const { Header, Sider, Content } = Layout;

function bindMenu(menuList: MenuList[] = []) {
  let arr: any = [];
  // eslint-disable-next-line array-callback-return
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

  return (
    <>
      <Layout className="home-page">
        <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed}>
          <div className="home-icon"></div>
          <Menu
            id="sideBarMenu"
            theme="dark"
            defaultSelectedKeys={[menus?.[0]?.key ?? "overview"]}
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
