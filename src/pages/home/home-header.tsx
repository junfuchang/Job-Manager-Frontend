import React from "react";
import { useBoolean } from "ahooks";
import { Modal, Form, Input, Button, Dropdown, MenuProps, message } from "antd";
import { SettingFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useRootStore } from "../../store/RootStore";
import "./index.scss";
import UpdatePassword from "../../components/update-password";

interface HomeHeaderProps {}

const items: MenuProps["items"] = [
  {
    label: "修改密码",
    key: "update-password",
  },
  {
    label: "退出登录",
    key: "logout",
  },
];

const HomeHeader: React.FC = (props: HomeHeaderProps) => {
  const { loginStore } = useRootStore();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [showModal, { toggle: toggleModal }] = useBoolean(false);

  const onClick: MenuProps["onClick"] = ({ key }) => {
    switch (key) {
      case "logout":
        logout();
        break;
      case "update-password":
        toggleModal();
        break;
      default:
        message.error(`未知选项，请重新选择！`);
        break;
    }
  };

  const confirmUpdate = () => {
    console.log("form", form.getFieldValue);
  };

  const logout = () => {
    loginStore.setLogout();
    localStorage.removeItem("TOKEN");
    navigate("/login");
  };

  return (
    <>
      <div className="home-header">
        <Dropdown menu={{ items, onClick }}>
          <a onClick={(e) => e.preventDefault()}>
            <SettingFilled />
          </a>
        </Dropdown>
      </div>

      <Modal
        className="edit-pwd-modal"
        title="修改密码"
        width={420}
        open={showModal}
        maskClosable={false}
        footer={null}
        onCancel={toggleModal}
      >
        <UpdatePassword />
        {/* <Form
          name="edit-pwd-form"
          form={form}
          autoComplete="off"
          layout="vertical"
        >
          <div className="form-content">
            <Form.Item
              name="password"
              label="新密码"
              rules={[{ required: true }]}
            >
              <Input.Password
                placeholder="请输入密码"
                allowClear
                autoComplete="off"
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="确认密码"
              // rules={[{ required: true }, { validator: passwordValidator }]}
            >
              <Input.Password
                placeholder="请再次输入密码"
                allowClear
                autoComplete="off"
              />
            </Form.Item>
          </div>
          <Form.Item noStyle className="footer-item">
            <div className="item-button">
              <Button type="primary" block onClick={confirmUpdate}>
                确认
              </Button>
            </div>
          </Form.Item>
        </Form> */}
      </Modal>
    </>
  );
};

export default HomeHeader;
