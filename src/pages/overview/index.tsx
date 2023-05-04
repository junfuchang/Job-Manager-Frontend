import { useRequest } from "ahooks";
import { HzMap, Radar } from "../../visual";
import Rose from "../../visual/rose";
import Card from "./components/Card";
import Panel from "./components/Panel";
import "./index.scss";
import { getOverviewInfo, getOverviewMap } from "../../api/Common";

export default function Overview(props: any) {
  const { data: overviewInfo } = useRequest(getOverviewInfo);
  const { data: mapData } = useRequest(getOverviewMap, {
    defaultParams: [
      {
        locationList: [
          {
            code: "110101",
            name: "上城区",
          },
          {
            code: "110102",
            name: "拱墅区",
          },
          {
            code: "110103",
            name: "西湖区",
          },
          {
            code: "110104",
            name: "滨江区",
          },
          {
            code: "110105",
            name: "萧山区",
          },
          {
            code: "110106",
            name: "余杭区",
          },
          {
            code: "110107",
            name: "富阳区",
          },
          {
            code: "110108",
            name: "临安区",
          },
          {
            code: "110109",
            name: "钱塘区",
          },
          {
            code: "110110",
            name: "临平区",
          },
          {
            code: "110111",
            name: "桐庐县",
          },
          {
            code: "110111",
            name: "淳安县",
          },
        ],
      },
    ],
  });

  return (
    <div className="overview">
      <div className="map">
        <HzMap mapData={mapData} />
      </div>
      <div className="left-panel">
        <Panel>
          <Card cardText="毕业生去向分布">
            <Rose
              type="direction"
              title="毕业生去向分布（历年）"
              resData={overviewInfo?.direction}
            />
          </Card>
          <Card cardText="毕业生学历分布">
            <Rose
              type="degree"
              title="毕业生学历分布（历年）"
              resData={overviewInfo?.degree}
            />
          </Card>
        </Panel>
      </div>
      <div className="right-panel">
        <Panel>
          <Card cardText="毕业生薪资分布">
            <Radar type="salary" resData={overviewInfo?.salary} />
          </Card>
          <Card cardText="毕业生就业性别分布">
            <Radar type="gender" resData={overviewInfo?.gender} />
          </Card>
        </Panel>
      </div>
    </div>
  );
}
