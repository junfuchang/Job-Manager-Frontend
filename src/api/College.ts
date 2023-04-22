import request from "../utils/request";

export const selectCollegeList = async (pageInfo: any, formParams?: any) => {
  const res = await request.post("/server-api/college/selectCollegeList", {
    ...pageInfo,
    ...formParams,
  });
  return {
    total: res?.data?.total ?? 0,
    list: res?.data?.records ?? [],
  };
};

/**
 * college删除
 */
export const deleteCollegeById = async (params: any) => {
  return request.post("/server-api/college/deleteCollegeById", params);
};

/**
 * college更新
 */
export const updateCollege = async (params: any) => {
  return request.post("/server-api/college/updateCollege", params);
};

/**
 * college新增
 */
export const insertCollege = async (params: any) => {
  return request.post("/server-api/college/insertCollege", params);
};
