import request from "../utils/request";

/**
 * 获取岗位列表
 */
export const selectJobList = async (pageInfo?: any, formParams?: any) => {
  const res = await request.post("/server-api/job/selectJobList", {
    ...pageInfo,
    ...formParams,
  });
  return {
    total: res?.data?.total ?? 0,
    list: res?.data?.records ?? [],
  };
};

/**
 * 新增岗位
 */
export const insertJob = async (params: any) => {
  return request.post("/server-api/job/insertJob", params);
};

/**
 * 删除岗位
 */
export const deleteJob = async (params: any) => {
  return request.post("/server-api/job/deleteJob", params);
};

/**
 * 修改岗位
 */
export const updateJob = async (params: any) => {
  return request.post("/server-api/job/updateJob", params);
};
