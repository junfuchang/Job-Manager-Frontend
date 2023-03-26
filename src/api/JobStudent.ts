import request from "../utils/request";

/**
 * 是否提交过岗位
 */
export const alreadySubmitJob = async (params: any) => {
  const res = await request.post(
    "/server-api/job-student/alreadySubmitJob",
    params
  );
  return res?.data ?? false;
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
