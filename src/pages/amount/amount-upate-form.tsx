import React from "react";
import md5 from "md5";
import {
  FormButtonGroup,
  FormDrawer,
  FormItem,
  FormLayout,
  Input,
  Password,
  Select,
  Submit,
} from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";
import { useRequest } from "ahooks";
import { updateAmount } from "../../api/Amount";
import { message } from "antd";

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Select,
    Password,
  },
});

const schema = {
  type: "object",
  properties: {
    amountId: {
      type: "string",
      title: "账户ID",
      "x-decorator": "FormItem",
      "x-component": "Input",
      "x-validator": [],
      "x-component-props": {},
      "x-decorator-props": {},
      "x-pattern": "readPretty",
      name: "amountId",
      description: "",
      default: "",
      required: true,
      "x-designable-id": "13kemi0jt5j",
      "x-index": 0,
    },
    username: {
      type: "string",
      title: "账户名称",
      "x-decorator": "FormItem",
      "x-component": "Input",
      "x-validator": [],
      "x-component-props": {
        maxLength: 16,
        placeholder: "账户角色",
      },
      "x-decorator-props": {},
      name: "username",
      required: true,
      "x-designable-id": "7ojx9i47y3v",
      "x-index": 1,
    },
    roleId: {
      title: "账户角色",
      "x-decorator": "FormItem",
      "x-component": "Select",
      "x-validator": [],
      "x-component-props": {
        showArrow: false,
        showSearch: false,
        notFoundContent: "账户角色",
        placeholder: "账户角色",
      },
      "x-decorator-props": {},
      enum: [
        {
          children: [],
          label: "学生",
          value: 0,
        },
        {
          children: [],
          label: "企业",
          value: 1,
        },
        {
          children: [],
          label: "管理员",
          value: 2,
        },
      ],
      description: "",
      required: true,
      name: "roleId",
      "x-designable-id": "01x8yzeevn1",
      "x-index": 2,
    },
    password: {
      title: "账户密码",
      "x-decorator": "FormItem",
      "x-component": "Password",
      "x-validator": [],
      "x-component-props": {
        maxLength: 16,
        placeholder: "更换密码",
        checkStrength: true,
      },
      "x-decorator-props": {},
      name: "passsword",
      "x-designable-id": "rsa81ofgzwf",
      "x-index": 3,
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
      "x-designable-id": "u66mye5iuqi",
      "x-index": 4,
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
  "x-designable-id": "41i3kct1eh1",
};

interface IAmountUpdateForm {
  flashList?: Function;
}

const AmountUpdateForm: React.FC<IAmountUpdateForm> = (props) => {
  const { flashList } = props;
  const { run: fetchUpdateAmount } = useRequest(updateAmount, {
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
      password: formValue?.password ? md5(formValue?.password) : undefined,
      repeat_password: formValue?.password
        ? md5(formValue?.password)
        : undefined,
    });
  };

  return (
    <>
      <FormLayout labelCol={6} wrapperCol={10}>
        <SchemaField schema={schema} />
        <FormDrawer.Extra>
          <FormButtonGroup align="right">
            <Submit onSubmit={handleSubmit}>更新</Submit>
          </FormButtonGroup>
        </FormDrawer.Extra>
      </FormLayout>
    </>
  );
};

export default AmountUpdateForm;
