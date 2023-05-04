import { log } from "console";
import { makeAutoObservable } from "mobx";

export interface MenuList {
  menuId: number;
  menuName: string;
  menuUrl: string;
  pathName: string;
  componentPath: string;
  menuImgClass: string;
  parentId: number;
  menuState: number;
  isContainChildren: boolean;
  menuChilds: Array<MenuList> | [];
}

class LoginStore {
  constructor() {
    makeAutoObservable(this);
  }

  token: string | undefined;
  userInfo: any;
  roleInfo: any;
  menuInfo: any;
  routePath = this.getMenuInfo?.[0]?.key ?? "overview";

  /**
   * 登陆时设置用户及Token信息
   * @param data
   */
  setLogin(data: {
    userInfo: any;
    roleInfo?: any;
    token: string;
    menuInfo: Array<MenuList> | [];
  }) {
    this.setLogout();

    this.userInfo = data.userInfo;
    this.roleInfo = data?.roleInfo ?? {};
    this.token = data.token;
    this.menuInfo = data.menuInfo;

    localStorage.setItem("TOKEN", data.token);
    localStorage.setItem("MENUINFO", JSON.stringify(data.menuInfo));
    localStorage.setItem("USERINFO", JSON.stringify(data.userInfo));
    localStorage.setItem("ROLEINFO", JSON.stringify(data.roleInfo));
  }

  /**
   * 退出登陆时信息进行清空
   */
  setLogout() {
    this.userInfo = null;
    this.roleInfo = null;
    this.token = undefined;
    this.menuInfo = undefined;
    this.routePath = "overview";

    localStorage.removeItem("TOKEN");
    localStorage.removeItem("MENUINFO");
    localStorage.removeItem("USERINFO");
    localStorage.removeItem("ROLEINFO");
    localStorage.removeItem("routePath");
  }

  /**
   * 获取Token
   */
  get getToken() {
    return this.token ?? localStorage.getItem("TOKEN") ?? undefined;
  }

  /**
   * 获取MenuInfo
   */
  get getMenuInfo() {
    return (
      this.menuInfo ??
      JSON.parse(localStorage.getItem("MENUINFO") ?? "[]") ??
      []
    );
  }

  /**
   * 获取UserInfo
   */
  get getUserInfo() {
    return (
      this.userInfo ??
      JSON.parse(localStorage.getItem("USERINFO") ?? "{}") ??
      ""
    );
  }

  /**
   * 获取RoleInfo
   */
  get getRoleInfo() {
    return (
      this.roleInfo ??
      JSON.parse(localStorage.getItem("ROLEINFO") ?? "{}") ??
      ""
    );
  }
  setRoleInfo(info: Object) {
    const newRoleInfo = { ...this.getRoleInfo, ...info } ?? {};
    this.roleInfo = newRoleInfo;
    localStorage.setItem("ROLEINFO", JSON.stringify(newRoleInfo));
  }

  /**
   * routePath
   */
  setRoutePath(route: string) {
    localStorage.setItem("routePath", route);
    this.routePath = route;
  }
  get getRoutePath() {
    if (localStorage.getItem("routePath"))
      return localStorage.getItem("routePath");
    return this.routePath;
  }
}

export default new LoginStore();
