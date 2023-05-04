import { useEffect, useRef } from "react";
import BaseChart from "./base-charts";
import * as echarts from "echarts";

export default function CollegeBar({ data = {} }: any) {
  const {
    dataX = [],
    JYData = [],
    SXData = [],
    DYData = [],
    JYRateData = [],
  } = data;

  console.log("data", data);

  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

  const timerRef = useRef<any>();

  const lineColor = "#224824";
  let option = {
    backgroundColor: "#0e1c47",
    title: {
      text: "各学院就业情况统计",
      subtext: "",
      x: "center",
      textStyle: {
        color: "white",
      },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(1, 13, 19, 0.5)",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
      },
      borderWidth: 0,

      textStyle: {
        color: "rgba(212, 232, 254, 1)",
        fontSize: 12,
      },
    },
    legend: {
      show: true,
      right: "10%",
      top: "5%",
      itemWidth: 8,
      itemHeight: 8,
      textStyle: {
        color: "#fff",
      },
    },
    grid: {
      left: "2%",
      right: "5%",
      bottom: "5%",
      top: "20%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: dataX,
        axisLabel: {
          fontSize: "12",
          color: "#fff",
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          //坐标轴轴线相关设置。数学上的x轴
          show: true,
          lineStyle: {
            color: "#fff",
          },
        },
      },
    ],
    yAxis: [
      {
        name: "人",
        nameTextStyle: {
          color: "#fff",
          fontSize: 12,
        },
        minInterval: 1,
        type: "value",
        splitLine: {
          lineStyle: {
            color: lineColor,
            type: "dashed",
          },
        },
        //设置横线样式
        // axisLine: {
        //     show: true,
        //     lineStyle: {
        //         color: lineColor,
        //     },
        // },
        axisLabel: {
          fontSize: "12",
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
    dataZoom: [
      //给x轴设置滚动条
      {
        start: 0, //默认为0
        end: 100 - 1500 / 31, //默认为100
        type: "slider",
        show: true,
        xAxisIndex: [0],
        handleSize: 10, //滑动条的 左右2个滑动条的大小
        height: 13, //组件高度
        left: 50, //左边的距离
        right: 40, //右边的距离
        bottom: 0, //右边的距离
        handleColor: "#ddd", //h滑动图标的颜色
        handleStyle: {
          borderColor: "#cacaca",
          borderWidth: "1",
          shadowBlur: 2,
          background: "#ddd",
          shadowColor: "#ddd",
        },
        fillerColor: "#808080",
        backgroundColor: "#ddd", //两边未选中的滑动条区域的颜色
        showDataShadow: false, //是否显示数据阴影 默认auto
        showDetail: false, //即拖拽时候是否显示详细数值信息 默认true
        handleIcon:
          "M-292,322.2c-3.2,0-6.4-0.6-9.3-1.9c-2.9-1.2-5.4-2.9-7.6-5.1s-3.9-4.8-5.1-7.6c-1.3-3-1.9-6.1-1.9-9.3c0-3.2,0.6-6.4,1.9-9.3c1.2-2.9,2.9-5.4,5.1-7.6s4.8-3.9,7.6-5.1c3-1.3,6.1-1.9,9.3-1.9c3.2,0,6.4,0.6,9.3,1.9c2.9,1.2,5.4,2.9,7.6,5.1s3.9,4.8,5.1,7.6c1.3,3,1.9,6.1,1.9,9.3c0,3.2-0.6,6.4-1.9,9.3c-1.2,2.9-2.9,5.4-5.1,7.6s-4.8,3.9-7.6,5.1C-285.6,321.5-288.8,322.2-292,322.2z",
        filterMode: "filter",
      },
      //下面这个属性是里面拖到
      {
        type: "inside",
        show: true,
        xAxisIndex: [0],
        start: 0, //默认为1
        end: 100 - 1500 / 31, //默认为100
      },
    ],
    series: [
      {
        name: "就业",
        type: "bar",
        stack: "college",
        data: JYData,
        barWidth: 8,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#3366FF",
            },
            {
              offset: 1,
              color: "rgba(42, 193, 216, 0)",
            },
          ]),
        },
      },
      {
        name: "升学",
        type: "bar",
        stack: "college",
        data: SXData,
        barWidth: 16,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#00FF99",
            },
            {
              offset: 1,
              color: "rgba(241, 173, 84, 0)",
            },
          ]),
        },
      },
      {
        name: "待业",
        type: "bar",
        stack: "college",
        data: DYData,
        barWidth: 16,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(241, 173, 84, 1)",
            },
            {
              offset: 1,
              color: "rgba(241, 173, 84, 0)",
            },
          ]),
        },
      },
      {
        name: "就业率",
        type: "line",
        yAxisIndex: 1,
        symbolSize: 8,
        data: JYRateData,
        itemStyle: {
          color: "#4574EB",
        },
      },
    ],
  };

  useEffect(() => {
    const myChartClass = new BaseChart({ chartRef: ref, data: option });
    const myChart: any = myChartClass.getChart();
    myChartClass.update(option as any);
    myChart.on("mouseover", stop);
    myChart.on("mouseout", goMove);
    autoMove();
    function autoMove() {
      timerRef.current = setInterval(() => {
        if (Number(option.dataZoom[0].end) > 100) {
          option.dataZoom[0].end = 20;
          option.dataZoom[0].start = 0;
        } else {
          option.dataZoom[0].end =
            option.dataZoom[0].end +
            1 * (100 / option.series[0].data?.length ?? 1);
          option.dataZoom[0].start =
            option.dataZoom[0].start +
            1 * (100 / option.series[0].data?.length ?? 1);
        }
        myChartClass.update(option as any);
      }, 3500);
    }
    //停止滚动
    function stop() {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    //继续滚动
    function goMove() {
      autoMove();
    }

    return () => {
      stop();
      myChartClass.destory();
    };
  }, [data]);

  return <div ref={ref} style={{ width: "100%", height: "100%" }} />;
}
