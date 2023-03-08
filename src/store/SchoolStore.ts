import { ResultType } from "./../utils/request";
import { getCollegeMajorData } from "./../api/School";
import { makeAutoObservable } from "mobx";
import { stringify } from "querystring";
import { json } from "stream/consumers";

class SchoolStore {
  //级联选择框：学院-专业
  collegeMajorData: any = [];

  constructor() {
    makeAutoObservable(this);
    this.loadCollegeMajorData();
  }

  *loadCollegeMajorData() {
    if (!this.collegeMajorData.length) {
      const res: ResultType = yield getCollegeMajorData();
      if (res.code === 200) {
        this.collegeMajorData = res.data;
        localStorage.setItem("MAJORINFO", JSON.stringify(res.data));
      }
    }
  }

  *getCollegeMajorData() {
    if (this.collegeMajorData.length) {
      return this.collegeMajorData;
    }
    if (JSON.parse(localStorage.getItem("MAJORINFO") ?? "[]").length) {
      return JSON.parse(localStorage.getItem("MAJORINFO") ?? "[]");
    }
    if (!this.collegeMajorData.length) {
      yield this.loadCollegeMajorData();
    }
    return this.collegeMajorData;
  }
}

export default new SchoolStore();
