import SchoolStore from "./SchoolStore";
import LoginStore from "./LoginStore";
import CommonStore from "./CommonStore";
import VisualStore from "./VisualStore";

class RootStore {
  loginStore;
  schoolStore;
  commonStore;
  visualStore;

  constructor() {
    this.loginStore = LoginStore;
    this.schoolStore = SchoolStore;
    this.commonStore = CommonStore;
    this.visualStore = VisualStore;
  }
}

export const useRootStore = () => {
  return new RootStore();
};
