import { useAntdTable, useRequest } from "ahooks";
import { deleteMajorById, selectMajorList } from "../../api/Major";
import { Button, Card, Input, Modal, Space, Table, message } from "antd";
import { createSchemaField } from "@formily/react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { createForm } from "@formily/core";
import { Form, Submit, FormLayout, FormItem } from "@formily/antd-v5";
import MajorInsertForm from "./major-insert-form";
import { updateCollege } from "../../api/College";
import { useEffect } from "react";
import MajorUpdateForm from "./major-update-form";
const { confirm } = Modal;

const collegeSchema = {
  type: "object",
  properties: {
    g5ycy22wv34s: {
      type: "void",
      "x-component": "FormLayout",
      "x-component-props": {},
      "x-index": 0,
      properties: {
        formLayout: {
          type: "void",
          "x-component": "FormLayout",
          "x-component-props": {
            feedbackLayout: "terse",
            layout: "horizontal",
            labelWrap: false,
            wrapperWrap: false,
            fullness: false,
            inset: false,
            shallow: true,
          },
          name: "formLayout",
          "x-index": 0,
          properties: {
            name: {
              type: "string",
              title: "学院名称",
              "x-decorator": "FormItem",
              "x-component": "Input",
              "x-validator": [],
              "x-component-props": {
                maxLength: 45,
                placeholder: "学院名称",
              },
              "x-decorator-props": {},
              required: true,
              name: "name",
              "x-index": 0,
            },
          },
        },
      },
    },
  },
};
const SchemaField = createSchemaField({
  components: {
    Input,
    Submit,
    FormLayout,
    FormItem,
  },
});

const CollegeDetail = (props: any) => {
  const { college, flashList } = props;

  const collegeEditForm = createForm({
    validateFirst: true,
    initialValues: college,
  });

  const { tableProps: majorListProps, run: fetchMajor } = useAntdTable(
    selectMajorList,
    {
      manual: true,
      defaultPageSize: 200,
      cacheKey: "CollegeEditMajorListCache",
    }
  );

  useEffect(() => {
    fetchMajor({ current: 1, pageSize: 200, collegeId: college?.collegeId });
  }, [college, fetchMajor]);

  const { run: fetchUpdateAmount } = useRequest(updateCollege, {
    manual: true,
    onSuccess: () => {
      message.success("保存成功!");
      flashList?.();
    },
    onError: (result) => {
      message.error(result.message);
    },
  });

  // 删除专业
  const { run: fetchDeleteMajorById } = useRequest(deleteMajorById, {
    manual: true,
    onSuccess: () => {
      message.success("删除成功");
      fetchMajor({ current: 1, pageSize: 200, collegeId: college?.collegeId });
    },
    onError: (result) => {
      message.error(result.message);
    },
  });

  // 删除确认提示框
  const deleteAmountConfirm = (major: any) => {
    confirm({
      title: "确认删除该专业?",
      icon: <ExclamationCircleFilled />,
      content: `当前选择专业：${major?.name}`,
      okText: "确认",
      okType: "danger",
      cancelText: "取消",
      onOk() {
        fetchDeleteMajorById({ majorId: major?.majorId });
      },
    });
  };

  const columns = [
    {
      title: "专业ID",
      key: "majorId",
      dataIndex: "majorId",
      width: 180,
    },
    {
      title: "专业名称",
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
          <MajorUpdateForm
            record={record}
            thenSuccess={() =>
              fetchMajor({
                current: 1,
                pageSize: 200,
                collegeId: college?.collegeId,
              })
            }
          />
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
    <>
      <Card
        title="学院信息"
        bordered={false}
        style={{ margin: "10px 0" }}
        extra={
          <Button
            onClick={() =>
              fetchUpdateAmount({
                collegeId: college?.collegeId,
                name: collegeEditForm?.values?.name,
              })
            }
          >
            更新信息
          </Button>
        }
      >
        <Form form={collegeEditForm}>
          <SchemaField schema={collegeSchema} />
        </Form>
      </Card>
      <Card
        title="专业信息"
        bordered={false}
        extra={
          <MajorInsertForm
            collegeId={college?.collegeId}
            thenSuccess={() =>
              fetchMajor({
                current: 1,
                pageSize: 200,
                collegeId: college?.collegeId,
              })
            }
          />
        }
      >
        <Table
          columns={columns}
          rowKey="majorId"
          {...majorListProps}
          scroll={{ y: "calc(100vh - 340px)" }}
        />
      </Card>
    </>
  );
};

export default CollegeDetail;
