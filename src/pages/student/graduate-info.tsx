import {
  Checkbox,
  Form,
  FormDialog,
  FormItem,
  FormLayout,
  Input,
  NumberPicker,
  Select,
  Submit,
} from "@formily/antd-v5";
import { createForm } from "@formily/core";
import { createSchemaField } from "@formily/react";
import { Button, message } from "antd";
import React, { useRef, useState } from "react";
import { updateMenu } from "../../api/Menu";
import { useRequest } from "ahooks";

const SchemaField = createSchemaField({
  components: { FormLayout, FormItem, Input },
});

const schema = {
  type: "object",
  properties: {
    "2zddirx5qxx": {
      type: "void",
      "x-component": "FormLayout",
      "x-component-props": {
        labelCol: 6,
        wrapperCol: 14,
        feedbackLayout: "terse",
        style: {
          borderRadius: "0px 0px 0px 0px",
        },
      },
      "x-designable-id": "2zddirx5qxx",
      "x-index": 0,
      properties: {
        name: {
          type: "string",
          title: "姓名",
          "x-decorator": "FormItem",
          "x-component": "Input",
          "x-validator": [],
          "x-component-props": {
            bordered: false,
          },
          "x-decorator-props": {},
          name: "name",
          "x-pattern": "readOnly",
          default: "暂无",
          "x-designable-id": "kwxh55try4f",
          "x-index": 0,
        },
        studentId: {
          type: "string",
          title: "学号",
          "x-decorator": "FormItem",
          "x-component": "Input",
          "x-validator": [],
          "x-component-props": {
            bordered: false,
          },
          "x-decorator-props": {},
          name: "studentId",
          "x-pattern": "readOnly",
          default: "暂无",
          "x-designable-id": "x2jyblqhw24",
          "x-index": 1,
        },
        degree: {
          type: "string",
          title: "学历",
          "x-decorator": "FormItem",
          "x-component": "Input",
          "x-validator": [],
          "x-component-props": {
            bordered: false,
          },
          "x-decorator-props": {},
          name: "degree",
          "x-pattern": "readOnly",
          default: "暂无",
          "x-designable-id": "vgap3movttu",
          "x-index": 2,
        },
        direction: {
          type: "string",
          title: "毕业去向",
          "x-decorator": "FormItem",
          "x-component": "Input",
          "x-validator": [],
          "x-component-props": {
            bordered: false,
          },
          "x-decorator-props": {},
          name: "direction",
          default: "暂无",
          "x-pattern": "readOnly",
          "x-designable-id": "cysuei7mlms",
          "x-index": 3,
        },
        date: {
          type: "string",
          title: "毕业时间",
          "x-decorator": "FormItem",
          "x-component": "Input",
          "x-validator": [],
          "x-component-props": {
            bordered: false,
          },
          "x-decorator-props": {},
          name: "date",
          "x-pattern": "readOnly",
          default: "暂无",
          "x-designable-id": "1m1cb28p1ug",
          "x-index": 4,
        },
        industry: {
          type: "string",
          title: "行业",
          "x-decorator": "FormItem",
          "x-component": "Input",
          "x-validator": [],
          "x-component-props": {
            bordered: false,
          },
          "x-decorator-props": {},
          name: "industry",
          "x-pattern": "readOnly",
          default: "暂无",
          "x-designable-id": "6asul00xw3u",
          "x-index": 5,
        },
        post: {
          type: "string",
          title: "岗位",
          "x-decorator": "FormItem",
          "x-component": "Input",
          "x-validator": [],
          "x-component-props": {
            bordered: false,
          },
          "x-decorator-props": {},
          name: "post",
          "x-pattern": "readOnly",
          default: "暂无",
          "x-designable-id": "khvikdu1smx",
          "x-index": 6,
        },
        salary: {
          type: "string",
          title: "薪资",
          "x-decorator": "FormItem",
          "x-component": "Input",
          "x-validator": [],
          "x-component-props": {
            placeholder: "",
            bordered: false,
          },
          "x-decorator-props": {
            style: {
              borderRadius: "0px 0px 0px 0px",
            },
          },
          name: "salary",
          "x-pattern": "readOnly",
          default: "暂无",
          "x-designable-id": "xk9qwob6fro",
          "x-index": 7,
        },
      },
    },
  },
  "x-designable-id": "x3qr464am8a",
};

const GraduateInfo = (props: { record: any }) => {
  const { record } = props;

  const graduateInfoForm = React.useMemo(
    () => createForm({ initialValues: record }),
    [record]
  );

  return (
    <Form form={graduateInfoForm}>
      <FormLayout labelCol={6} wrapperCol={14}>
        <SchemaField schema={schema} />
      </FormLayout>
    </Form>
  );
};

export default GraduateInfo;
