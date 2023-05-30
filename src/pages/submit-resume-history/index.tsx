import { useAntdTable } from "ahooks";
import { UserOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Space,
  Table,
  InputNumber,
  Avatar,
  Tag,
  Select,
} from "antd";
import { FormDrawer } from "@formily/antd-v5";
import { selectCompanyList } from "../../api/Company";
import { observer } from "mobx-react-lite";
import { useRef } from "react";
import { selectJobStudentList } from "../../api/JobStudent";
import { useRootStore } from "../../store/RootStore";
const { Option } = Select;

const SubmitResumeHistory = () => {
  const [form] = Form.useForm();
  const { loginStore } = useRootStore();

  const { tableProps: jobStudentListProps, search: jobStudentListSearch } =
    useAntdTable(selectJobStudentList, {
      form,
      defaultParams: [
        {
          current: 1,
          pageSize: 20,
          studentId: loginStore?.getRoleInfo?.studentId,
        },
      ],
      defaultPageSize: 20,
      cacheKey: "JobStudentListCache",
    });
  const { submit, reset } = jobStudentListSearch;

  const columns = [
    // 表格信息
    {
      title: "岗位编号",
      key: "jobId",
      dataIndex: "jobId",
      width: 80,
    },
    {
      title: "岗位名称",
      key: "job",
      dataIndex: "job",
      width: 150,
    },
    {
      title: "公司名称",
      key: "company",
      dataIndex: "company",
      width: 150,
    },
    {
      title: "是否通过",
      key: "feedback",
      dataIndex: "feedback",
      width: 80,
      render(_: any, record: any) {
        if (record.feedback === 0) return <Tag color="#108ee9">未筛选</Tag>;
        if (record.feedback === 1) return <Tag color="#f50">拒绝</Tag>;
        if (record.feedback === 2) return <Tag color="#87d068">通过</Tag>;
        return <Tag>未知</Tag>;
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
  ];

  return (
    <div>
      <div>
        <Form form={form}>
          <Row gutter={24}>
            <Col span={4}>
              <Form.Item label="岗位名称" name="jobName">
                <Input placeholder="岗位名称" />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="企业名称" name="companyName">
                <Input placeholder="企业名称" />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="通过情况" name="feedback" initialValue={-1}>
                <Select>
                  <Option value={-1}>全部</Option>
                  <Option value={0}>未回复</Option>
                  <Option value={1}>已被拒</Option>
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
      </div>
      <div>
        <Table
          columns={columns}
          rowKey="jobId"
          {...jobStudentListProps}
          scroll={{ y: "calc(100vh - 340px)" }}
        />
      </div>
    </div>
  );
};

export default observer(SubmitResumeHistory);
