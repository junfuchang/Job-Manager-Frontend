import request from "../utils/request";

export const selectMajorList = async (pageInfo: any, formParams?: any) => {
  const res = await request.post("/server-api/major/selectMajorList", {
    ...pageInfo,
    ...formParams,
  });
  return {
    total: res?.data?.total ?? 0,
    list: res?.data?.records ?? [],
  };
};

/**
 * major删除
 */
export const deleteMajorById = async (params: any) => {
  return request.post("/server-api/major/deleteMajorById", params);
};

/**
 * major更新
 */
export const updateMajor = async (params: any) => {
  return request.post("/server-api/major/updateMajor", params);
};

/**
 * major新增
 */
export const insertMajor = async (params: any) => {
  return request.post("/server-api/major/insertMajor", params);
};
