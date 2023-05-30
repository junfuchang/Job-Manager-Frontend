import { useEffect, useRef } from "react";
import BaseChart from "./base-charts";
import * as echarts from "echarts";

export default function LinnBar(props: any) {
  const { data } = props;

  let dataX: any = [];
  let dataJY: any = [];
  let dataBY: any = [];
  let dataRate: any = [];

  if (data) {
    Object.entries(data)
      .sort()
      .map((i: any) => {
        dataX.push(i[0]);
        dataJY.push(i[1]?.jyCount);
        dataBY.push(i[1]?.totalCount);
        dataRate.push(
          Math.round(((i[1]?.jyCount ?? 0) / (i[1]?.totalCount ?? 1)) * 10000) /
            100
        );
      });
  }

  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

  const option = {
    backgroundColor: "#0f375f",
    title: {
      text: "近三年全校就业情况",
      subtext: "",
      x: "center",
      textStyle: {
        color: "white",
      },
    },
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
      data: dataX,
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
        name: "人数",
        minInterval: 1,
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
        name: "就业率",
        min: 0,
        max: 100,
        minInterval: 1,
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
        name: "就业与升学人数",
        type: "bar",
        barWidth: "15", //柱条宽度
        data: dataJY,

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
        name: "该年毕业人数",
        type: "bar",
        barWidth: "15", //柱条宽度
        data: dataBY,

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
        name: "就业率",
        type: "line",
        yAxisIndex: 1,
        symbolSize: 8,
        data: dataRate,
        itemStyle: {
          color: "#4574EB",
        },
        label: {
          show: true, //开启显示
          position: "right", //在上方显示
          formatter: "{c}%", //显示百分号
          textStyle: {
            //数值样式
            color: "white", //字体颜色
            fontSize: 16, //字体大小
          },
        },
      },
    ],
  };

  useEffect(() => {
    const rose = new BaseChart({ chartRef: ref, data: option });
    return () => rose.destory();
  }, [data]);

  return <div ref={ref} style={{ width: "100%", height: "100%" }} />;
}
