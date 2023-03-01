import request from "../utils/request";

export const getCollegeMajorData = async () => {
  return request.post("/server-api/major/college-major");
};

export const saveCollege = async (params: any) => {
  return request.post("/server-api/college/save", params);
};

export const deleteCollege = async (params: any) => {
  return request.post("/server-api/college/deleteById", params);
};

export const updateCollege = async (params: any) => {
  return request.post("/server-api/college/update", params);
};
