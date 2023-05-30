import SchoolStore from "./SchoolStore";
import LoginStore from "./LoginStore";
import CommonStore from "./CommonStore";

class RootStore {
  loginStore;
  schoolStore;
  commonStore;

  constructor() {
    this.loginStore = LoginStore;
    this.schoolStore = SchoolStore;
    this.commonStore = CommonStore;
  }
}

export const useRootStore = () => {
  return new RootStore();
};
