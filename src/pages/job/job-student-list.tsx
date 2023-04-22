import { useAntdTable, useRequest } from "ahooks";
import {
  Avatar,
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Tag,
  message,
} from "antd";
import { jobPass, jobReject, selectJobStudentList } from "../../api/JobStudent";
import { FormDrawer } from "@formily/antd-v5";
import save2PDF from "../../utils/save2PDF";
import ResumeDisplay from "../../components/resume-display";
import { useState } from "react";
const { Option } = Select;

export default function JobStudentList(props: any) {
  const { studentId, jobId, companyId, showSearch = false } = props;
  console.log("props", props);

  const [form] = Form.useForm();

  const { tableProps: jobStudentListProps, search: jobStudentListSearch } =
    useAntdTable(selectJobStudentList, {
      form,
      defaultParams: [
        {
          current: 1,
          pageSize: 20,
          studentId,
          jobId,
          companyId,
        },
      ],
      defaultPageSize: 20,
      cacheKey: "JobStudentHistoryListCache",
    });

  const { submit, reset } = jobStudentListSearch;

  const columns = [
    // 表格信息
    {
      title: "学号",
      key: "studentId",
      dataIndex: "studentId",
      width: 120,
    },
    {
      title: "姓名",
      key: "name",
      dataIndex: "name",
      width: 120,
    },
    {
      title: "筛选",
      key: "feedback",
      dataIndex: "feedback",
      width: 60,
      render(_: any, record: any) {
        if (record.feedback === 0) return <Tag color="#108ee9">未筛选</Tag>;
        if (record.feedback === 1) return <Tag color="#f50">拒绝</Tag>;
        if (record.feedback === 2) return <Tag color="#87d068">通过</Tag>;
        return <Tag>未知</Tag>;
      },
    },
    {
      title: "头像",
      key: "avatar",
      dataIndex: "avatar",
      width: 70,
      render: (_: any, record: any) => (
        <Avatar
          shape="square"
          src={record?.avatar}
          style={{ backgroundColor: "#87d068" }}
          // icon={<UserOutlined />}
        />
      ),
    },
    {
      title: "专业",
      key: "major",
      dataIndex: "major",
      width: 150,
    },
    {
      title: "性别",
      key: "gender",
      dataIndex: "gender",
      width: 60,
      render(_: any, record: any) {
        if (record.gender === 1) return <span>男</span>;
        if (record.gender === 0) return <span>女</span>;
        return <span>未知</span>;
      },
    },
    {
      title: "联系方式",
      key: "contact",
      dataIndex: "contact",
      width: 120,
    },
    {
      title: "出生日期",
      key: "birthday",
      dataIndex: "birthday",
      width: 120,
      render(_: any, record: any) {
        return <span>{record?.birthday?.slice(0, 10)}</span>;
      },
    },
    {
      title: "投递日期",
      key: "date",
      dataIndex: "date",
      width: 120,
      render(_: any, record: any) {
        return <span>{record?.date?.slice(0, 10)}</span>;
      },
    },

    {
      title: "操作",
      key: "action",
      width: 200,
      render: (_: any, record: any) => (
        <Space size="middle">
          {record.resume != null ? (
            <Button
              size="small"
              onClick={() => {
                FormDrawer(
                  {
                    footer: false,
                    title: "学生简历详情",
                    width: "40%",
                    extra: (
                      <Button
                        onClick={() => {
                          const dom =
                            document.getElementById("content-display");
                          if (dom) {
                            save2PDF(dom, (record?.name ?? "") + "简历");
                          }
                        }}
                      >
                        导出PDF
                      </Button>
                    ),
                  },
                  <ResumeDisplay record={record} />
                ).open();
              }}
            >
              查看简历
            </Button>
          ) : undefined}

          <ResumeFeedback {...record} />
        </Space>
      ),
    },
  ];
  return (
    <>
      {showSearch ? (
        <Form form={form}>
          <Row gutter={24}>
            <Col span={4}>
              <Form.Item label="岗位名称" name="jobName">
                <Input placeholder="岗位名称" />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="岗位ID" name="jobId">
                <Input placeholder="岗位ID" />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="通过情况" name="feedback" initialValue={0}>
                <Select>
                  <Option value={-1}>全部</Option>
                  <Option value={0}>待回复</Option>
                  <Option value={1}>已拒绝</Option>
                  <Option value={2}>已通过</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24} justify="space-between" style={{ marginBottom: 24 }}>
            <Col>
              <span></span>
            </Col>
            <Col>
              <Button type="primary" onClick={submit}>
                搜索
              </Button>
              <Button onClick={reset} style={{ marginLeft: 16 }}>
                重置
              </Button>
            </Col>
          </Row>
        </Form>
      ) : undefined}

      <Table
        columns={columns}
        rowKey="jobStudentId"
        {...jobStudentListProps}
        scroll={{ y: "calc(100vh - 340px)" }}
      />
    </>
  );
}

function ResumeFeedback(props: any) {
  const { jobStudentId, feedback } = props;
  const [status, setStatus] = useState(feedback);
  const { run: toPass } = useRequest(jobPass, {
    manual: true,
    onSuccess: () => {
      message.success("成功！");
      setStatus(2);
    },
    onError: () => {
      message.success("失败！");
    },
  });
  const { run: toReject } = useRequest(jobReject, {
    manual: true,
    onSuccess: () => {
      message.success("成功！");
      setStatus(1);
    },
    onError: () => {
      message.success("失败！");
    },
  });

  return (
    <>
      {status === 0 ? (
        <Space size="middle">
          <Button
            size="small"
            type="primary"
            onClick={() => toPass({ jobStudentId })}
          >
            通过
          </Button>

          <Button
            size="small"
            danger
            onClick={() => toReject({ jobStudentId })}
          >
            拒绝
          </Button>
        </Space>
      ) : status === 1 ? (
        <Button
          size="small"
          type="primary"
          onClick={() => toPass({ jobStudentId })}
        >
          转为通过
        </Button>
      ) : (
        <Button
          size="small"
          type="primary"
          danger
          onClick={() => toReject({ jobStudentId })}
        >
          转为拒绝
        </Button>
      )}
    </>
  );
}
