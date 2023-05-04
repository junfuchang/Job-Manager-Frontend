import { log } from "console";
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

/**
 * college - visual 获取各学院就业消息
 */
export const selectRateData = async () => {
  const res = await request.post("/server-api/collegeDetail/selectRateData");
  if (res?.data) {
    const tempObj: any = {};
    res?.data?.forEach((i: any) => {
      if (!tempObj.hasOwnProperty(i.name)) {
        tempObj[i.name] = {};
      }
      tempObj[i.name][i.directionType] = i.directionCount;
    });
    const arr = Object.entries(tempObj);

    return {
      dataX: arr.map((i) => i[0]),
      SXData: arr.map((i: any) => i[1][0] ?? 0),
      JYData: arr.map((i: any) => i[1][1] ?? 0),
      DYData: arr.map((i: any) => i[1][2] ?? 0),
      JYRateData: arr.map((i: any) => {
        const a = i[1][0] ?? 0;
        const b = i[1][1] ?? 0;
        const c = i[1][2] ?? 0;

        return Math.round(((a + b) / (a + b + c)) * 100);
      }),
    };
  }
  return {};
};
