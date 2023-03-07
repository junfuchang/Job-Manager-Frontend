import React, { useEffect, useRef } from "react";
import BaseChart from "./base-charts";
import * as echarts from "echarts";
import { EChartsOption } from "echarts";

interface IBar {
  xAxisData?: string[];
  title?: string;
  barSize?: Array<number | string>;
  extraYAxis?: any[];
  gridData?: any;
  legendData?: any;
  seriesData: any;
  xAxisConfig?: any;
  toolTip?: any;
  xAxisType?: "category" | "value";
  yAxisType?: "category" | "value";
  yAxisData?: any;
  yAxisConfig?: any;
}

// 折线图，柱状图
const Bar: React.FC = (props) => {
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  // const {
  //   xAxisData,
  //   title,
  //   xAxisConfig,
  //   barSize = ["100%", "100%"],
  //   gridData,
  //   legendData,
  //   extraYAxis = [],
  //   seriesData = [],
  //   toolTip,
  //   xAxisType,
  //   yAxisType,
  //   yAxisData,
  //   yAxisConfig,
  // } = props;

  const GRAYFONT = "rgba(255, 255, 255, 0.8)";
  const LINE_COLOR = "rgba(255, 255, 255, 0.1)";

  // const data1 = {
  //   title: {
  //     text: title ?? "单位：港元",
  //     textStyle: {
  //       color: GRAYFONT,
  //       fontSize: 14,
  //       fontWeight: "normal",
  //     },
  //   },
  //   tooltip: toolTip,
  //   grid: {
  //     left: "10%",
  //     top: "20%",
  //     right: "2%",
  //     bottom: "15%",
  //     ...gridData,
  //   },
  //   legend: {
  //     show: true,
  //     right: "2%",
  //     itemWidth: 8,
  //     icon: "circle",
  //     textStyle: {
  //       fontSize: 14,
  //       color: GRAYFONT,
  //     },
  //     ...legendData,
  //   },
  //   xAxis: {
  //     type: xAxisType || "category",
  //     axisTick: { show: false },
  //     axisLabel: {
  //       textStyle: {
  //         fontSize: 14,
  //         color: GRAYFONT,
  //       },
  //     },
  //     ...xAxisConfig,
  //     data: xAxisData ?? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  //   },
  //   yAxis: [
  //     {
  //       data: yAxisData || undefined,
  //       type: yAxisType || "value",
  //       axisLabel: {
  //         textStyle: {
  //           color: GRAYFONT,
  //         },
  //       },
  //       splitLine: {
  //         lineStyle: {
  //           color: LINE_COLOR,
  //           type: [4, 6],
  //           // dashOffset: 5
  //         },
  //       },
  //       ...yAxisConfig,
  //     },
  //     ...extraYAxis,
  //   ],
  //   series: [...seriesData],
  // };

  let dataX = ["衣服", "家居", "百货", "五金", "运动", "玩具", "其他"];
  let dataY = [31, 20, 20, 10, 20, 19.6, 32];
  let dataY1 = [13, 15, 17, 12.8, 13, 21.2, 26.9];
  var data = {
    title: {
      text: "单位：港元",
      textStyle: {
        color: GRAYFONT,
        fontSize: 14,
        fontWeight: "normal",
      },
    },
    backgroundColor: "#0D2753",
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(1, 13, 19, 0.5)",
      borderWidth: 0,
      padding: 2,
      textStyle: {
        color: "#fff",
        fontSize: 15,
      },
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      top: "10%",
      bottom: "10%",
      left: "5%",
      right: "5%",
      containLabel: true,
    },
    legend: {
      data: ["销售笔数", "客单价"],
      left: "350",
      top: "10",
      textStyle: {
        padding: [4, 0, 0, 0],
        color: "33FFFF",
      },
      itemWidth: 15,
      itemHeight: 10,
      itemGap: 10,
    },
    xAxis: {
      type: "category",
      data: dataX,
      axisLine: {
        lineStyle: {
          color: "rgba(66, 192, 255, .3)",
        },
      },

      axisLabel: {
        //x轴文字倾斜设置
        rotate: 0,
        textStyle: {
          color: "#FFFF",
        },
      },
    },

    yAxis: [
      {
        type: "value",

        splitLine: {
          show: false,
        },
        axisLabel: {
          textStyle: {
            color: "#fff",
          },
        },
        // axisLine: {
        //     lineStyle: {
        //         fontSize:0,
        //         color: 'rgba(66, 192, 255, .3)',
        //     },
        // },
      },
      {
        type: "value",
        // name: '(%)',
        // nameTextStyle: {
        //     color: '#d2d2d2',
        // },
        max: "50",
        min: "0",
        scale: true,
        position: "right",
        // axisLine: {
        //     lineStyle: {
        //         color: '#fff',
        //     },
        // },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: true,
          formatter: "{value} 元", //右侧Y轴文字显示
          textStyle: {
            fontSize: 12,
            color: "#FFF",
          },
        },
      },
    ],
    series: [
      {
        name: "销售笔数",
        type: "bar",
        barWidth: "13px",
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#29acff",
              },
              {
                offset: 1,
                color: "#4bdfff",
              },
            ]),
            barBorderRadius: 8,
          },
        },
        data: dataY1,
      },
      {
        name: "客单价",
        type: "line",

        markPoint: {
          label: {
            show: true,
            position: "top",
            distance: 15,
            offset: [1, 1],
            lineHeight: 20,
            backgroundColor: "#ff6040",
            borderRadius: 6,
            borderColor: "#ffa000",
            borderWidth: "3",
            padding: [4, 3, 4],
            color: "#fff",
            fontSize: 12,
            fontWeight: "normal",
          },
          symbol: "arrow",
          symbolSize: 10.5,
          symbolOffset: [0, -2],
          data: [
            {
              //   type: 'average',
              name: "平均值",
              value: "平均客单价21.8元",
              xAxis: 3,
              yAxis: 23,
            },
          ],
        },
        markLine: {
          symbol: "none",
          data: [{ type: "average", name: "平均值" }],
          label: { show: false },
        },
        yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
        smooth: false, //平滑曲线显示

        symbol: "circle", //标记的图形为实心圆
        symbolSize: 9, //标记的大小
        itemStyle: {
          normal: {
            color: "#ff8020",
            borderColor: "#fff", //圆点透明 边框
            borderWidth: 2,
          },
        },
        lineStyle: {
          color: "#ffa43a",
        },

        data: dataY,
      },
    ],
  };

  // useEffect(() => {
  //   const bar = new BaseChart({ chartRef: ref, data });
  //   return () => bar.destory();
  // }, [seriesData, xAxisData]);

  useEffect(() => {
    const bar = new BaseChart({ chartRef: ref, data });
    return () => bar.destory();
  }, []);

  // return <div ref={ref} style={{ width: barSize[0], height: barSize[1] }} />;
  return <div ref={ref} style={{ width: "100%", height: "100%" }} />;
};

export default Bar;
