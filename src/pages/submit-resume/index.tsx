import { useAntdTable, useToggle } from "ahooks";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Table,
  InputNumber,
  Tag,
} from "antd";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../store/RootStore";
import { useState } from "react";
import "./index.scss";
import { selectJobList } from "../../api/Job";
import JobDetail from "./job-detail";
import EmptyTip from "../../components/empty-tip";

const { Option } = Select;

const SubmitResume = (props: any) => {
  const { isAdminPage = false } = props;
  const [form] = Form.useForm();
  const [active, setActive] = useState<any>();
  const { loginStore } = useRootStore();

  const { tableProps: jobListProps, search: jobListPropsSearch } = useAntdTable(
    selectJobList,
    {
      form,
      defaultParams: [
        {
          current: 1,
          pageSize: 20,
        },
        {},
      ],
      defaultPageSize: 20,
      cacheKey: "JobListCache",
    }
  );
  const { submit, reset } = jobListPropsSearch;

  const columns = [
    // 表格信息
    {
      title: "岗位ID",
      key: "jobId",
      dataIndex: "jobId",
    },
    {
      title: "岗位名称",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "公司名称",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "是否截止",
      key: "deadline",
      dataIndex: "deadline",
      width: 120,
      render(_: any, record: any) {
        if (!record.openFlag) {
          return <Tag color="#f50">关闭</Tag>;
        }

        if (!record?.deadline) {
          return <Tag color="#87d068">开启</Tag>;
        }
        const deadline = new Date(record.deadline).getTime();
        const now = new Date().getTime();
        if (deadline <= now) {
          return <Tag color="#f50">关闭</Tag>;
        } else {
          return <Tag color="#87d068">开启</Tag>;
        }
      },
    },
    {
      title: "操作",
      key: "action",
      render(_: any, record: any) {
        return (
          <Button
            onClick={() => {
              setActive(record);
            }}
            style={
              record.jobId === active?.jobId
                ? { backgroundColor: "#d7e3fc" }
                : undefined
            }
          >
            详细信息
          </Button>
        );
      },
    },
  ];

  return (
    <div className="submit-resume">
      <div>
        <Form form={form}>
          <Row gutter={24}>
            <Col span={4}>
              <Form.Item label="公司名称" name="companyName">
                <Input placeholder="公司名称" />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="岗位名称" name="title">
                <Input placeholder="岗位名称" />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="岗位ID" name="jobId">
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="岗位ID"
                  controls={false}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                label="岗位开启"
                name="isOpenAndTimely"
                initialValue={isAdminPage ? -1 : 1}
              >
                <Select>
                  <Option value={-1}>全部</Option>
                  <Option value={1}>开启</Option>
                  <Option value={0}>关闭</Option>
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
      </div>
      <div className="content">
        <div className="left">
          <Table
            columns={columns}
            rowKey="jobId"
            {...jobListProps}
            scroll={{ y: "calc(100vh - 340px)" }}
          />
        </div>

        <div className="right">
          {active?.jobId ? (
            <JobDetail
              canSubmit={!isAdminPage}
              studentId={
                isAdminPage ? null : loginStore?.getRoleInfo?.studentId
              }
              record={active}
            />
          ) : (
            <EmptyTip tip="点击右侧岗位详细信息以展示">岗位详细信息</EmptyTip>
          )}
        </div>
      </div>
    </div>
  );
};

export default observer(SubmitResume);
