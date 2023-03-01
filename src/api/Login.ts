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
  return request.post("/server-api/login/stu-register", params);
};

export const companyRegister = (params: any) => {
  return request.post("/server-api/login/comp-register", params);
};
