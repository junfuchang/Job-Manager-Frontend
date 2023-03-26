import {
  Cascader,
  DatePicker,
  Form,
  FormButtonGroup,
  FormDrawer,
  FormItem,
  FormLayout,
  Input,
  Radio,
  Select,
  Submit,
  Switch,
  Upload,
} from "@formily/antd-v5";
import { createForm } from "@formily/core";
import { createSchemaField } from "@formily/react";
import { Card, message } from "antd";
import React from "react";
import { useRootStore } from "../../store/RootStore";
import { action } from "@formily/reactive";
import { observer } from "mobx-react-lite";
import { useRequest } from "ahooks";
import { updateStudent } from "../../api/Student";
import { updateCompany } from "../../api/Company";

const schema = {
  type: "object",
  properties: {
    g5ycy22wv4s: {
      type: "void",
      "x-component": "FormLayout",
      "x-component-props": {},
      "x-designable-id": "g5ycy22wv4s",
      "x-index": 0,
      properties: {
        formLayout: {
          type: "void",
          "x-component": "FormLayout",
          "x-component-props": {
            labelCol: 6,
            wrapperCol: 14,
            feedbackLayout: "terse",
            size: "small",
            layout: "horizontal",
            labelWrap: false,
            wrapperWrap: false,
            fullness: false,
            inset: false,
            shallow: true,
          },
          name: "formLayout",
          "x-designable-id": "ueof3k5ij2a",
          "x-index": 0,
          properties: {
            companyId: {
              type: "string",
              title: "企业ID",
              "x-decorator": "FormItem",
              "x-component": "Input",
              "x-validator": [],
              "x-component-props": {
                size: "small",
              },
              "x-decorator-props": {
                feedbackLayout: "none",
              },
              name: "companyId",
              "x-pattern": "readPretty",
              "x-designable-id": "7kbu2ihnnih",
              "x-index": 0,
            },
            name: {
              type: "string",
              title: "企业名称",
              "x-decorator": "FormItem",
              "x-component": "Input",
              "x-validator": [],
              "x-component-props": {
                maxLength: 16,
                placeholder: "企业名称",
              },
              "x-decorator-props": {},
              required: true,
              name: "name",
              "x-designable-id": "jcjh5xz35bv",
              "x-index": 1,
            },
            code: {
              type: "string",
              title: "社会信用代码",
              "x-decorator": "FormItem",
              "x-component": "Input",
              "x-validator": "number",
              "x-component-props": {
                placeholder: "学号",
                maxLength: 10,
              },
              "x-decorator-props": {},
              required: true,
              name: "code",
              "x-designable-id": "jalhqibmpm0",
              "x-index": 2,
            },
            type: {
              type: "string",
              title: "企业类型",
              "x-decorator": "FormItem",
              "x-component": "Input",
              "x-validator": [],
              "x-component-props": {
                maxLength: 16,
                placeholder: "企业名称",
              },
              "x-decorator-props": {},
              required: true,
              name: "type",
              "x-designable-id": "4vctlz0no1e",
              "x-index": 3,
            },
            contact: {
              type: "string",
              title: "联系方式",
              "x-decorator": "FormItem",
              "x-component": "Input",
              "x-validator": "phone",
              "x-component-props": {
                placeholder: "联系方式",
              },
              "x-decorator-props": {},
              name: "contact",
              required: true,
              "x-designable-id": "qvkqxtsco00",
              "x-index": 4,
            },
            address: {
              type: "string",
              title: "公司地址",
              "x-decorator": "FormItem",
              "x-component": "Input",
              "x-validator": [],
              "x-component-props": {
                maxLength: 255,
                placeholder: "地址",
              },
              "x-decorator-props": {},
              name: "address",
              "x-designable-id": "6yqyg1n7wih",
              "x-index": 5,
              required: true,
            },
            remark: {
              type: "string",
              title: "备注",
              "x-decorator": "FormItem",
              "x-component": "Input.TextArea",
              "x-validator": [],
              "x-component-props": {
                maxLength: 255,
                placeholder: "其他补充信息",
                showCount: true,
              },
              "x-decorator-props": {},
              name: "remark",
              "x-designable-id": "3biaogexiiq",
              "x-index": 6,
            },
          },
        },
      },
    },
  },
  "x-designable-id": "mhmu7kadukf",
};

const UpdateCompany = (props: { record: any; flashList: Function }) => {
  const { record, flashList } = props;

  const SchemaField = createSchemaField({
    components: {
      FormLayout,
      FormItem,
      Input,
      Card,
      Cascader,
      Radio,
      Select,
      DatePicker,
      Upload,
      Switch,
    },
    scope: {},
  });

  const updateStudentForm = React.useMemo(
    () =>
      createForm({
        initialValues: record,
      }),
    [record]
  );

  const { run: fetchUpdateAmount } = useRequest(updateCompany, {
    manual: true,
    onSuccess: () => {
      message.success("更新成功!");
      flashList?.();
    },
    onError: (result) => {
      message.error(result.message);
    },
  });

  const handleSubmit = (formValue: any) => {
    fetchUpdateAmount(formValue);
  };

  return (
    <Form form={updateStudentForm}>
      <FormLayout labelCol={6} wrapperCol={14}>
        <SchemaField schema={schema} />
        <FormDrawer.Extra>
          <FormButtonGroup align="right">
            <Submit onSubmit={handleSubmit}>更新</Submit>
          </FormButtonGroup>
        </FormDrawer.Extra>
      </FormLayout>
    </Form>
  );
};

export default observer(UpdateCompany);
