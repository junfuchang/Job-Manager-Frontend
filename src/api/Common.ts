import request from "../utils/request";

export const getZheJiangMapJson = () => {
  return request.get(
    "https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=330000_full"
  );
};

export const fetchCityData = () => {
  return request.get("https://unpkg.com/china-location/dist/location.json");
};

export const getOverviewInfo = async () => {
  const res = await request.post("/server-api/overview/info");
  return res?.data ?? {};
};

export const getOverviewMap = async (params: any) => {
  const res = await request.post("/server-api/overview/map", params);
  return res?.data ?? {};
};

export const getOverviewDetailNum = async (params: any) => {
  const res = await request.post("/server-api/overview/detailNum", params);
  return res?.data ?? {};
};
