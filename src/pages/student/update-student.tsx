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

const schema = {
  type: "object",
  properties: {
    g5ycy22wv4s: {
      type: "void",
      "x-component": "FormLayout",
      "x-component-props": {},
      "x-designable-id": "g5ycy22wv4s",
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
          properties: {
            baseInfo: {
              type: "void",
              "x-component": "Card",
              "x-component-props": {
                title: "学生基本信息",
                extra: "",
                bordered: false,
                style: {
                  display: "block",
                },
              },
              name: "baseInfo",
              "x-designable-id": "yippdh50ib2",
              properties: {
                amountId: {
                  type: "string",
                  title: "账户ID",
                  "x-decorator": "FormItem",
                  "x-component": "Input",
                  "x-validator": [],
                  "x-component-props": {
                    size: "small",
                  },
                  "x-decorator-props": {
                    feedbackLayout: "none",
                  },
                  name: "amountId",
                  "x-pattern": "readPretty",
                  "x-designable-id": "7kbu2ihnnih",
                  "x-index": 0,
                },
                username: {
                  type: "string",
                  title: "账户名",
                  "x-decorator": "FormItem",
                  "x-component": "Input",
                  "x-validator": [],
                  "x-component-props": {
                    size: "small",
                  },
                  "x-decorator-props": {
                    size: "default",
                    feedbackLayout: "terse",
                  },
                  default: "",
                  name: "username",
                  "x-pattern": "readPretty",
                  "x-designable-id": "ozm9uce1nj6",
                  "x-index": 1,
                },
                name: {
                  type: "string",
                  title: "姓名",
                  "x-decorator": "FormItem",
                  "x-component": "Input",
                  "x-validator": [],
                  "x-component-props": {
                    maxLength: 16,
                    placeholder: "姓名",
                  },
                  "x-decorator-props": {},
                  required: true,
                  name: "name",
                  "x-designable-id": "jcjh5xz35bv",
                  "x-index": 2,
                },
                studentId: {
                  type: "string",
                  title: "学号",
                  "x-decorator": "FormItem",
                  "x-component": "Input",
                  "x-validator": "number",
                  "x-component-props": {
                    placeholder: "学号",
                    maxLength: 10,
                  },
                  "x-decorator-props": {},
                  required: true,
                  name: "studentId",
                  "x-designable-id": "jalhqibmpm0",
                  "x-index": 3,
                },
                majorId: {
                  title: "专业",
                  "x-decorator": "FormItem",
                  "x-component": "Cascader",
                  "x-validator": [],
                  "x-component-props": {
                    notFoundContent: "",
                    placeholder: "学生专业",
                  },
                  "x-decorator-props": {},
                  name: "majorId",
                  required: true,
                  "x-designable-id": "khelpkjxvfz",
                  "x-reactions": "{{getMajors}}",
                  "x-index": 4,
                },
                gender: {
                  type: "string | number",
                  title: "性别",
                  "x-decorator": "FormItem",
                  "x-component": "Radio.Group",
                  enum: [
                    {
                      children: [],
                      label: "男",
                      value: 1,
                    },
                    {
                      children: [],
                      label: "女",
                      value: 0,
                    },
                  ],
                  "x-validator": [],
                  "x-component-props": {
                    buttonStyle: "outline",
                    optionType: "default",
                  },
                  "x-decorator-props": {},
                  name: "gender",
                  required: true,
                  "x-designable-id": "e9ctn19vcmy",
                  "x-index": 5,
                },
                contact: {
                  type: "string",
                  title: "手机号",
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
                  "x-index": 6,
                },
                birthday: {
                  type: "string",
                  title: "出生日期",
                  "x-decorator": "FormItem",
                  "x-component": "DatePicker",
                  "x-validator": [],
                  "x-component-props": {},
                  "x-decorator-props": {},
                  name: "birthday",
                  "x-designable-id": "0haom44uo8e",
                  "x-index": 7,
                },
                address: {
                  type: "string",
                  title: "住址",
                  "x-decorator": "FormItem",
                  "x-component": "Input",
                  "x-validator": [],
                  "x-component-props": {
                    maxLength: 255,
                    placeholder: "目前住址",
                  },
                  "x-decorator-props": {},
                  name: "address",
                  "x-designable-id": "6yqyg1n7wih",
                  "x-index": 8,
                },
                // avatar: {
                //   type: "Array<object>",
                //   title: "照片",
                //   "x-decorator": "FormItem",
                //   "x-component": "Upload",
                //   "x-component-props": {
                //     textContent: "上传图片",
                //     listType: "picture",
                //     beforeUpload: (file: any) => {
                //       // avatarData.current.append("file", file as RcFile);
                //       return false;
                //     },
                //     style: {
                //       borderRadius: "5px 5px 5px 5px",
                //     },
                //     // action: "/server-api/file/upload/img",
                //     maxCount: 1,
                //   },
                //   "x-validator": [],
                //   "x-decorator-props": {},
                //   "x-designable-id": "avatar",
                //   "x-index": 9,
                // },
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
                  "x-index": 10,
                },
              },
              "x-index": 0,
            },
            mifgolahx1h: {
              type: "void",
              "x-component": "Card",
              "x-component-props": {
                title: "学生毕业信息",
                bordered: false,
              },
              "x-designable-id": "mifgolahx1h",
              properties: {
                graduateFlag: {
                  type: "boolean",
                  title: "是否毕业",
                  "x-decorator": "FormItem",
                  "x-component": "Switch",
                  "x-validator": [],
                  "x-component-props": {},
                  "x-decorator-props": {},
                  name: "graduateFlag",
                  required: true,
                  "x-designable-id": "udva7r3lrf8",
                  "x-index": 0,
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
                  "x-designable-id": "qm44wfw8sml",
                  "x-index": 2,
                },
                city: {
                  title: "毕业城市",
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
                  "x-index": 3,
                },
                date: {
                  type: "string",
                  title: "毕业时间",
                  "x-decorator": "FormItem",
                  "x-component": "DatePicker",
                  "x-validator": [],
                  "x-component-props": {
                    placeholder: "毕业日期",
                  },
                  "x-decorator-props": {},
                  name: "date",
                  "x-designable-id": "0i882jianfv",
                  "x-index": 4,
                },
                industry: {
                  type: "string",
                  title: "行业",
                  "x-decorator": "FormItem",
                  "x-component": "Input",
                  "x-validator": [],
                  "x-component-props": {
                    placeholder: "公司所属行业方向",
                    maxLength: 45,
                  },
                  "x-decorator-props": {},
                  name: "industry",
                  description: "",
                  "x-designable-id": "wik1yqckdri",
                  "x-index": 5,
                },
                post: {
                  type: "string",
                  title: "岗位",
                  "x-decorator": "FormItem",
                  "x-component": "Input",
                  "x-validator": [],
                  "x-component-props": {
                    maxLength: 45,
                    placeholder: "就业职位",
                  },
                  "x-decorator-props": {},
                  name: "post",
                  description: "",
                  "x-designable-id": "9jcelocferu",
                  "x-index": 6,
                },
                salary: {
                  type: "string",
                  title: "月薪",
                  "x-decorator": "FormItem",
                  "x-component": "Input",
                  "x-validator": "number",
                  "x-component-props": {
                    maxLength: 5,
                    placeholder: "大致即可",
                  },
                  "x-decorator-props": {},
                  name: "salary",
                  description: "",
                  "x-designable-id": "e2kral4ahiq",
                  "x-index": 7,
                },
              },
              "x-index": 1,
            },
          },
          "x-index": 0,
        },
      },
      "x-index": 0,
    },
  },
  "x-designable-id": "2b7r5slmw64",
};

const UpdateStudent = (props: { record: any; flashList: Function }) => {
  const { record, flashList } = props;
  const { schoolStore, commonStore } = useRootStore();

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
    scope: {
      getMajors: async (field: { loading: boolean; dataSource: any }) => {
        field.loading = true;
        const data = await schoolStore.getCollegeMajorData();
        action(() => {
          field.dataSource = data;
          field.loading = false;
        });
      },
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

  const updateStudentForm = React.useMemo(
    () =>
      createForm({
        initialValues: {
          ...record,
          majorId: [record.collegeId, record.majorId],
          city: record?.city?.split(","),
        },
      }),
    [record]
  );

  const { run: fetchUpdateAmount } = useRequest(updateStudent, {
    manual: true,
    onSuccess: () => {
      message.success("更改成功!");
      flashList?.();
    },
    onError: (result) => {
      message.error(result.message);
    },
  });

  const handleSubmit = (formValue: any) => {
    fetchUpdateAmount({
      ...formValue,
      majorId: formValue?.majorId?.[1],
      city: formValue?.city?.join(","),
      graduateFlag: Number(formValue?.graduateFlag),
    });
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

export default observer(UpdateStudent);
