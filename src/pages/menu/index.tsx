import { useAntdTable, useRequest } from "ahooks";
import { Button, Space, Table } from "antd";
import { selectMenuList } from "../../api/Menu";
import MenuUpdateForm from "./menu-update-form";
import { FormDialog, FormDrawer } from "@formily/antd-v5";
import { useRef } from "react";

const SonMenuList = (props: any) => {
  let dialog: any = useRef(null);
  const { parent } = props;
  const selectSonMenuList = () => {
    return selectMenuList({ menuId: parent?.menuId ?? 0 });
  };
  const {
    tableProps: sonMenuListProps,
    search: { submit },
  } = useAntdTable(selectSonMenuList, {
    defaultPageSize: 100,
    cacheKey: "SonMenuTableCache",
  });

  const columns = [
    {
      title: "菜单ID",
      key: "menuId",
      dataIndex: "menuId",
    },
    {
      title: "菜单名称",
      key: "menuName",
      dataIndex: "menuName",
    },
    {
      title: "菜单路径",
      key: "pathName",
      dataIndex: "pathName",
    },
    {
      title: "菜单图标名称",
      key: "menuImgClass",
      dataIndex: "menuImgClass",
    },
    {
      title: "菜单排序",
      key: "menuOrder",
      dataIndex: "menuOrder",
    },
    {
      title: "操作",
      key: "action",
      render: (_: any, record: any) => {
        return (
          <Button
            onClick={() => {
              dialog.current = FormDrawer(
                { footer: false, title: "修改菜单" },
                <MenuUpdateForm
                  record={record}
                  dialog={dialog}
                  flashList={submit}
                />
              );
              dialog.current.open();
            }}
            size="small"
          >
            修改
          </Button>
        );
      },
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <Table
        columns={columns}
        size="small"
        rowKey="menuId"
        {...sonMenuListProps}
        pagination={false}
        showHeader={false}
      />
    </div>
  );
};

const ConfigManager = () => {
  let dialog: any = useRef(null);

  const {
    tableProps: amountListProps,
    search: { submit },
  } = useAntdTable(selectMenuList, {
    defaultParams: [
      {
        current: 1,
        pageSize: 20,
      },
      {
        parentId: 0,
      },
    ],
    defaultPageSize: 20,
    cacheKey: "menuListCache",
  });

  const columns = [
    {
      title: "菜单ID",
      key: "menuId",
      dataIndex: "menuId",
    },
    {
      title: "菜单名称",
      key: "menuName",
      dataIndex: "menuName",
    },
    {
      title: "菜单路径",
      key: "pathName",
      dataIndex: "pathName",
    },
    {
      title: "菜单图标名称",
      key: "menuImgClass",
      dataIndex: "menuImgClass",
    },
    {
      title: "菜单排序",
      key: "menuOrder",
      dataIndex: "menuOrder",
    },
    {
      title: "操作",
      key: "action",
      render: (_: any, record: any) => {
        return (
          <Button
            onClick={() => {
              dialog.current = FormDrawer(
                { footer: false, title: "修改菜单" },
                <MenuUpdateForm
                  record={record}
                  dialog={dialog}
                  flashList={submit}
                />
              );
              dialog.current.open();
            }}
            size="small"
          >
            修改
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        rowKey="menuId"
        {...amountListProps}
        expandable={{
          expandedRowRender: (record) => <SonMenuList parent={record} />,
          rowExpandable: (record) => record?.isContainChildren !== 0,
        }}
        pagination={false}
        // scroll={{ y: "calc(100vh - 340px)" }}
      />
    </div>
  );
};

export default ConfigManager;
