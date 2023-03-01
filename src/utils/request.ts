import { message } from "antd";
import axios from "axios";
import loginStore from "../store/LoginStore";

const instance = axios.create({
  timeout: 300000,
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    if (config && config.headers) {
      config.headers["token"] = loginStore.getToken;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    const res = response?.data;
    if (res.code < 200 || res.code > 299) {
      return Promise.reject(res);
    }
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;

export interface ResultType {
  code: number;
  data: any;
  message: string;
}
