import { makeAutoObservable } from "mobx";

export interface MenuList {
  menuId: number;
  menuName: string;
  menuUrl: string;
  pathRoute: string;
  pathname: string;
  componentPath: string;
  menuImgClass: string;
  parentId: number;
  menuState: number;
  isContainChildren: boolean;
  menuChilds: Array<MenuList> | [];
}

class LoginStore {
  token: string | undefined;
  userInfo: any;
  menuInfo: any;

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * 登陆时设置用户及Token信息
   * @param data
   */
  setLogin(data: {
    userInfo: any;
    token: string;
    menuInfo: Array<MenuList> | [];
  }) {
    this.userInfo = data.userInfo;
    this.token = data.token;
    this.menuInfo = data.menuInfo;
    console.log("this.menuInfo", this.menuInfo);

    localStorage.setItem("TOKEN", data.token);
    localStorage.setItem("MENUINFO", JSON.stringify(data.menuInfo));
  }

  /**
   * 退出登陆时信息进行清空
   */
  setLogout() {
    this.userInfo = null;
    this.token = undefined;
    this.menuInfo = undefined;
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("SAVE_USER");
    localStorage.removeItem("MENUINFO");
  }

  /**
   * 获取Token
   */
  get getToken() {
    return this.token ?? localStorage.getItem("TOKEN") ?? undefined;
  }

  get getMenuInfo() {
    return (
      this.menuInfo ??
      JSON.parse(localStorage.getItem("MENUINFO") || "[]") ??
      []
    );
  }
}

export default new LoginStore();
