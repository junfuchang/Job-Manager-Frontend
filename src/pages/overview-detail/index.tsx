import { Card, Col, Row } from "antd";
import NumBox from "./components/num-box";
import "./index.scss";
import LinnBar from "../../visual/line-bar";
import CollegeBar from "../../visual/college-bar";
import { useRequest } from "ahooks";
import { selectRateByYear, selectRateData } from "../../api/College";
import { getOverviewDetailNum } from "../../api/Common";

const OvervireDetail = () => {
  const { data: rateData } = useRequest(selectRateData);
  const { data: rateByYear } = useRequest(selectRateByYear);
  const { data: detailNum } = useRequest(getOverviewDetailNum);

  return (
    <div className="overview-detail">
      <div className="overview-detail-bar">
        <Row gutter={16}>
          <Col span={6}>
            <NumBox title="本年毕业人数" num={detailNum?.graduateNum ?? 0} />
          </Col>
          <Col span={6}>
            <NumBox title="学生简历投岗总数" num={detailNum?.submitNum ?? 0} />
          </Col>
          <Col span={6}>
            <NumBox title="已发布岗位总数" num={detailNum?.jobNum ?? 0} />
          </Col>
          <Col span={6}>
            <NumBox title="已入驻企业数量" num={detailNum?.companyNum ?? 0} />
          </Col>
        </Row>
      </div>
      <div className="overview-detail-content">
        <div className="content-left">
          <LinnBar data={rateByYear} />
        </div>
        <div className="content-right">
          <CollegeBar data={rateData} />
        </div>
      </div>
    </div>
  );
};

export default OvervireDetail;
