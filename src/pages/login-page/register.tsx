import React, { useRef } from "react";
import { createForm } from "@formily/core";
import { createSchemaField } from "@formily/react";
import { action } from "@formily/reactive";
import { Button, Tabs, message } from "antd";
import {
  Form,
  FormDialog,
  FormLayout,
  FormItem,
  DatePicker,
  Cascader,
  Input,
  Password,
  Radio,
  Submit,
  Upload,
} from "@formily/antd-v5";
import { useRootStore } from "../../store/RootStore";
import { UploadOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { studentRegister, companyRegister } from "../../api/Login";
import * as ICONS from "@ant-design/icons";
import "./index.scss";

export default () => {
  const { schoolStore } = useRootStore();
  let dialog: any = useRef(null);

  const SchemaField = createSchemaField({
    components: {
      FormLayout,
      FormItem,
      DatePicker,
      Cascader,
      Input,
      Password,
      Radio,
      Submit,
      Upload,
    },
    scope: {
      icon(name: string) {
        // return React.createElement(ICONS[name]);
        return <>222</>;
      },
      getMajors: async (field: { loading: boolean; dataSource: any }) => {
        field.loading = true;
        const data = await schoolStore.getCollegeMajorData();
        action(() => {
          field.dataSource = data;
          field.loading = false;
        });
      },
    },
  });

  const StudentForm = () => {
    /**
     * 创建Form
     */
    const studentRegisterForm = React.useMemo(
      () => createForm({ validateFirst: true }),
      []
    );
    /**
     * 创建Schema
     */
    const studentSchema = {
      type: "object",
      properties: {
        form_layout: {
          type: "void",
          "x-component": "FormLayout",
          "x-component-props": {
            feedbackLayout: "terse",
            size: "small",
            layout: "horizontal",
            labelWidth: "auto",
            labelCol: 6,
            wrapperCol: 16,
            wrapperWidth: "auto",
            colon: true,
            wrapperAlign: "left",
            labelWrap: false,
            bordered: true,
            labelAlign: "right",
          },
          name: "form_layout",
          "x-designable-id": "4azx24c77ea",
          "x-index": 1,
          properties: {
            username: {
              type: "string",
              title: "账号",
              "x-decorator": "FormItem",
              "x-component": "Input",
              "x-component-props": {
                maxLength: 16,
                placeholder: "账户名称",
              },
              "x-decorator-props": {
                tooltip: "用于平台登陆",
                tooltipLayout: "text",
              },
              required: true,
              "x-index": 0,
              name: "username",
            },
            password: {
              title: "密码",
              "x-decorator": "FormItem",
              "x-component": "Password",
              "x-validator": [],
              "x-component-props": {
                maxLength: 16,
                placeholder: "登陆密码",
                checkStrength: true,
              },
              "x-decorator-props": {},
              required: true,
              name: "passsword",
              "x-designable-id": "rsa81ofgzwf",
              "x-index": 1,
              "x-reactions": [
                {
                  dependencies: [".repeat_password"],
                  fulfill: {
                    state: {
                      selfErrors:
                        "{{$deps[0] && $self.value && $self.value !== $deps[0] ? '确认密码不匹配' : ''}}",
                    },
                  },
                },
              ],
            },
            repeat_password: {
              title: "确认密码",
              "x-decorator": "FormItem",
              "x-component": "Password",
              "x-validator": [{}],
              "x-component-props": {
                checkStrength: true,
                maxLength: 16,
                placeholder: "确认密码",
              },
              "x-decorator-props": {},
              name: "repeat_password",
              required: true,
              "x-designable-id": "u66mye5iuqi",
              "x-index": 2,
              "x-reactions": [
                {
                  dependencies: [".password"],
                  fulfill: {
                    state: {
                      selfErrors:
                        "{{$deps[0] && $self.value && $self.value !== $deps[0] ? '确认密码不匹配' : ''}}",
                    },
                  },
                },
              ],
            },
            name: {
              type: "string",
              title: "姓名",
              "x-decorator": "FormItem",
              "x-component": "Input",
              "x-validator": [],
              "x-component-props": {
                maxLength: 20,
                placeholder: "学生姓名",
              },
              "x-decorator-props": {},
              required: true,
              "x-designable-id": "e1f5jqc465s",
              "x-index": 3,
              name: "name",
            },
            studentId: {
              type: "string",
              title: "学号",
              "x-decorator": "FormItem",
              "x-component": "Input",
              "x-validator": "integer",
              "x-component-props": {
                maxLength: 16,
                placeholder: "学生学号",
              },
              "x-decorator-props": {},
              required: true,
              "x-designable-id": "34j386i7aze",
              "x-index": 4,
              name: "studentId",
            },
            majorId: {
              title: "专业",
              "x-decorator": "FormItem",
              "x-component": "Cascader",
              "x-validator": [],
              "x-component-props": {
                notFoundContent: "",
                placeholder: "",
              },
              "x-decorator-props": {},
              required: true,
              "x-designable-id": "14sopryfzci",
              "x-index": 5,
              "x-reactions": "{{getMajors}}",
              name: "majorId",
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
              "x-component-props": {},
              "x-decorator-props": {},
              required: true,
              "x-designable-id": "d9sko3uqabb",
              "x-index": 6,
              name: "gender",
              default: 1,
            },
            contact: {
              type: "string",
              title: "手机号",
              "x-decorator": "FormItem",
              "x-component": "Input",
              "x-validator": "phone",
              "x-component-props": {
                maxLength: 16,
                placeholder: "手机号码",
              },
              "x-decorator-props": {},
              "x-designable-id": "fdhw8sqv4k1",
              "x-index": 7,
              required: true,
              name: "contact",
            },
            address: {
              type: "string",
              title: "住址",
              "x-decorator": "FormItem",
              "x-component": "Input",
              "x-validator": [],
              "x-component-props": {
                placeholder: "联系地址",
                maxLength: 255,
              },
              "x-decorator-props": {},
              "x-designable-id": "ymv4jybzj1j",
              "x-index": 8,
              required: false,
              name: "address",
            },
            birthday: {
              type: "string",
              title: "出生日期",
              "x-decorator": "FormItem",
              "x-component": "DatePicker",
              "x-validator": "date",
              "x-component-props": {
                placeholder: "出生日期",
                showToday: false,
              },
              "x-decorator-props": {
                feedbackLayout: "terse",
              },
              "x-designable-id": "o7i2idam86y",
              "x-index": 9,
              required: false,
              name: "birthday",
            },
            avatar: {
              type: "Array<object>",
              title: "照片",
              "x-decorator": "FormItem",
              "x-component": "Upload",
              "x-component-props": {
                textContent: "上传图片",
                listType: "picture",
                style: {
                  borderRadius: "5px 5px 5px 5px",
                },
                action: "/server-api/file/upload/img",
                maxCount: 1,
              },
              "x-validator": [],
              "x-decorator-props": {},
              "x-designable-id": "avatar",
              "x-index": 10,
            },
            roleId: {
              type: "number",
              title: "角色",
              "x-decorator": "FormItem",
              "x-component": "Input",
              "x-validator": [],
              "x-component-props": {},
              "x-decorator-props": {},
              name: "roleId",
              default: 1,
              "x-pattern": "disabled",
              "x-display": "hidden",
              "x-designable-id": "goq1p16i080",
              "x-index": 11,
            },
          },
        },
      },
    };
    /**
     * 发生请求
     */
    const { runAsync: fetchStudentRegister } = useRequest(studentRegister, {
      manual: true,
      onSuccess: () => {
        message.success("注册成功!");
        if (dialog.current.close) dialog.current.close();
      },
      onError: (result) => {
        message.error(result.message);
      },
      onFinally() {
        studentRegisterForm.loading = false;
      },
    });
    /**
     * 提交Form
     */
    const handelSubmit = async (field: any) => {
      studentRegisterForm.loading = true;
      await fetchStudentRegister({
        ...field,
        avatar: field?.avatar?.[0]?.response?.data?.src,
        majorId: field?.majorId?.[1],
      });
    };
    /**
     * UI
     */
    return (
      <Form form={studentRegisterForm} onAutoSubmit={handelSubmit}>
        <SchemaField schema={studentSchema} />
        <Submit block>注册</Submit>
      </Form>
    );
  };

  const CompanyForm = () => {
    /**
     * 创建Form
     */
    const companyRegisterForm = React.useMemo(
      () => createForm({ validateFirst: true }),
      []
    );
    /**
     * 创建Schema
     */
    const companySchema = {
      type: "object",
      properties: {
        formLayout: {
          type: "void",
          "x-component": "FormLayout",
          "x-component-props": {
            feedbackLayout: "terse",
            size: "small",
            layout: "horizontal",
            labelWidth: "auto",
            labelCol: 6,
            wrapperCol: 16,
            wrapperWidth: "auto",
            colon: true,
            wrapperAlign: "left",
            labelWrap: false,
            bordered: true,
            labelAlign: "right",
          },
          name: "formLayout",
          "x-designable-id": "y1z7f6lhriv",
          properties: {
            username: {
              type: "string",
              title: "账号",
              "x-decorator": "FormItem",
              "x-component": "Input",
              "x-validator": [],
              "x-component-props": {
                placeholder: "账户名称",
                maxLength: 16,
                style: {
                  borderRadius: "5px 5px 5px 5px",
                },
              },
              "x-decorator-props": {
                tooltip: "用于平台登陆",
                colon: true,
                tooltipLayout: "text",
              },
              name: "username",
              required: true,
              "x-designable-id": "d85g8vpfjrw",
              "x-index": 0,
            },
            password: {
              title: "密码",
              "x-decorator": "FormItem",
              "x-component": "Password",
              "x-validator": [],
              "x-component-props": {
                maxLength: 16,
                placeholder: "登陆密码",
                checkStrength: true,
              },
              "x-decorator-props": {},
              required: true,
              name: "passsword",
              "x-designable-id": "rsa81ofgzwf",
              "x-index": 1,
              "x-reactions": [
                {
                  dependencies: [".repeat_password"],
                  fulfill: {
                    state: {
                      selfErrors:
                        "{{$deps[0] && $self.value && $self.value !== $deps[0] ? '确认密码不匹配' : ''}}",
                    },
                  },
                },
              ],
            },
            repeat_password: {
              title: "确认密码",
              "x-decorator": "FormItem",
              "x-component": "Password",
              "x-validator": [{}],
              "x-component-props": {
                checkStrength: true,
                maxLength: 16,
                placeholder: "确认密码",
              },
              "x-decorator-props": {},
              name: "repeat_password",
              required: true,
              "x-designable-id": "u66mye5iuqi",
              "x-index": 2,
              "x-reactions": [
                {
                  dependencies: [".password"],
                  fulfill: {
                    state: {
                      selfErrors:
                        "{{$deps[0] && $self.value && $self.value !== $deps[0] ? '确认密码不匹配' : ''}}",
                    },
                  },
                },
              ],
            },
            name: {
              type: "string",
              title: "公司名称",
              "x-decorator": "FormItem",
              "x-component": "Input",
              "x-validator": [],
              "x-component-props": {
                maxLength: 45,
                placeholder: "公司名称",
                style: {
                  borderRadius: "5px 5px 5px 5px",
                },
              },
              "x-decorator-props": {
                feedbackLayout: "terse",
              },
              name: "name",
              required: true,
              "x-designable-id": "h2wifnt42ou",
              "x-index": 3,
            },
            code: {
              type: "string",
              title: "社会信用代码",
              "x-decorator": "FormItem",
              "x-component": "Input",
              "x-validator": [],
              "x-component-props": {
                style: {
                  borderRadius: "5px 5px 5px 5px",
                },
                maxLength: 32,
                placeholder: "公司社会信用代码",
              },
              "x-decorator-props": {},
              required: true,
              name: "code",
              "x-designable-id": "qofl82dje69",
              "x-index": 4,
            },
            type: {
              type: "string",
              title: "公司方向",
              "x-decorator": "FormItem",
              "x-component": "Input",
              "x-validator": [],
              "x-component-props": {
                style: {
                  borderRadius: "5px 5px 5px 5px",
                },
                maxLength: 45,
                placeholder: "公司行业方向",
              },
              "x-decorator-props": {},
              name: "type",
              required: true,
              "x-designable-id": "t8pkrenx07j",
              "x-index": 5,
            },
            address: {
              type: "string",
              title: "地址",
              "x-decorator": "FormItem",
              "x-component": "Input",
              "x-validator": [],
              "x-component-props": {
                maxLength: 255,
                placeholder: "公司地址",
                style: {
                  borderRadius: "5px 5px 5px 5px",
                },
              },
              "x-decorator-props": {},
              required: true,
              name: "address",
              "x-designable-id": "qjoa01x7g51",
              "x-index": 6,
            },
            contact: {
              type: "string",
              title: "联系方式",
              "x-decorator": "FormItem",
              "x-component": "Input",
              "x-validator": "phone",
              "x-component-props": {
                style: {
                  borderRadius: "5px 5px 5px 5px",
                },
                maxLength: null,
                placeholder: "手机号码",
              },
              "x-decorator-props": {},
              name: "contact",
              required: true,
              "x-designable-id": "f98s1kf2r2d",
              "x-index": 7,
            },
            website: {
              type: "string",
              title: "官网",
              "x-decorator": "FormItem",
              "x-component": "Input",
              "x-validator": "url",
              "x-component-props": {
                maxLength: 255,
                placeholder: "公司网站",
                style: {
                  borderRadius: "5px 5px 5px 5px",
                },
              },
              "x-decorator-props": {},
              name: "website",
              "x-designable-id": "itfu0uwol5z",
              "x-index": 8,
            },
            pic: {
              type: "Array<object>",
              title: "公司照片",
              "x-decorator": "FormItem",
              "x-component": "Upload",
              "x-component-props": {
                textContent: "上传图片",
                listType: "picture",
                style: {
                  borderRadius: "5px 5px 5px 5px",
                },
                action: "/server-api/file/upload/img",
                maxCount: 1,
              },
              "x-validator": [],
              "x-decorator-props": {},
              "x-designable-id": "pic",
              "x-index": 9,
            },
            remark: {
              type: "string",
              title: "备注",
              "x-decorator": "FormItem",
              "x-component": "Input.TextArea",
              "x-validator": [],
              "x-component-props": {
                maxLength: 1024,
                placeholder: "公司其他信息",
                style: {
                  borderRadius: "5px 5px 5px 5px",
                },
              },
              "x-decorator-props": {},
              name: "remark",
              "x-designable-id": "f89lha03wup",
              "x-index": 10,
            },
            roleId: {
              type: "number",
              title: "角色",
              "x-decorator": "FormItem",
              "x-component": "Input",
              "x-validator": [],
              "x-component-props": {},
              "x-decorator-props": {},
              name: "roleId",
              default: 2,
              "x-pattern": "disabled",
              "x-display": "hidden",
              "x-designable-id": "goq1p16i080",
              "x-index": 11,
            },
          },
          "x-index": 0,
        },
      },
      "x-designable-id": "1wg0b77s778",
    };
    /**
     * 发生请求
     */
    const { runAsync: fetchCompanyRegister } = useRequest(companyRegister, {
      manual: true,
      onSuccess: () => {
        message.success("注册成功!");
        if (dialog.current.close) dialog.current.close();
      },
      onError: (result) => {
        message.error(result.message);
      },
      onFinally() {
        companyRegisterForm.loading = false;
      },
    });
    /**
     * 提交Form
     */
    const handelSubmit = async (field: any) => {
      companyRegisterForm.loading = true;
      await fetchCompanyRegister({
        ...field,
        pic: field?.pic?.[0]?.response?.data?.src,
        roleId: 2,
      });
    };
    return (
      <Form
        form={companyRegisterForm}
        layout="vertical"
        size="large"
        onAutoSubmit={handelSubmit}
      >
        <SchemaField schema={companySchema} />
        <Submit block>注册</Submit>
      </Form>
    );
  };

  return (
    <FormDialog.Portal>
      <a
        className="register"
        onClick={() => {
          dialog.current = FormDialog(
            { maskClosable: false, footer: null },
            () => {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Tabs
                    centered
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    items={[
                      {
                        key: "1",
                        label: `学生注册`,
                        children: <StudentForm />,
                      },
                      {
                        key: "2",
                        label: "企业注册",
                        children: <CompanyForm />,
                      },
                    ]}
                  ></Tabs>
                </div>
              );
            }
          );
          dialog.current.open();
        }}
      >
        新用户注册
      </a>
    </FormDialog.Portal>
  );
};
