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
  Password,
  Upload,
} from "@formily/antd-v5";
import md5 from "md5";
import { createForm } from "@formily/core";
import { createSchemaField } from "@formily/react";
import { useRequest } from "ahooks";
import { Card, message } from "antd";
import { updatePassword } from "../../api/Amount";
import { useRootStore } from "../../store/RootStore";

export default function UpdatePassword() {
  const updatePasswordForm = createForm();
  const { loginStore } = useRootStore();

  const schema = {
    type: "object",
    properties: {
      prePassword: {
        title: "原密码",
        "x-decorator": "FormItem",
        "x-component": "Password",
        "x-validator": [],
        required: true,
        "x-component-props": {
          maxLength: 16,
          placeholder: "原密码",
        },
        "x-decorator-props": {},
        name: "prePassword",
        "x-index": 0,
      },
      password: {
        title: "新密码",
        "x-decorator": "FormItem",
        "x-component": "Password",
        "x-validator": [
          {
            min: 6, // 最小长度6
            message: "最小长度不能小于6位",
          },
        ],
        required: true,
        "x-component-props": {
          maxLength: 16,
          placeholder: "新密码",
          checkStrength: true,
        },
        "x-decorator-props": {},
        name: "pre_password",
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
        "x-validator": [
          {
            min: 6, // 最小长度6
            message: "最小长度不能小于6位",
          },
        ],
        required: true,
        "x-component-props": {
          checkStrength: true,
          maxLength: 16,
          placeholder: "确认密码",
        },
        "x-decorator-props": {},
        name: "repeat_password",
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
    },
  };

  const SchemaField = createSchemaField({
    components: {
      FormLayout,
      Password,
      FormItem,
    },
    scope: {},
  });

  const { run: fetchUpdatePassword } = useRequest(updatePassword, {
    manual: true,
    onSuccess: () => {
      message.success("密码修改成功!请重新登陆");
    },
    onError: (result) => {
      message.error(result.message);
    },
  });

  const handleSubmit = (formValue: any) => {
    fetchUpdatePassword({
      amountId: loginStore?.getUserInfo?.amountId,
      prePassword: md5(formValue?.prePassword),
      password: md5(formValue?.password),
    });
  };

  return (
    <>
      <Form form={updatePasswordForm}>
        <FormLayout labelCol={6} wrapperCol={14}>
          <SchemaField schema={schema} />
          <FormButtonGroup align="right">
            <Submit onSubmit={handleSubmit}>提交</Submit>
          </FormButtonGroup>
        </FormLayout>
      </Form>
    </>
  );
}
