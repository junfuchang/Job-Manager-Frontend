import React, { useRef } from "react";
import { createForm } from "@formily/core";
import {
  DatePicker,
  Form,
  FormDrawer,
  FormItem,
  FormLayout,
  Submit,
  Switch,
} from "@formily/antd-v5";
import { useRequest } from "ahooks";
import { insertJob } from "../../api/Job";
import { Button, Input, message } from "antd";
import { createSchemaField } from "@formily/react";
import { insertCollege } from "../../api/College";

const collegeSchema = {
  type: "object",
  properties: {
    g5ycy22wv34s: {
      type: "void",
      "x-component": "FormLayout",
      "x-component-props": {},
      "x-index": 0,
      properties: {
        formLayout: {
          type: "void",
          "x-component": "FormLayout",
          "x-component-props": {
            feedbackLayout: "terse",
            layout: "horizontal",
            labelWrap: false,
            wrapperWrap: false,
            fullness: false,
            inset: false,
            shallow: true,
          },
          name: "formLayout",
          "x-index": 0,
          properties: {
            name: {
              type: "string",
              title: "学院名称",
              "x-decorator": "FormItem",
              "x-component": "Input",
              "x-validator": [],
              "x-component-props": {
                maxLength: 45,
                placeholder: "学院名称",
              },
              "x-decorator-props": {},
              required: true,
              name: "name",
              "x-index": 0,
            },
          },
        },
      },
    },
  },
};
const SchemaField = createSchemaField({
  components: {
    FormLayout,
    FormItem,
    DatePicker,
    Input,
    Submit,
    Switch,
  },
});

const CollegeInsertForm = (props: any) => {
  const { thenSuccess } = props;
  const collegeDrawer = useRef<any>();
  const collegeInsertForm = createForm({ validateFirst: true });

  const { run: fetchInsertCollege } = useRequest(insertCollege, {
    manual: true,
    onSuccess: () => {
      message.success("添加成功!");
      collegeDrawer.current?.close();
      thenSuccess?.();
    },
    onError: (result) => {
      message.error(result.message);
    },
    onFinally() {
      collegeInsertForm.loading = false;
    },
  });

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          collegeDrawer.current = FormDrawer(
            {
              maskClosable: true,
              footer: false,
              title: "新增学院",
              width: 600,
            },
            () => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Form style={{ width: "90%" }} form={collegeInsertForm}>
                  <SchemaField schema={collegeSchema} />
                  <FormDrawer.Extra>
                    <Submit block onSubmit={fetchInsertCollege}>
                      新增学院
                    </Submit>
                  </FormDrawer.Extra>
                </Form>
              </div>
            )
          );
          collegeDrawer.current?.open();
        }}
      >
        添加岗位
      </Button>
    </>
  );
};

export default CollegeInsertForm;
