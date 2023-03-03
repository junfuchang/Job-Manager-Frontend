import { ResultType } from "./../utils/request";
import { getCollegeMajorData } from "./../api/School";
import { makeAutoObservable } from "mobx";

class SchoolStore {
  //级联选择框：学院-专业
  collegeMajorData:
    | {
        value: number;
        label: string;
        children: Array<object>;
      }
    | undefined
    | null;

  constructor() {
    makeAutoObservable(this);
    this.loadCollegeMajorData();
  }

  *loadCollegeMajorData() {
    if (!this.collegeMajorData) {
      const res: ResultType = yield getCollegeMajorData();
      if (res.code === 200) {
        this.collegeMajorData = res.data;
      } else {
        this.collegeMajorData = undefined;
      }
    }
  }

  async getCollegeMajorData() {
    if (!this.collegeMajorData) {
      await this.loadCollegeMajorData();
    }
    return this.collegeMajorData;
  }
}

export default new SchoolStore();
