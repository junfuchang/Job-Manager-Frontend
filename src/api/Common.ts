import request from "../utils/request";

export const getZheJiangMapJson = () => {
  return request.get(
    "https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=330000_full"
  );
};

export const fetchCityData = () => {
  return request.get("https://unpkg.com/china-location/dist/location.json");
};
