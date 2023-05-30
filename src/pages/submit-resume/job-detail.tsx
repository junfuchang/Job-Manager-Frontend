import { useRequest } from "ahooks";
import { Alert, Button, Col, Descriptions, Row, Space, message } from "antd";
import { alreadySubmitJob, cancelJob, submitJob } from "../../api/JobStudent";
import { spawn } from "child_process";
import { useEffect } from "react";

interface IJobDetail {
  studentId: number;
  record: any;
  canSubmit?: boolean;
}

const JobDetail = (props: IJobDetail) => {
  const { studentId, record, canSubmit = true } = props;

  const { data: submitJobInfo, run: flash } = useRequest(
    () => alreadySubmitJob({ jobId: record?.jobId, studentId }),
    {
      manual: true,
      refreshDeps: [record?.jobId, studentId],
    }
  );
  const { run: fetchCancelJob } = useRequest(cancelJob, {
    manual: true,
    onSuccess() {
      message.success("取消成功");
      flash();
    },
    onError(e) {
      message.error(e.message);
    },
  });
  const { run: fetchSubmitJob } = useRequest(submitJob, {
    manual: true,
    onSuccess() {
      message.success("投递成功");
      flash();
    },
    onError(e) {
      message.error(e.message);
    },
  });

  useEffect(() => {
    if (studentId) {
      flash();
    }
  }, [record, studentId]);

  return (
    <div>
      <Descriptions
        title={record?.title + ` 详细信息（${record?.jobId}）`}
        bordered
        layout="vertical"
        extra={
          !canSubmit ||
          (submitJobInfo?.already ? (
            submitJobInfo.feedback === 0 ? (
              <Space>
                <Alert
                  message="已投递简历，请等待反馈！"
                  type="info"
                  showIcon
                />
                <Button
                  danger
                  onClick={() => {
                    fetchCancelJob({
                      jobId: record?.jobId,
                      studentId: studentId,
                    });
                  }}
                >
                  取消投递
                </Button>
              </Space>
            ) : (
              <>
                {submitJobInfo.feedback === 2 || (
                  <Alert
                    message="抱歉您未通过企业初筛！"
                    type="error"
                    showIcon
                  />
                )}
                {submitJobInfo.feedback === 1 || (
                  <Alert
                    message="恭喜您已通过初筛！请耐心等待企业联系。"
                    type="success"
                    showIcon
                  />
                )}
              </>
            )
          ) : (
            <Button
              type="primary"
              onClick={() => {
                fetchSubmitJob({
                  jobId: record?.jobId,
                  studentId,
                });
              }}
            >
              投递简历
            </Button>
          ))
        }

        // column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
      >
        <Descriptions.Item label="薪资">{record?.salary}</Descriptions.Item>
        <Descriptions.Item label="联系方式">
          {record?.contact}
        </Descriptions.Item>
        <Descriptions.Item label="地址">{record?.address}</Descriptions.Item>
        <Descriptions.Item label="岗位介绍" span={3}>
          {record?.intro}
        </Descriptions.Item>
        <Descriptions.Item label="岗位要求" span={3}>
          {record?.claim}
        </Descriptions.Item>
        <Descriptions.Item label="截止时间">
          {record?.deadline?.slice(0, 10) ?? ""}
        </Descriptions.Item>
        <Descriptions.Item label="岗位类型">
          {record?.type ?? ""}
        </Descriptions.Item>
        <Descriptions.Item label="企业名称">{record?.name}</Descriptions.Item>
        <Descriptions.Item label="企业官网">
          {record?.website}
        </Descriptions.Item>
        <Descriptions.Item label="企业方向">
          {record?.companyType}
        </Descriptions.Item>
        <Descriptions.Item label="备注">{record?.remark}</Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default JobDetail;
