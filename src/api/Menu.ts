import request from "../utils/request";

/**
 * Amount 相关
 */

/**
 * Amount列表条件查询
 */
export const selectMenuList = async (pageInfo: any, formParams?: any) => {
  const res = await request.post("/server-api/menu/selectMenuList", {
    ...pageInfo,
    ...formParams,
  });
  return {
    total: res?.data?.total ?? 0,
    list: res?.data?.records ?? [],
  };
};

/**
 * Menu更新
 */
export const updateMenu = async (params: any) => {
  return request.post("/server-api/menu/updateMenu", params);
};
