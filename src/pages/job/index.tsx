import { Button, Card, Col, Popconfirm, Row, Space, message } from "antd";
import "./index.scss";
import { useRequest } from "ahooks";
import { deleteJob, selectJobList } from "../../api/Job";
import { useRootStore } from "../../store/RootStore";
import { observer } from "mobx-react-lite";
import { FormDialog } from "@formily/antd-v5";
import JobInsertForm from "./job-insert-form";
import { useRef } from "react";
import JobUpdateForm from "./job-update-form";

const Job = () => {
  const { loginStore } = useRootStore();

  const companyId = loginStore.getRoleInfo?.companyId;

  const { data: jobData, run: flashJobList } = useRequest(selectJobList, {
    defaultParams: [{ companyId }],
  });
  const { run: fetchDeleteJob } = useRequest(deleteJob, {
    manual: true,
    onSuccess() {
      message.success("删除成功");
      thenSuccess();
    },
    onError(res) {
      message.error(res.message);
    },
  });

  const thenSuccess = () => {
    flashJobList({ companyId });
  };

  const handleShowJobStudentList = () => {
    console.log("///");
  };

  return (
    <>
      {jobData?.total === 0 ? (
        <div className="empty-reminder">
          <p>当前没有任何岗位，请点击下方按钮添加。</p>
          <JobInsertForm companyId={companyId} thenSuccess={thenSuccess} />
        </div>
      ) : (
        <div>
          <Row justify={"end"} style={{ marginBottom: 10 }}>
            <Col>
              <JobInsertForm companyId={companyId} thenSuccess={thenSuccess} />
            </Col>
          </Row>
          <div className="grid-container">
            {jobData?.list?.map((item: any, index: number) => {
              return (
                <Card
                  key={item.jobId}
                  className="item"
                  style={
                    item.openFlag &&
                    (!item?.deadline ||
                      new Date(item?.deadline).getTime() > new Date().getTime())
                      ? { backgroundColor: "#8dcea3" }
                      : {}
                  }
                  title={item.title}
                  bordered={false}
                  extra={
                    <div>
                      {/* <Button type="text">编辑</Button> */}
                      <JobUpdateForm record={item} thenSuccess={thenSuccess} />

                      <Popconfirm
                        title="删除岗位"
                        description="确定删除该岗位？"
                        onConfirm={() => {
                          fetchDeleteJob({ jobId: item.jobId });
                        }}
                        okText="确认"
                        cancelText="取消"
                      >
                        <Button type="text">删除</Button>
                      </Popconfirm>
                    </div>
                  }
                  hoverable
                  onClick={handleShowJobStudentList}
                >
                  {item.deadline == null || (
                    <p>
                      <span style={{ fontWeight: "bold" }}>截止时间：</span>
                      <span>
                        {(item.deadline?.toString() ?? "").slice(0, 10)}
                      </span>
                    </p>
                  )}

                  <p style={{ fontWeight: "bold" }}>岗位介绍：</p>
                  <p className="text-ellipsis">{item.intro}</p>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default observer(Job);
