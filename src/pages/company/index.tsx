import { useAntdTable } from "ahooks";
import { UserOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  InputNumber,
  Avatar,
  Cascader,
} from "antd";
import { FormDialog, FormDrawer } from "@formily/antd-v5";
import { selectStudentList } from "../../api/Student";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../store/RootStore";
import { useRef } from "react";

const { Option } = Select;

const CompanyManager = () => {
  const [form] = Form.useForm();
  const updateDrawer = useRef<any>();

  const { tableProps: studentListProps, search: studentListSearch } =
    useAntdTable(selectStudentList, {
      form,
      onBefore(params: any) {
        if (params[1]?.majorId?.length) {
          params[1].majorId = params[1].majorId[1];
        }
      },
      defaultParams: [
        {
          current: 1,
          pageSize: 20,
        },
        {},
      ],
      defaultPageSize: 20,
      cacheKey: "AmountListCache",
    });
  const { submit, reset } = studentListSearch;

  const afterSuccess = () => {
    if (updateDrawer.current) {
      updateDrawer.current.close();
    }
    submit();
  };

  const columns = [
    // 表格信息
    {
      title: "企业ID",
      key: "companyId",
      dataIndex: "companyId",
      width: 120,
    },
    {
      title: "企业名称",
      key: "name",
      dataIndex: "name",
      width: 120,
    },
    {
      title: "社会信用代码",
      key: "code",
      dataIndex: "code",
      width: 120,
    },
    {
      title: "公司类型",
      key: "username",
      dataIndex: "username",
      width: 130,
    },
    {
      title: "联系方式",
      key: "contact",
      dataIndex: "contact",
      width: 150,
    },
    {
      title: "公司地址",
      key: "contact",
      dataIndex: "contact",
      width: 150,
    },
    {
      title: "公司官网",
      key: "contact",
      dataIndex: "contact",
      width: 150,
    },
    {
      title: "备注",
      key: "contact",
      dataIndex: "contact",
      width: 150,
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
          icon={<UserOutlined />}
        />
      ),
    },
    {
      title: "操作",
      key: "action",
      width: 290,
      render: (_: any, record: any) => (
        <Space size="middle">
          {record.graduateFlag === 1 ? (
            <Button
              size="small"
              onClick={() => {
                FormDrawer(
                  { footer: false, title: "学生毕业信息", width: 400 },
                  <>s</>
                  // <GraduateInfo record={record} />
                ).open();
              }}
            >
              毕业信息
            </Button>
          ) : undefined}

          <Button size="small">简历信息</Button>
          <Button
            size="small"
            onClick={() => {
              updateDrawer.current = FormDrawer(
                { footer: false, title: "修改学生信息" },
                <>s</>
                // <UpdateStudent record={record} flashList={afterSuccess} />
              );
              updateDrawer.current.open();
            }}
          >
            编辑
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div>
        <Form form={form}>
          <Row gutter={24}>
            <Col span={4}>
              <Form.Item label="学号" name="studentId">
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="学号"
                  controls={false}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="姓名" name="name">
                <Input placeholder="学生姓名" />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="专业" name="majorId">
                {/* <Cascader
                  options={schoolStore.collegeMajorData as any}
                  placeholder="学生专业"
                /> */}
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="是否毕业" name="graduateFlag" initialValue={-1}>
                <Select>
                  <Option value={-1}>全部</Option>
                  <Option value={1}>是</Option>
                  <Option value={0}>否</Option>
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
          rowKey="studentId"
          {...studentListProps}
          scroll={{ y: "calc(100vh - 340px)" }}
        />
      </div>
    </div>
  );
};

export default observer(CompanyManager);
