import request from "../utils/request";

export const login = (params: {
  username: string;
  password: string;
  remember?: boolean;
  prePassword: string;
}) => {
  return request.post("/server-api/login", params);
};

export const studentRegister = (params: any) => {
  return request.post("/server-api/login/studentRegister", params);
};

export const companyRegister = (params: any) => {
  return request.post("/server-api/login/companyRegister", params);
};

export const adminRegister = (params: any) => {
  return request.post("/server-api/login/adminRegister", params);
};
