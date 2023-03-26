import React, { useRef } from "react";
import { createForm } from "@formily/core";
import {
  DatePicker,
  Form,
  FormDialog,
  FormDrawer,
  FormItem,
  FormLayout,
  Radio,
  Submit,
  Switch,
} from "@formily/antd-v5";
import { useRequest } from "ahooks";
import { insertJob } from "../../api/Job";
import { Button, Input, message } from "antd";
import { createSchemaField } from "@formily/react";

const jobSchema = {
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
            labelCol: 5,
            wrapperCol: 16,
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
            title: {
              type: "string",
              title: "岗位",
              "x-decorator": "FormItem",
              "x-component": "Input",
              "x-validator": [],
              "x-component-props": {
                maxLength: 16,
                placeholder: "岗位标题",
              },
              "x-decorator-props": {},
              required: true,
              name: "title",
              "x-designable-id": "jcjh5xz35bv",
              "x-index": 0,
            },
            openFlag: {
              type: "boolean",
              title: "开启",
              "x-decorator": "FormItem",
              "x-component": "Switch",
              "x-validator": [],
              "x-component-props": {},
              "x-decorator-props": {},
              name: "openFlag",
              required: true,
              "x-designable-id": "udva7r3lrf8",
              "x-index": 1,
              default: false,
            },
            intro: {
              type: "string",
              title: "介绍",
              "x-decorator": "FormItem",
              "x-component": "Input.TextArea",
              "x-validator": [],
              "x-component-props": {
                maxLength: 1000,
                placeholder: "岗位介绍",
                showCount: false,
              },
              "x-decorator-props": {},
              name: "intro",
              "x-designable-id": "3biaogexiiq",
              "x-index": 2,
              required: true,
            },
            claim: {
              type: "string",
              title: "要求",
              "x-decorator": "FormItem",
              "x-component": "Input.TextArea",
              "x-validator": [],
              "x-component-props": {
                maxLength: 1000,
                placeholder: "岗位要求",
                showCount: false,
              },
              "x-decorator-props": {},
              name: "claim",
              "x-designable-id": "fuvlwt3dikc",
              "x-index": 3,
              required: true,
            },
            salary: {
              type: "string",
              title: "薪资",
              "x-decorator": "FormItem",
              "x-component": "Input",
              "x-validator": [],
              "x-component-props": {
                maxLength: 24,
                placeholder: "薪资范围",
              },
              "x-decorator-props": {},
              required: true,
              name: "salary",
              "x-designable-id": "mhe226e4zn4",
              "x-index": 4,
            },
            deadline: {
              type: "string",
              title: "截止时间",
              "x-decorator": "FormItem",
              "x-component": "DatePicker",
              "x-validator": [],
              "x-component-props": {
                picker: "date",
                placeholder: "截止招聘时间",
              },
              "x-decorator-props": {},
              name: "deadline",
              required: false,
              "x-designable-id": "0i882jianfv",
              "x-index": 5,
            },
            type: {
              type: "string",
              title: "岗位类型",
              "x-decorator": "FormItem",
              "x-component": "Input",
              "x-validator": [],
              "x-component-props": {
                maxLength: 16,
                placeholder: "岗位类型",
              },
              "x-decorator-props": {},
              required: false,
              name: "type",
              "x-designable-id": "9b7cwm6g5s7",
              "x-index": 6,
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
              "x-index": 7,
            },
            address: {
              type: "string",
              title: "地址",
              "x-decorator": "FormItem",
              "x-component": "Input",
              "x-validator": [],
              "x-component-props": {
                maxLength: 255,
                placeholder: "岗位地址",
              },
              "x-decorator-props": {},
              name: "address",
              "x-designable-id": "6yqyg1n7wih",
              "x-index": 8,
              required: true,
            },
          },
        },
      },
    },
  },
  "x-designable-id": "6mdrjlmrbzr",
};
const SchemaField = createSchemaField({
  components: {
    FormLayout,
    FormItem,
    DatePicker,
    Input,
    Submit,
    Switch,
  },
});

const JobInsertForm = (props: any) => {
  const { companyId, thenSuccess } = props;
  const jobDrawer = useRef<any>();

  const jobInsertForm = createForm({ validateFirst: true });

  const { run: fetchInsertJob } = useRequest(insertJob, {
    manual: true,
    onSuccess: () => {
      message.success("添加成功!");
      jobDrawer.current?.close();
      thenSuccess?.();
    },
    onError: (result) => {
      message.error(result.message);
    },
    onFinally() {
      jobInsertForm.loading = false;
    },
  });

  /**
   * 提交Form
   */
  const handelSubmit = async (field: any) => {
    jobInsertForm.loading = true;
    await fetchInsertJob({
      ...field,
      companyId,
      openFlag: Number(field?.openFlag),
    });
  };

  return (
    <Button
      type="primary"
      onClick={() => {
        jobDrawer.current = FormDrawer(
          { maskClosable: true, footer: false, title: "添加岗位", width: 600 },
          () => (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Form
                style={{ width: "90%" }}
                form={jobInsertForm}
                onAutoSubmit={handelSubmit}
              >
                <SchemaField schema={jobSchema} />
                <Submit block>添加</Submit>
              </Form>
            </div>
          )
        );
        jobDrawer.current?.open();
      }}
    >
      添加岗位
    </Button>
  );
};

export default JobInsertForm;
