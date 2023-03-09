import { fetchCityData } from "../api/Common";
import { ResultType } from "./../utils/request";
import { makeAutoObservable } from "mobx";

const transform: any = (data = {}) => {
  return Object.entries(data).reduce((buf: any, [key, value]) => {
    if (typeof value === "string")
      return buf.concat({
        label: value,
        value: key,
      });
    const { name, code, cities, districts } = value as any;
    const _cities = transform(cities);
    const _districts = transform(districts);
    return buf.concat({
      label: name,
      value: code,
      children: _cities.length
        ? _cities
        : _districts.length
        ? _districts
        : undefined,
    });
  }, []);
};

class CommonStore {
  cityData: any = [];

  constructor() {
    makeAutoObservable(this);
    this.loadCityData();
  }

  *loadCityData() {
    if (!this.cityData.length) {
      const res: ResultType = yield fetchCityData();
      if (res !== undefined) {
        this.cityData = transform(res);
      }
    }
  }

  *getCityData() {
    if (this.cityData.length) {
      return this.cityData;
    }
    if (!this.cityData.length) {
      yield this.loadCityData();
    }
    return this.cityData;
  }
}

export default new CommonStore();
