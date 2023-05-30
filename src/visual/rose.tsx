import { useEffect, useRef } from "react";
import BaseChart from "./base-charts";

const directionTYPE = ["升学", "就业", "待业"];
const degreeTYPE = ["其他", "学士", "硕士", "博士"];

const Rose = (props: any) => {
  const { resData = [], title, type } = props;
  let data = resData;

  switch (type) {
    case "direction":
      data = resData.map((i: any) => ({
        name: directionTYPE[i.directionType],
        value: i.directionCount,
      }));
      break;
    case "degree":
      data = resData.map((i: any) => ({
        name: degreeTYPE[i.degreeType],
        value: i.degreeCount,
      }));
      break;

    default:
      break;
  }

  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const option = {
    tooltip: {
      show: true,
      confine: true,
      backgroundColor: "rgba(9,103,138,0.8)",
      textStyle: {
        color: "rgba(255,255,255,1)",
      },
      trigger: "item",
      position: "top",
      borderColor: "transparent",
      extraCssText: "0px 0px 8px 0px rgba(0,0,0,0.2);border-radius: 4px;",
    },
    legend: {
      show: false,
    },
    color: [
      "RGBA(4, 186, 207, 1)",
      "RGBA(92, 216, 166, 1)",
      "RGBA(91, 144, 250, 1)",
      "RGBA(110, 200, 235, 1)",
      "RGBA(93, 112, 145, 1)",
      "RGBA(146, 111, 201, 1)",
      "RGBA(232, 105, 73, 1)",
      "RGBA(255, 157, 76, 1)",
      "RGBA(246, 189, 22, 1)",
      "RGBA(255, 152, 197, 1)",
    ],
    grid: {
      top: "5%",
      left: 0,
    },
    series: [
      {
        name: title ?? "毕业生去向（全部）",
        type: "pie",
        roseType: "area",
        center: ["50%", "50%"],
        radius: ["5%", "80%"],
        labelLine: {
          show: false,
        },
        label: {
          show: true,
          color: "#96A2B5",
          lineHeight: 6,
          position: "inside",
          formatter: "{a|{b}：{d}%}",
          rich: {
            a: {
              fontSize: 12,
              color: "white",
            },
          },
        },
        itemStyle: {
          borderRadius: 5,
          borderColor: "#202b53",
          borderWidth: 2,
        },
        showEmptyCircle: true,
        emptyCircleStyle: {
          color: "#4A6184",
        },
        data: data,
      },
    ],
  };

  useEffect(() => {
    const rose = new BaseChart({ chartRef: ref, data: option });
    return () => rose.destory();
  }, [resData]);

  return <div ref={ref} style={{ width: "100%", height: "100%" }} />;
};
export default Rose;
