import request from "../utils/request";

/**
 * Amount 相关
 */

/**
 * Amount列表条件查询
 */
export const selectAmountList = async (pageInfo: any, formParams?: any) => {
  const res = await request.post("/server-api/amount/selectAmountList", {
    ...pageInfo,
    ...formParams,
  });
  return {
    total: res?.data?.total ?? 0,
    list: res?.data?.list ?? [],
  };
};

/**
 * Amount删除
 */
export const deleteAmountById = async (params: any) => {
  return request.post("/server-api/amount/deleteAmountById", params);
};

/**
 * Amount更新
 */
export const updateAmount = async (params: any) => {
  return request.post("/server-api/amount/updateAmount", params);
};

/**
 * Amount新增
 */
export const insertAmount = async (params: any) => {
  return request.post("/server-api/amount/insertAmount", params);
};
