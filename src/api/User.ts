import request from "../utils/request";

// 用户列表

export const saveUser = async (params: any) => {
  return request.post("/server-api/user/save", params);
};

export const deleteUser = async (params: any) => {
  return request.post("/server-api/user/deleteById", params);
};

export const updateUser = async (params: any) => {
  return request.post("/server-api/user/update", params);
};

export const getUserBySearch = async (pageInfo: any, formParams?: any) => {
  const res = await request.post("/server-api/user/getUserBySearch", {
    ...pageInfo,
    ...formParams,
  });
  return {
    total: res.data.size,
    list: res.data.records,
  };
};
