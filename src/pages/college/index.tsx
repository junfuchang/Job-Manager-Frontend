import { useAntdTable, useRequest } from "ahooks";
import { Button, Col, Modal, Row, Select, Space, Table, message } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { FormDrawer } from "@formily/antd-v5";
import { deleteCollegeById, selectCollegeList } from "../../api/College";
import { useState } from "react";
import CollegeDetail from "./college-detail";
import "./index.scss";
import CollegeInsertForm from "./college-insert-form";
import EmptyTip from "../../components/empty-tip";
const { confirm } = Modal;

const CollegeManager = () => {
  const [active, setActive] = useState<any>();

  const { tableProps: collegeListProps, run: fetchCollegeList } = useAntdTable(
    selectCollegeList,
    {
      defaultParams: [
        {
          current: 1,
          pageSize: 200,
        },
      ],
      defaultPageSize: 200,
      cacheKey: "CollegeListCache",
    }
  );
  const flashList = () => {
    fetchCollegeList({ current: 1, pageSize: 200 });
  };

  // 删除学院
  const { run: fetchDeleteCollegeById } = useRequest(deleteCollegeById, {
    manual: true,
    onSuccess: () => {
      message.success("删除成功");
      flashList();
    },
    onError: (result) => {
      message.error(result.message);
    },
  });

  // 删除确认提示框
  const deleteAmountConfirm = (college: any) => {
    confirm({
      title: "确认删除该学院?",
      icon: <ExclamationCircleFilled />,
      content: `当前选择学院：${college?.name}`,
      okText: "确认",
      okType: "danger",
      cancelText: "取消",
      onOk() {
        fetchDeleteCollegeById({ collegeId: college?.collegeId });
      },
    });
  };

  const columns = [
    {
      title: "学院ID",
      key: "collegeId",
      dataIndex: "collegeId",
      width: 180,
    },
    {
      title: "学院名称",
      key: "name",
      dataIndex: "name",
      width: 220,
    },
    {
      title: "操作",
      key: "action",
      width: 180,
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setActive(record);
            }}
            style={
              record.collegeId === active?.collegeId
                ? { backgroundColor: "#d7e3fc" }
                : undefined
            }
          >
            详细信息
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
    <div className="college">
      <div>
        <Row justify="end">
          <Col>
            <CollegeInsertForm thenSuccess={flashList} />
          </Col>
        </Row>
      </div>
      <div className="content">
        <div className="left">
          <Table
            columns={columns}
            rowKey="collegeId"
            {...collegeListProps}
            pagination={false}
            scroll={{ y: "calc(100vh - 220px)" }}
          />
        </div>

        <div className="right">
          {active?.collegeId ? (
            <CollegeDetail college={active} />
          ) : (
            <EmptyTip tip="点击右侧学院详细信息以编辑">学院信息编辑页</EmptyTip>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollegeManager;
