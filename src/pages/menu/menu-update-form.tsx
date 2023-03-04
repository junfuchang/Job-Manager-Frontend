import {
  Checkbox,
  Form,
  FormDialog,
  FormItem,
  FormLayout,
  Input,
  NumberPicker,
  Select,
  Submit,
} from "@formily/antd-v5";
import { createForm } from "@formily/core";
import { createSchemaField } from "@formily/react";
import { Button, message } from "antd";
import React, { useRef, useState } from "react";
import { updateMenu } from "../../api/Menu";
import { useRequest } from "ahooks";

const SchemaField = createSchemaField({
  components: {
    FormLayout,
    FormItem,
    Input,
    Checkbox,
    NumberPicker,
    Select,
  },
});

const schema = {
  type: "object",
  properties: {
    formLayout: {
      type: "void",
      "x-component": "FormLayout",
      "x-component-props": {
        labelCol: 6,
        wrapperCol: 14,
        feedbackLayout: "popover",
        layout: "horizontal",
        fullness: false,
      },
      name: "formLayout",
      "x-decorator": "FormItem",
      "x-decorator-props": {},
      "x-designable-id": "93lpox7w2w6",
      properties: {
        menuName: {
          type: "string",
          title: "菜单名称",
          "x-decorator": "FormItem",
          "x-component": "Input",
          "x-validator": [],
          "x-component-props": {
            maxLength: 16,
          },
          "x-decorator-props": {},
          name: "menuName",
          required: true,
          "x-designable-id": "bhetfejluyx",
          "x-index": 0,
        },
        menuOrder: {
          type: "number",
          title: "菜单排序",
          "x-decorator": "FormItem",
          "x-component": "NumberPicker",
          "x-validator": [],
          "x-component-props": {
            max: 100,
            min: 0,
          },
          "x-decorator-props": {},
          required: true,
          default: 0,
          description: "要求数值范围0～100，值越大越靠后",
          name: "menuOrder",
          "x-designable-id": "cmgbjz3mgnh",
          "x-index": 2,
        },
        roleIds: {},
        menuImgClass: {
          type: "string",
          title: "菜单图标",
          "x-decorator": "FormItem",
          "x-component": "Input",
          "x-validator": [],
          "x-component-props": {
            maxLength: 32,
          },
          "x-decorator-props": {},
          name: "menuImgClass",
          required: true,
          description:
            "请在网站\n【https://ant.design/components/icon-cn】\n选择合适图标",
          "x-designable-id": "rjcpblwf39n",
          "x-index": 3,
        },
      },
      "x-index": 0,
    },
  },
  "x-designable-id": "pwl8s7gnqci",
};

const MenuUpdateForm = (props: {
  record: any;
  dialog: any;
  flashList: Function;
}) => {
  const { record, dialog, flashList } = props;

  if (record.parentId === 0) {
    schema.properties.formLayout.properties.roleIds = {
      type: "Array<number>",
      title: "菜单权限",
      "x-decorator": "FormItem",
      "x-component": "Checkbox.Group",
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
      "x-validator": [],
      "x-decorator-props": {},
      required: true,
      name: "roleIds",
      description: "将菜单分配给哪些角色",
      "x-designable-id": "sgsbq3fmzzr",
      "x-index": 1,
    };
  }

  const menuUpdateForm = React.useMemo(
    () => createForm({ validateFirst: true, initialValues: record }),
    []
  );

  const { run: fetchUpdateMenu } = useRequest(updateMenu, {
    manual: true,
    onSuccess: () => {
      message.success("更新成功!");
      dialog.current.close();
      flashList();
    },
    onError: (result) => {
      message.error(result.message);
    },
    onFinally() {
      menuUpdateForm.loading = false;
    },
  });

  const handelSubmit = async (field: any) => {
    menuUpdateForm.loading = true;
    await fetchUpdateMenu(field);
  };

  return (
    <Form form={menuUpdateForm} onAutoSubmit={handelSubmit}>
      <FormLayout labelCol={6} wrapperCol={10}>
        <SchemaField schema={schema} />
      </FormLayout>
      <Submit block>更新</Submit>
    </Form>
  );
};

export default MenuUpdateForm;
