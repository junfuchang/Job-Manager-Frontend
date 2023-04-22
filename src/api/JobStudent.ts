import request from "../utils/request";

/**
 * 是否提交过岗位
 */
export const alreadySubmitJob = async (params: any) => {
  const res = await request.post(
    "/server-api/job-student/alreadySubmitJob",
    params
  );
  return {
    already: res?.data ?? false,
    feedback: res?.data?.feedback ?? 0,
    date: res?.data?.date,
  };
};

/**
 * 提交岗位
 */
export const submitJob = async (params: any) => {
  return request.post("/server-api/job-student/submitJob", params);
};

/**
 * 取消提交岗位
 */
export const cancelJob = async (params: any) => {
  return request.post("/server-api/job-student/cancelJob", params);
};

/**
 * 获取提交过的岗位列表
 */
export const selectJobStudentList = async (pageInfo: any, formParams?: any) => {
  const res = await request.post(
    "/server-api/job-student/selectJobStudentList",
    {
      ...pageInfo,
      ...formParams,
    }
  );
  return {
    total: res?.data?.total ?? 0,
    list: res?.data?.records ?? [],
  };
};

/**
 * 岗位通过
 */
export const jobPass = async (params: any) => {
  return request.post("/server-api/job-student/jobPass", params);
};

/**
 * 岗位被拒
 */
export const jobReject = async (params: any) => {
  return request.post("/server-api/job-student/jobReject", params);
};
