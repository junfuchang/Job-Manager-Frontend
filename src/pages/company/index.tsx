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
} from "antd";
import { FormDrawer } from "@formily/antd-v5";
import { selectCompanyList } from "../../api/Company";
import { observer } from "mobx-react-lite";
import { useRef } from "react";
import UpdateCompany from "./update-company";

const CompanyManager = () => {
  const [form] = Form.useForm();
  const updateDrawer = useRef<any>();

  const { tableProps: companyListProps, search: companyListSearch } =
    useAntdTable(selectCompanyList, {
      form,
      defaultParams: [
        {
          current: 1,
          pageSize: 20,
        },
        {},
      ],
      defaultPageSize: 20,
      cacheKey: "CompanyListCache",
    });
  const { submit, reset } = companyListSearch;

  const afterSuccess = () => {
    if (updateDrawer.current) {
      updateDrawer.current.close();
    }
    submit();
  };

  const columns = [
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
      width: 180,
    },
    {
      title: "企业标志",
      key: "pic",
      dataIndex: "pic",
      width: 90,
      render: (_: any, record: any) => (
        <Avatar
          shape="square"
          src={record?.pic}
          style={{ backgroundColor: "#87d068" }}
          icon={<UserOutlined />}
        />
      ),
    },
    {
      title: "社会信用代码",
      key: "code",
      dataIndex: "code",
      width: 120,
    },
    {
      title: "公司类型",
      key: "type",
      dataIndex: "type",
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
      key: "address",
      dataIndex: "address",
    },
    {
      title: "公司官网",
      key: "website",
      dataIndex: "website",
    },
    {
      title: "备注",
      key: "remark",
      dataIndex: "remark",
    },

    {
      title: "操作",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            size="small"
            onClick={() => {
              updateDrawer.current = FormDrawer(
                { footer: false, title: "修改企业信息", width: 500 },
                <UpdateCompany record={record} flashList={afterSuccess} />
              );
              updateDrawer.current.open();
            }}
          >
            编辑
          </Button>
          {/* <Button size="small">查看岗位</Button> */}
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
              <Form.Item label="社会信用代码" name="code">
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="社会信用代码"
                  controls={false}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="企业名称" name="name">
                <Input placeholder="企业名称" />
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
          rowKey="companyId"
          {...companyListProps}
          scroll={{ y: "calc(100vh - 340px)" }}
        />
      </div>
    </div>
  );
};

export default observer(CompanyManager);
