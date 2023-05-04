import { selectRateData } from "../api/College";
import { ResultType } from "./../utils/request";
import { makeAutoObservable } from "mobx";

class VisualStore {
  //学院消息
  collegeRateData: any = {};

  constructor() {
    makeAutoObservable(this);
    this.loadCollegeRateData();
  }

  *loadCollegeRateData() {
    if (!Object.keys(this.collegeRateData).length) {
      const res: ResultType = yield selectRateData();
      if (res.code === 200) {
        if (res?.data) {
          const tempObj: any = {};
          res?.data?.forEach((i: any) => {
            console.log(i);
            if (!tempObj.hasOwnProperty(i.name)) {
              tempObj[i.name] = {};
            }
            tempObj[i.name][i.directionType] = i.directionCount;
          });
          const arr = Object.entries(tempObj);

          this.collegeRateData = {
            dataX: arr.map((i) => i[0]),
            SXData: arr.map((i: any) => i[1][0] ?? 0),
            JYData: arr.map((i: any) => i[1][1] ?? 0),
            DYData: arr.map((i: any) => i[1][2] ?? 0),
            JYRateData: arr.map(
              (i: any) =>
                ((i[1][0] ?? 0 + i[1][1] ?? 0) /
                  (i[1][0] ?? 0 + i[1][1] ?? 0 + i[1][2] ?? 0)) *
                100
            ),
          };
        }

        localStorage.setItem(
          "COLLEGERATEDATA",
          JSON.stringify(this.collegeRateData)
        );
      }
    }

    console.log("COLLEGERATEDATA", this.collegeRateData);
  }

  *getCollegeRateData() {
    if (Object.keys(this.collegeRateData).length) {
      return this.collegeRateData;
    }
    if (
      Object.keys(JSON.parse(localStorage.getItem("COLLEGERATEDATA") ?? "{}"))
        .length
    ) {
      return JSON.parse(localStorage.getItem("COLLEGERATEDATA") ?? "{}");
    }
    if (!Object.keys(this.collegeRateData).length) {
      yield this.loadCollegeRateData();
    }
    return this.collegeRateData;
  }
}

export default new VisualStore();
