import SchoolStore from "./SchoolStore";
import LoginStore from "./LoginStore";

class RootStore {
  loginStore;
  schoolStore;

  constructor() {
    this.loginStore = LoginStore;
    this.schoolStore = SchoolStore;
  }
}

export const useRootStore = () => {
  return new RootStore();
};
