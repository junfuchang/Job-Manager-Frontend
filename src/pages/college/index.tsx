import { useAntdTable, useRequest } from "ahooks";
import dayjs from "dayjs";
import { deleteAmountById, selectAmountList } from "../../api/Amount";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tag,
  message,
  InputNumber,
} from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { FormDrawer } from "@formily/antd-v5";

const { confirm } = Modal;
const { Option } = Select;

const CollegeManager = () => {
  const [form] = Form.useForm();
  const { tableProps: amountListProps, search: amountListSearch } =
    useAntdTable(selectAmountList, {
      form,
      onBefore() {
        // const createTime = form.getFieldValue("createTime");
      },
      defaultParams: [
        {
          current: 1,
          pageSize: 20,
        },
        {
          roleId: -1, // 表单默认值，-1标识ALL，不区分哪种角色
        },
      ],
      defaultPageSize: 20,
      cacheKey: "AmountListCache",
    });
  const { submit, reset } = amountListSearch;

  // 删除用户
  const { run: fetchDeleteAmountById } = useRequest(deleteAmountById, {
    manual: true,
    onSuccess: () => {
      message.success("删除成功");
    },
    onError: (result) => {
      message.error(result.message);
    },
  });
  // 删除确认提示框
  const deleteAmountConfirm = (amount: any) => {
    confirm({
      title: "确认删除该用户?",
      icon: <ExclamationCircleFilled />,
      content: `当前选择账户：${amount.username}`,
      okText: "确认",
      okType: "danger",
      cancelText: "取消",
      onOk() {
        fetchDeleteAmountById({ amountId: amount.amountId });
        submit();
      },
    });
  };

  const columns = [
    {
      title: "账户ID",
      key: "amountId",
      dataIndex: "amountId",
      width: 180,
    },
    {
      title: "账户名",
      key: "username",
      dataIndex: "username",
      width: 220,
    },
    {
      title: "账户类型",
      key: "roleId",
      dataIndex: "roleId",
      width: 180,
      render: (_: any, record: any) => {
        switch (record.roleId) {
          case 0:
            return <Tag color="green">学生</Tag>;
          case 1:
            return <Tag color="blue">企业</Tag>;
          case 2:
            return <Tag color="red">管理员</Tag>;
          default:
            return <Tag color="gray">未知</Tag>;
        }
      },
    },
    {
      title: "创建时间",
      key: "createTime",
      dataIndex: "createTime",
      width: 180,
      render: (_: any, record: any) =>
        dayjs(record?.createTime, "YYYY/MM/DD").toDate().toLocaleDateString(),
    },
    {
      title: "操作",
      key: "action",
      width: 180,
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            onClick={() => {
              FormDrawer(`修改 ${record.username} 账户信息`, () => <>1</>).open(
                {
                  initialValues: record,
                }
              );
            }}
            size="small"
          >
            修改
          </Button>

          <Button
            danger
            onClick={() => deleteAmountConfirm(record)}
            size="small"
          >
            删除
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
              <Form.Item label="账户ID" name="amountId">
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="账户ID"
                  controls={false}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="账户名称" name="username">
                <Input placeholder="账户名称" />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="账户角色" name="roleId" initialValue={-1}>
                <Select>
                  <Option value={-1}>全部</Option>
                  <Option value={0}>学生</Option>
                  <Option value={1}>企业</Option>
                  <Option value={2}>管理员</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="创建时间" name="createTime">
                <DatePicker placeholder="创建时间" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24} justify="space-between" style={{ marginBottom: 24 }}>
            <Col>{/* <AmountInsertForm flashList={submit} /> */}</Col>
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
          rowKey="amountId"
          {...amountListProps}
          scroll={{ y: "calc(100vh - 340px)" }}
        />
      </div>
    </div>
  );
};

export default CollegeManager;
