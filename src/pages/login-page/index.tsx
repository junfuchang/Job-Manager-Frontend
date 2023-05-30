import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useRequest } from "ahooks";
import md5 from "md5";
import { Register } from "./register";
import { login } from "../../api/Login";
import { useRootStore } from "../../store/RootStore";
import "./index.scss";

const LoginPage: React.FC = () => {
  const { loginStore } = useRootStore();
  const navigate = useNavigate();
  const form = useRef<any>();

  const { loading, runAsync: requestLogin } = useRequest(login, {
    manual: true,
    onSuccess: (result, param) => {
      loginStore.setLogin(result.data);
      if (param[0].remember) {
        param[0].password = param[0].prePassword;

        localStorage.setItem("SAVE_USER", JSON.stringify(param[0]));
      } else {
        localStorage.removeItem("SAVE_USER");
      }
      message.success("登陆成功");
      navigate("/home/overview");
    },
    onError: (result) => {
      message.error(result.message);
    },
  });

  // 登录
  async function userLogin(form: any) {
    const password = md5(form.password); // e10adc3949ba59abbe56e057f20f883e    => 123456
    requestLogin({
      username: form.username,
      password: password,
      remember: form.remember,
      prePassword: form.password,
    });
  }

  return (
    <>
      <div className="login-page">
        <div className="login-panel">
          <h1 className="welcome">欢迎来到</h1>
          <p className="tip">就业信息管理平台</p>
          <Form
            name="login-form"
            ref={form}
            className="login-form"
            onFinish={userLogin}
            initialValues={{
              ...JSON.parse(localStorage.getItem("SAVE_USER") as string),
              remember: true,
            }}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: "请输入用户名！" }]}
            >
              <Input placeholder="用户名" allowClear />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "请输入密码！" }]}
            >
              <Input.Password
                placeholder="密码"
                allowClear
                autoComplete="off"
              />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <div>
                <Checkbox className="remember" defaultChecked>
                  记住密码
                </Checkbox>
                <Register />
              </div>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
