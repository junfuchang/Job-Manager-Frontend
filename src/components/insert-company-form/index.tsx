/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef } from "react";
import { useRootStore } from "../../store/RootStore";
import { companyRegister } from "../../api/Login";
import { useRequest } from "ahooks";
import md5 from "md5";
import { message } from "antd";
import { RcFile, UploadFile } from "antd/es/upload/interface";
import { createForm } from "@formily/core";
import { createSchemaField } from "@formily/react";
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

const InsertCompanyForm = (props: any) => {
  const { afterSuccess } = props;

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
  });

  const companyRegisterForm = React.useMemo(
    () => createForm({ validateFirst: true }),
    []
  );

  const companyPic = useRef(new FormData());

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
            "x-validator": [
              {
                min: 6, // 最小长度6
                message: "最小长度不能小于6位",
              },
            ],
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
              beforeUpload: (file: UploadFile) => {
                companyPic.current.append("file", file as RcFile);
                return false;
              },
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
            default: 1,
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

  const { runAsync: fetchCompanyRegister } = useRequest(companyRegister, {
    manual: true,
    onSuccess: () => {
      message.success("注册成功!");
      afterSuccess();
    },
    onError: (result) => {
      message.error(result.message);
    },
    onFinally() {
      companyRegisterForm.loading = false;
    },
  });

  const handelSubmit = async (field: any) => {
    companyRegisterForm.loading = true;
    let res: any;
    if (companyPic.current.getAll.length > 0) {
      res = await fetch("/server-api/file/insertImg", {
        method: "POST",
        body: companyPic.current,
      }).then((res) => res.json());

      if (res.code >= 400) {
        return Promise.reject("图片上传失败");
      }
    }
    await fetchCompanyRegister({
      ...field,
      pic: res?.data?.src,
      roleId: 1,
      password: md5(field?.password),
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

export default InsertCompanyForm;
