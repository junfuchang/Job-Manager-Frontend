import { useEffect, useRef } from "react";
import BaseChart from "./base-charts";
import * as echarts from "echarts";

export default function LinnBar(props: any) {
  const { data } = props;

  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

  let unit = "(万亩)";
  const option = {
    backgroundColor: "#0f375f",
    grid: {
      left: "5%",
      right: "3%",
      bottom: "5%",

      containLabel: true,
    },
    tooltip: {
      show: true,
      trigger: "axis",
    },
    xAxis: {
      data: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      axisLabel: {
        //坐标轴标签样式
        color: "#fff",
      },
      axisTick: {
        //刻度线
        show: false,
      },
    },
    yAxis: [
      {
        name: unit,
        nameTextStyle: {
          //坐标轴名字样式
          color: "#fff",
          fontSize: 12,
        },
        splitLine: {
          //网格线
          show: false,
        },
        axisLine: {
          //坐标轴线
          show: true,
        },
        axisLabel: {
          color: "#fff",
        },
      },
      {
        type: "value",
        name: unit,
        nameTextStyle: {
          color: "#fff",
        },
        axisLabel: {
          color: "#fff",
        },
      },
    ],
    series: [
      {
        name: "规划面积",
        type: "bar",
        barWidth: "15", //柱条宽度
        data: [220, 182, 191, 234, 290, 330, 310],

        itemStyle: {
          //图形的样式
          color: {
            //渐变色配置
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(120, 235, 187, 1)", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(172, 244, 220, 0)", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
      {
        name: "建成面积",
        type: "bar",
        barWidth: "15", //柱条宽度
        data: [320, 282, 91, 134, 190, 230, 410],

        itemStyle: {
          //图形的样式
          color: {
            //渐变色配置
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(133, 44, 233, 1)", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(183, 124, 247, 0)", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
      {
        name: "新增面积",
        type: "line",
        yAxisIndex: 1,
        symbolSize: 8,
        data: [1.0, 1.2, 2.3, 3.5, 4.3, 8.2, 10.3, 22.4, 23.0, 14.5, 10.0, 5.2],
        itemStyle: {
          color: "#4574EB",
        },
      },
    ],
  };

  useEffect(() => {
    const rose = new BaseChart({ chartRef: ref, data: option });
    return () => rose.destory();
  }, []);

  return <div ref={ref} style={{ width: "100%", height: "100%" }} />;
}
