import React, { useRef } from "react";
import { createForm } from "@formily/core";
import {
  Form,
  FormDrawer,
  FormItem,
  FormLayout,
  Submit,
} from "@formily/antd-v5";
import { useRequest } from "ahooks";
import { Button, Input, message } from "antd";
import { createSchemaField } from "@formily/react";
import { insertMajor, updateMajor } from "../../api/Major";

const majorUpdateSchema = {
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
              title: "专业名称",
              "x-decorator": "FormItem",
              "x-component": "Input",
              "x-validator": [],
              "x-component-props": {
                maxLength: 45,
                placeholder: "专业名称",
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
    Input,
    Submit,
  },
});

const MajorUpdateForm = (props: any) => {
  const { record, thenSuccess } = props;
  const majorUpdateDrawer = useRef<any>();
  const majorInsertForm = createForm({
    validateFirst: true,
    initialValues: record,
  });

  const { run: fetchUpdateMajor } = useRequest(updateMajor, {
    manual: true,
    onSuccess: () => {
      message.success("修改成功!");
      majorUpdateDrawer.current?.close();
      thenSuccess?.();
    },
    onError: (result) => {
      message.error(result.message);
    },
    onFinally() {
      majorInsertForm.loading = false;
    },
  });

  return (
    <>
      <Button
        size="small"
        onClick={() => {
          majorUpdateDrawer.current = FormDrawer(
            {
              maskClosable: true,
              footer: false,
              title: "编辑专业",
              width: 600,
            },
            () => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Form style={{ width: "90%" }} form={majorInsertForm}>
                  <SchemaField schema={majorUpdateSchema} />
                  <FormDrawer.Extra>
                    <Submit
                      onSubmit={() =>
                        fetchUpdateMajor({
                          majorId: record?.majorId,
                          name: majorInsertForm?.values?.name,
                        })
                      }
                    >
                      编辑专业
                    </Submit>
                  </FormDrawer.Extra>
                </Form>
              </div>
            )
          );
          majorUpdateDrawer.current?.open();
        }}
      >
        编辑
      </Button>
    </>
  );
};

export default MajorUpdateForm;
