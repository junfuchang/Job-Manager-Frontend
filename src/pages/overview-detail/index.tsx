import { Card, Col, Row } from "antd";
import NumBox from "./components/num-box";
import "./index.scss";
import LinnBar from "../../visual/line-bar";
import CollegeBar from "../../visual/college-bar";
import { useEffect, useState } from "react";
import { useRequest } from "ahooks";
import { useRootStore } from "../../store/RootStore";
import { observer } from "mobx-react-lite";
import { selectRateData } from "../../api/College";

const OvervireDetail = () => {
  const { data: rateData } = useRequest(selectRateData);

  return (
    <div className="overview-detail">
      <div className="overview-detail-bar">
        <Row gutter={16}>
          <Col span={8}>
            <NumBox title="今年毕业人数">888</NumBox>
          </Col>
          <Col span={8}>
            <Card title={"今年毕业人数" + "12"}></Card>
          </Col>
          <Col span={8}>
            <Card title={"今年毕业人数" + "12"}></Card>
          </Col>
        </Row>
      </div>
      <div className="overview-detail-content">
        <div className="content-left">
          <LinnBar />
        </div>
        <div className="content-right">
          <CollegeBar data={rateData} />
        </div>
      </div>
    </div>
  );
};

export default OvervireDetail;
