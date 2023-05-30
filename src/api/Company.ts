import request from "../utils/request";

export const selectCompanyList = async (pageInfo: any, formParams?: any) => {
  const res = await request.post("/server-api/company/selectCompanyList", {
    ...pageInfo,
    ...formParams,
  });
  return {
    total: res?.data?.total ?? 0,
    list: res?.data?.records ?? [],
  };
};

export const updateCompany = async (params: any) => {
  return request.post("/server-api/company/updateCompany", params);
};
