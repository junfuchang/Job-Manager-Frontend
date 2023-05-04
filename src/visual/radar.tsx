import { useEffect, useRef } from "react";
import BaseChart from "./base-charts";
import * as echarts from "echarts";

// var data = [80, 70, 30, 85, 25];
// var indicatorname = ["0~3k", "3~6k", "6~9k", "9~12k", "大于12k"];
// var maxdata = [100, 100, 100, 100, 100];

const Radar = (props: any) => {
  const {
    list = [80, 70, 30, 85, 25],
    names = ["0~3k", "3~6k", "6~9k", "9~12k", "大于12k"],
    max = [100, 100, 100, 100],
  } = props;
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

  const data = list;
  const indicatorname = names;
  const maxdata = max;

  let indicator: any[] = [];
  for (var i = 0; i < indicatorname.length; i++) {
    indicator.push({
      name: indicatorname[i],
      max: maxdata[i],
    });
  }

  function contains(arrays: any[], obj: any) {
    var i = arrays.length;
    while (i--) {
      if (arrays[i] === obj) {
        return i;
      }
    }
    return false;
  }

  function innerdata(i: any) {
    var innerdata = [];
    for (let j = 0; j < data.length; j++) {
      innerdata.push(100 - 20 * i);
    }
    return innerdata;
  }

  function getData(data: any) {
    var res = {
      series: [
        {
          type: "radar",
          symbolSize: 10,
          symbol: "circle",
          areaStyle: {
            color: "#39B2FF",
            opacity: 0.3,
          },
          lineStyle: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "#00A2FF",
                },
                {
                  offset: 1,
                  color: "#0060FF",
                },
              ],
              false
            ),
            width: 3,
          },
          itemStyle: {
            color: "#fff ",
            borderColor: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "#00DEFF",
                },
                {
                  offset: 1,
                  color: "#1598FF",
                },
              ],
              false
            ),
            borderWidth: 4,
            opacity: 1,
          },
          label: {
            show: false,
          },
          data: [
            {
              value: data,
            },
          ],
          z: 100,
        },
      ],
    };
    for (let i = 0; i < data.length; i++) {
      res.series.push({
        type: "radar",
        data: [
          {
            value: innerdata(i),
          },
        ],
        symbol: "none",
        lineStyle: {
          width: 0,
        },
        itemStyle: {
          color: "#ccc",
        },
        areaStyle: {
          // color: "#fff",
          shadowColor: "rgba(14,122,191,0.15)",
          shadowBlur: 30,
          shadowOffsetY: 20,
        },
      } as any);
    }
    return res;
  }

  const option = {
    tooltip: {
      formatter: function () {
        var html = "";
        for (var i = 0; i < data.length; i++) {
          html += indicatorname[i] + " : " + data[i] + "%<br>";
        }
        return html;
      },
    },

    radar: {
      indicator: indicator,
      center: ["50%", "50%"], // 外圆的位置
      radius: "55%",
      splitArea: {
        show: true,
        areaStyle: {
          // color: "#fff",
          // shadowColor: "rgba(14,122,191,0.19)",
          shadowBlur: 30,
          shadowOffsetY: 20,
        },
      },
      splitLine: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      name: {
        textStyle: {
          rich: {
            a: {
              // fontSize: "17",
              // color: "white",
              // align: "left",
              // lineHeight: "30",
              // fontWeight: "bold",
            },
            b: {
              fontSize: "15",
              color: "white",
              // align: "left",
            },
          },
        },

        formatter: function (params: any, index: any) {
          var i: any = contains(indicatorname, params);
          var percent = (data[i] / 100) * 100;
          return "{a|" + percent + "%}\n" + "{b|" + params + "}";
        },
      },
    },
    series: getData(data).series,
  };

  useEffect(() => {
    const rose = new BaseChart({ chartRef: ref, data: option });
    return () => rose.destory();
  }, [list]);

  return <div ref={ref} style={{ width: "100%", height: "100%" }} />;
};
export default Radar;
