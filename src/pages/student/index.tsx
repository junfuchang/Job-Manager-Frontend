import { useAntdTable, useRequest } from "ahooks";
import dayjs from "dayjs";
import { UserOutlined } from "@ant-design/icons";
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
  Avatar,
} from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { FormDrawer } from "@formily/antd-v5";
import { selectStudentList } from "../../api/Student";
// import AmountUpdateForm from "./amount-upate-form";
// import AmountInsertForm from "./amount-insert-form";

const { confirm } = Modal;
const { Option } = Select;

const StudentManager = () => {
  const [form] = Form.useForm();
  const { tableProps: studentListProps, search: studentListSearch } =
    useAntdTable(selectStudentList, {
      form,
      defaultParams: [
        {
          current: 1,
          pageSize: 20,
        },
        // {},
      ],
      defaultPageSize: 20,
      cacheKey: "AmountListCache",
    });
  const { submit, reset } = studentListSearch;

  // 删除用户
  // const { run: fetchDeleteAmountById } = useRequest(deleteAmountById, {
  //   manual: true,
  //   onSuccess: () => {
  //     message.success("删除成功");
  //   },
  //   onError: (result) => {
  //     message.error(result.message);
  //   },
  // });
  // 删除确认提示框
  // const deleteAmountConfirm = (amount: any) => {
  //   confirm({
  //     title: "确认删除该用户?",
  //     icon: <ExclamationCircleFilled />,
  //     content: `当前选择账户：${amount.username}`,
  //     okText: "确认",
  //     okType: "danger",
  //     cancelText: "取消",
  //     onOk() {
  //       fetchDeleteAmountById({ amountId: amount.amountId });
  //       submit();
  //     },
  //   });
  // };

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
      width: 150,
    },
    {
      title: "头像",
      key: "avatar",
      dataIndex: "avatar",
      width: 120,
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
      title: "专业",
      key: "majorName",
      dataIndex: "majorName",
      width: 150,
    },
    {
      title: "账户名称",
      key: "username",
      dataIndex: "username",
      width: 150,
    },
    {
      title: "性别",
      key: "gender",
      dataIndex: "gender",
      width: 100,
    },
    {
      title: "联系方式",
      key: "amountId",
      dataIndex: "amountId",
      width: 150,
    },
    // 毕业信息
    // {
    //   title: "学号",
    //   key: "studentId",
    //   dataIndex: "studentId",
    //   width: 180,
    // },
    // {
    //   title: "姓名",
    //   key: "name",
    //   dataIndex: "name",
    //   width: 220,
    // },

    // {
    //   title: "性别",
    //   key: "gender",
    //   dataIndex: "gender",
    //   width: 180,
    // },
    // {
    //   title: "地址",
    //   key: "address",
    //   dataIndex: "address",
    //   width: 180,
    // },
    // {
    //   title: "出生日期",
    //   key: "birthday",
    //   dataIndex: "birthday",
    //   width: 180,
    // },

    // 毕业信息
    // {
    //   title: "学历",
    //   key: "degree",
    //   dataIndex: "degree",
    //   width: 180,
    // },
    // {
    //   title: "毕业去向",
    //   key: "direction",
    //   dataIndex: "direction",
    //   width: 180,
    // },
    // {
    //   title: "毕业时间",
    //   key: "date",
    //   dataIndex: "date",
    //   width: 180,
    // },
    // {
    //   title: "行业",
    //   key: "industry",
    //   dataIndex: "industry",
    //   width: 180,
    // },
    // {
    //   title: "岗位",
    //   key: "post",
    //   dataIndex: "post",
    //   width: 180,
    // },
    // {
    //   title: "薪资",
    //   key: "salary",
    //   dataIndex: "salary",
    //   width: 180,
    // },

    {
      title: "操作",
      key: "action",
      width: 330,
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button size="small">毕业信息</Button>
          <Button size="small">简历信息</Button>
          <Button size="small">更多</Button>
          <Button size="small">编辑</Button>
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
              <Form.Item label="专业" name="majorId" initialValue={-1}>
                <Select>
                  <Option value={-1}>全部</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="是否毕业" name="roleId" initialValue={-1}>
                <Select>
                  <Option value={-1}>全部</Option>
                  <Option value={0}>是</Option>
                  <Option value={1}>否</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="毕业时间" name="date">
                <DatePicker placeholder="毕业时间" />
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
          rowKey="studentId"
          {...studentListProps}
          scroll={{ y: "calc(100vh - 340px)" }}
        />
      </div>
    </div>
  );
};

export default StudentManager;
