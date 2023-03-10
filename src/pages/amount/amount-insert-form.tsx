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
              title: "??????",
              "x-decorator": "FormItem",
              "x-component": "Input",
              "x-component-props": {
                maxLength: 16,
                placeholder: "????????????",
              },
              "x-validator": [
                {
                  min: 6, // ????????????6
                  message: "????????????????????????6???",
                },
              ],
              "x-decorator-props": {
                tooltip: "??????????????????",
                tooltipLayout: "text",
              },
              required: true,
              "x-index": 0,
              name: "username",
            },
            password: {
              title: "??????",
              "x-decorator": "FormItem",
              "x-component": "Password",
              "x-validator": [
                {
                  min: 6, // ????????????6
                  message: "????????????????????????6???",
                },
              ],
              "x-component-props": {
                maxLength: 16,
                placeholder: "????????????",
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
                        "{{$deps[0] && $self.value && $self.value !== $deps[0] ? '?????????????????????' : ''}}",
                    },
                  },
                },
              ],
            },
            repeat_password: {
              title: "????????????",
              "x-decorator": "FormItem",
              "x-component": "Password",
              "x-validator": [{}],
              "x-component-props": {
                checkStrength: true,
                maxLength: 16,
                placeholder: "????????????",
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
                        "{{$deps[0] && $self.value && $self.value !== $deps[0] ? '?????????????????????' : ''}}",
                    },
                  },
                },
              ],
            },
            roleId: {
              type: "number",
              title: "??????",
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
        message.success("????????????!");
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
        <Submit block>??????</Submit>
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
                        label: `????????????`,
                        children: (
                          <InsertStudentForm afterSuccess={afterSuccess} />
                        ),
                      },
                      {
                        key: "company",
                        label: "????????????",
                        children: (
                          <InsertCompanyForm afterSuccess={afterSuccess} />
                        ),
                      },
                      {
                        key: "admin",
                        label: `???????????????`,
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
        ??????
      </Button>
    </FormDialog.Portal>
  );
};

export default AmountInsertForm;
