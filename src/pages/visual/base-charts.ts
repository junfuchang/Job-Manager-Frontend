import React from "react";
import * as echarts from "echarts";

interface IBaseChart {
  data: any;
  chartRef: React.MutableRefObject<HTMLDivElement>;
}

class BaseChart {
  _data;
  _chartRef;
  private _chart: any;

  constructor(props: IBaseChart) {
    this._data = props.data;
    this._chartRef = props.chartRef;
    this.init();
  }

  public update(data = []) {
    if (data) {
      this._data = data;
    }
    this.init();
  }

  public destory() {
    this._chart.dispose();
  }

  public init() {
    if (this._chartRef.current) {
      this._chart = echarts.init(this._chartRef.current, "chalk");
      this._chart.setOption(this._data);
    }
  }
}

export default BaseChart;
