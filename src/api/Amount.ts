import request from "../utils/request";

// Amount列表
export const getAmountList = async (pageInfo: any, formParams?: any) => {
  const res = await request.post("/server-api/amount/getAmountList", {
    ...pageInfo,
    ...formParams,
  });
  return {
    total: res.data.size,
    list: res.data.records,
  };
};

export const saveUser = async (params: any) => {
  return request.post("/server-api/user/save", params);
};

export const deleteUser = async (params: any) => {
  return request.post("/server-api/user/deleteById", params);
};

export const updateUser = async (params: any) => {
  return request.post("/server-api/user/update", params);
};
