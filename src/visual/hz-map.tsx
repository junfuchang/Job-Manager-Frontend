import React, { useEffect, useRef } from "react";
import BaseChart from "./base-charts";
import * as echarts from "echarts";
import geoJson from "./hz-map-json.json";

echarts.registerMap("zhejiang", geoJson as any);

let max = 480,
  min = 9;
let maxSize4Pin = 100,
  minSize4Pin = 20;

type IGeoCoordMap = Record<string, number[]>;
let geoCoordMap: IGeoCoordMap = {
  上城区: [120.171465, 30.250236],
  拱墅区: [120.150053, 30.314697],
  西湖区: [120.147376, 30.272934],
  滨江区: [120.21062, 30.206615],
  萧山区: [120.27069, 30.162932],
  余杭区: [119.978959, 30.27365],
  富阳区: [119.949869, 30.049871],
  临安区: [119.715101, 30.231153],
  钱塘区: [120.493972, 30.322904],
  临平区: [120.299376, 30.419025],
  桐庐县: [119.685045, 29.797437],
  淳安县: [119.044276, 29.604177],
};
let data = [
  { name: "上城区", value: 199 },
  { name: "拱墅区", value: 39 },
  { name: "西湖区", value: 152 },
  { name: "滨江区", value: 299 },
  { name: "萧山区", value: 89 },
  { name: "余杭区", value: 52 },
  { name: "富阳区", value: 9 },
  { name: "临安区", value: 352 },
  { name: "钱塘区", value: 99 },
  { name: "临平区", value: 39 },
  { name: "桐庐县", value: 480 },
  { name: "淳安县", value: 40 },
];

let convertData = (data: any) => {
  let res = [];
  for (let i = 0; i < data.length; i++) {
    let geoCoord = geoCoordMap[data[i].name];
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value),
      });
    }
  }
  return res;
};

const ZjMap: React.FC = (props) => {
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

  const option: any = {
    backgroundColor: "#1D346F",
    title: {
      text: "毕业生杭州市就业分布",
      subtext: "",
      x: "center",
      textStyle: {
        color: "#ccc",
      },
    },
    tooltip: {
      trigger: "item",
      formatter: function (params: any) {
        if (typeof params.value[2] == "undefined") {
          return params.name + " : " + params.value;
        } else {
          return params.name + " : " + params.value[2];
        }
      },
    },
    visualMap: {
      show: false,
      min: 0,
      max: 500,
      left: "left",
      top: "bottom",
      text: ["高", "低"], // 文本，默认为数值文本
      calculable: true,
      seriesIndex: [1],
      inRange: {
        color: ["#1488CC", "#2B32B2"], // 浅蓝
      },
    },
    geo: {
      show: true,
      map: "zhejiang",
      roam: true,
      emphasis: {
        areaColor: "#2a333d",
        itemStyle: {
          areaColor: "#1D346F",
          borderWidth: 0,
          shadowColor: "#23074d",
          shadowBlur: 30,
          shadowOffsetX: -2,
          shadowOffsetY: 5,
        },
        label: {
          show: false,
        },
      },
    },
    series: [
      {
        type: "map",
        map: "zhejiang",
        geoIndex: 0,
        aspectScale: 0.75, //长宽比
        showLegendSymbol: false, // 存在legend时显示
        roam: true,
        emphasis: {
          areaColor: "#0f2c70",
          itemStyle: {
            areaColor: "#1D346F",
            borderColor: "#D79D3D",
          },
          label: {
            show: false,
            color: "#fff",
          },
        },
        zoom: 3,
        animation: true,
        data: data,
      },
      {
        name: "点",
        type: "scatter",
        coordinateSystem: "geo",
        symbol: "pin",
        symbolSize: function (val: any) {
          let a = (maxSize4Pin - minSize4Pin) / (max - min);
          let b = minSize4Pin - a * min;
          b = maxSize4Pin - a * max;
          return a * val[2] + b;
        },
        label: {
          show: true,
          color: "#fff",
          fontSize: 9,
          formatter(value: any) {
            return value.data.value[2];
          },
        },
        emphasis: {
          areaColor: "#0f2c70",
          scale: true,
          itemStyle: {
            areaColor: "#1D346F",
            borderColor: "#D79D3D",
          },
        },

        data: convertData(data),
        showEffectOn: "render",
        rippleEffect: {
          brushType: "stroke",
        },
        zlevel: 6,
      },
      {
        name: "Top 5",
        type: "effectScatter",
        coordinateSystem: "geo",
        data: convertData(
          data
            .sort(function (a: any, b: any) {
              return b.value - a.value;
            })
            .slice(0, 11)
        ),
        symbolSize: function (val: any) {
          return val[2] / 10;
        },
        showEffectOn: "render",
        rippleEffect: {
          brushType: "stroke",
        },
        label: {
          formatter: "{b}",
          position: "right",
          show: true,
        },
        emphasis: {
          scale: true,
          areaColor: "#0f2c70",
          itemStyle: {
            areaColor: "#1D346F",
            borderColor: "#D79D3D",
          },
        },
        zlevel: 1,
      },
    ],
  };

  useEffect(() => {
    const zjmap = new BaseChart({ chartRef: ref, data: option });
    return () => zjmap.destory();
  }, []);

  return <div ref={ref} style={{ width: "100%", height: "100%" }} />;
};

export default ZjMap;

// https://segmentfault.com/a/1190000018483921#:~:text=react-echarts%E5%AE%9E%E7%8E%B0%E5%9C%B0%E5%9B%BE%E6%94%BE%E5%A4%A7%E6%98%BE%E7%A4%BA%E7%BB%86%E8%8A%82%201%20%E5%BC%80%E5%90%AF%E6%94%BE%E5%A4%A7%2F%E7%BC%A9%E5%B0%8F%E5%9C%B0%E5%9B%BE%EF%BC%9A%20roam%3Atrue%3B%202%20%E5%88%87%E6%8D%A2%E5%9C%B0%E5%9B%BE%EF%BC%9A%20%EF%BC%881%EF%BC%89%E5%9C%B0%E5%9B%BE%E7%BC%A9%E6%94%BE%E4%BA%8B%E4%BB%B6%EF%BC%9A%20on,chartInstance.getOption%20%28%29.geo%20%5B0%5D%20%EF%BC%9B%20%EF%BC%883%EF%BC%89%E4%B8%8E%E9%98%88%E5%80%BC%E6%AF%94%E8%BE%83%E5%90%8E%E5%88%87%E6%8D%A2json%E9%87%8D%E6%96%B0%E6%B3%A8%E5%86%8C%E5%9C%B0%E5%9B%BE%EF%BC%9A%20echarts.registerMap%20%28%27XC%27%2C%20another_json%29%3B
