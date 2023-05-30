import LoginStore from "../store/LoginStore";

export const logout = () => {
  LoginStore.setLogout();
  localStorage.removeItem("TOKEN");
  window.location.replace("/login");
};
