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

  public getChart() {
    return this._chart;
  }

  public init() {
    if (this._chartRef.current) {
      this._chart = echarts.init(this._chartRef.current, "chalk");
      this._chart.setOption(this._data);

      // 大小自适应
      if (this._chartRef.current?.parentElement) {
        this._chartRef.current.parentElement.onresize = () => {
          this._chart.resize();
        };
      }

      window.onresize = () => {
        this._chart.resize();
      };
    }
  }
}

export default BaseChart;
