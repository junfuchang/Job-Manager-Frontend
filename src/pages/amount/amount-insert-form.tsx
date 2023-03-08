/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef } from "react";
import { createForm } from "@formily/core";
import { createSchemaField } from "@formily/react";
import { action } from "@formily/reactive";
import { Button, Tabs, message } from "antd";
import md5 from "md5";
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
import { useRequest } from "ahooks";
import { insertAmount } from "../../api/Amount";
import InsertStudentForm from "../../components/insert-student-form";
import InsertCompanyForm from "../../components/insert-company-form";

interface IAmountInsertForm {
  flashList?: Function;
}

const AmountInsertForm: React.FC<IAmountInsertForm> = (props) => {
  const { flashList } = props;
  const { schoolStore } = useRootStore();
  let dialog: any = useRef(null);

  const afterSuccess = () => {
    flashList?.();
    if (dialog.current.close) dialog.current.close();
  };

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

  const AdminForm = () => {
    const adminRegisterForm = React.useMemo(
      () => createForm({ validateFirst: true }),
      []
    );

    const adminSchema = {
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
              "x-validator": [
                {
                  min: 6, // 最小长度6
                  message: "最小长度不能小于6位",
                },
              ],
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
              name: "password",
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
              "x-index": 3,
            },
          },
        },
      },
    };

    const { run: fetchAdminRegister } = useRequest(insertAmount, {
      manual: true,
      onSuccess: () => {
        message.success("新增成功!");
        flashList?.();
        if (dialog.current.close) dialog.current.close();
      },
      onError: (result) => {
        message.error(result.message);
      },
      onFinally() {
        adminRegisterForm.loading = false;
      },
    });

    const handelSubmit = async (field: any) => {
      adminRegisterForm.loading = true;
      await fetchAdminRegister({
        ...field,
        password: md5(field?.password),
      });
    };

    return (
      <Form form={adminRegisterForm} onAutoSubmit={handelSubmit}>
        <SchemaField schema={adminSchema} />
        <Submit block>新增</Submit>
      </Form>
    );
  };

  return (
    <FormDialog.Portal>
      <Button
        type="primary"
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
                        key: "student",
                        label: `新增学生`,
                        children: (
                          <InsertStudentForm afterSuccess={afterSuccess} />
                        ),
                      },
                      {
                        key: "company",
                        label: "新增企业",
                        children: (
                          <InsertCompanyForm afterSuccess={afterSuccess} />
                        ),
                      },
                      {
                        key: "admin",
                        label: `新增管理员`,
                        children: <AdminForm />,
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
        添加
      </Button>
    </FormDialog.Portal>
  );
};

export default AmountInsertForm;
