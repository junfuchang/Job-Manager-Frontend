import request from "../utils/request";

export const selectStudentList = async (pageInfo: any, formParams?: any) => {
  const res = await request.post("/server-api/student/selectStudentList", {
    ...pageInfo,
    ...formParams,
  });
  return {
    total: res?.data?.total ?? 0,
    list: res?.data?.records ?? [],
  };
};

export const updateStudent = async (params: any) => {
  return request.post("/server-api/student/updateStudent", params);
};
