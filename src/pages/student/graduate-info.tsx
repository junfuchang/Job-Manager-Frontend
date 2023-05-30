import {
  Cascader,
  Checkbox,
  DatePicker,
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
import { useRootStore } from "../../store/RootStore";
import { action } from "@formily/reactive";

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
          "x-pattern": "readPretty",
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
          "x-pattern": "readPretty",
          default: "暂无",
          "x-designable-id": "x2jyblqhw24",
          "x-index": 1,
        },
        degree: {
          title: "学历",
          "x-decorator": "FormItem",
          "x-component": "Select",
          "x-validator": [],
          "x-component-props": {
            placeholder: "取得学位",
          },
          "x-decorator-props": {},
          name: "degree",
          "x-pattern": "readPretty",
          enum: [
            {
              children: [],
              label: "无",
              value: 0,
            },
            {
              children: [],
              label: "学士",
              value: 1,
            },
            {
              children: [],
              label: "硕士",
              value: 2,
            },
            {
              children: [],
              label: "博士",
              value: 3,
            },
          ],
          "x-designable-id": "qq06sh3wn4r",
          "x-index": 1,
        },
        direction: {
          title: "毕业方向",
          "x-decorator": "FormItem",
          "x-component": "Select",
          "x-validator": [],
          "x-component-props": {
            notFoundContent: "请选择去向",
            placeholder: "毕业去向",
          },
          "x-decorator-props": {},
          "x-pattern": "readPretty",
          name: "direction",
          enum: [
            {
              children: [],
              label: "升学",
              value: 0,
            },
            {
              children: [],
              label: "就业",
              value: 1,
            },
            {
              children: [],
              label: "待业",
              value: 2,
            },
          ],
          required: true,
          "x-designable-id": "qm44wfw8sml",
          "x-index": 3,
        },
        city: {
          title: "毕业城市",
          "x-pattern": "readPretty",
          "x-decorator": "FormItem",
          "x-component": "Cascader",
          "x-validator": [],
          "x-component-props": {
            placeholder: "毕业城市",
          },
          "x-decorator-props": {},
          name: "position",
          "x-reactions": "{{fetchAddress}}",
          "x-designable-id": "09rbq546pgn",
          "x-index": 4,
        },
        date: {
          type: "string",
          title: "毕业时间",
          "x-decorator": "FormItem",
          "x-component": "DatePicker",
          "x-pattern": "readPretty",
          "x-validator": [],
          "x-component-props": {
            placeholder: "毕业日期",
          },
          "x-decorator-props": {},
          name: "date",
          "x-designable-id": "0i882jianfv",
          "x-index": 5,
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
          "x-pattern": "readPretty",
          default: "暂无",
          "x-designable-id": "6asul00xw3u",
          "x-index": 6,
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
          "x-pattern": "readPretty",
          default: "暂无",
          "x-designable-id": "khvikdu1smx",
          "x-index": 7,
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
          "x-pattern": "readPretty",
          default: "暂无",
          "x-designable-id": "xk9qwob6fro",
          "x-index": 8,
        },
      },
    },
  },
  "x-designable-id": "x3qr464am8a",
};

const GraduateInfo = (props: { record: any }) => {
  const { record } = props;
  const { commonStore } = useRootStore();

  const graduateInfoForm = React.useMemo(
    () =>
      createForm({
        initialValues: {
          ...record,
          city: record?.city?.split(","),
          date: record?.date?.slice(0, 10),
        },
      }),
    [record]
  );

  const SchemaField = createSchemaField({
    components: { FormLayout, FormItem, Input, Cascader, Select, DatePicker },
    scope: {
      fetchAddress: async (field: { loading: boolean; dataSource: any }) => {
        field.loading = true;
        const data = await commonStore.getCityData();
        action(() => {
          field.dataSource = data;
          field.loading = false;
        });
      },
    },
  });

  return (
    <Form form={graduateInfoForm}>
      <FormLayout labelCol={6} wrapperCol={14}>
        <SchemaField schema={schema} />
      </FormLayout>
    </Form>
  );
};

export default GraduateInfo;
