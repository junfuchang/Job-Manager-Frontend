/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef } from "react";
import { createForm } from "@formily/core";
import { createSchemaField } from "@formily/react";
import { action } from "@formily/reactive";
import { Tabs, message } from "antd";
import md5 from "md5";
import {
  Form,
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
import { useRequest } from "ahooks";
import { studentRegister } from "../../api/Login";
import { RcFile, UploadFile } from "antd/es/upload/interface";

const InsertStudentForm = (props: any) => {
  const { afterSuccess } = props;
  const { schoolStore } = useRootStore();

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

  /**
   * 创建Form
   */
  const studentRegisterForm = React.useMemo(
    () => createForm({ validateFirst: true }),
    []
  );

  const avatarData = useRef(new FormData());
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
            "x-validator": [
              {
                min: 6, // 最小长度6
                message: "最小长度不能小于6位",
              },
            ],
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
            "x-validator": [
              {
                min: 6, // 最小长度6
                message: "最小长度不能小于6位",
              },
            ],
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
              beforeUpload: (file: UploadFile) => {
                avatarData.current.append("file", file as RcFile);
                return false;
              },
              style: {
                borderRadius: "5px 5px 5px 5px",
              },
              // action: "/server-api/file/upload/img",
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
            default: 0,
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
  const { run: fetchStudentRegister } = useRequest(studentRegister, {
    manual: true,
    onSuccess: () => {
      message.success("注册成功!");
      afterSuccess();
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
    let res: any;
    if (avatarData.current.getAll.length > 0) {
      res = await fetch("/server-api/file/insertImg", {
        method: "POST",
        body: avatarData.current,
      }).then((res) => res.json());

      if (res.code >= 400) {
        return Promise.reject("图片上传失败");
      }
    }
    await fetchStudentRegister({
      ...field,
      avatar: res?.data?.src,
      majorId: field?.majorId?.[1],
      password: md5(field?.password),
      roleId: 0,
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

export default InsertStudentForm;
