import { useAntdTable } from "ahooks";
import { Table } from "antd";
import React from "react";
import { Form } from "react-router-dom";

const AmountManager = () => {
  // const [form] = Form.useForm();

  // const { tableProps, search, params } = useAntdTable(getAmountList, {
  //   defaultPageSize: 20,
  //   form,
  //   cacheKey: "useAntdTableCache",
  // });

  // const { type, changeType, submit, reset } = search;

  // const columns = [
  //   {
  //     title: "name",
  //     dataIndex: ["name", "last"],
  //   },
  //   {
  //     title: "email",
  //     dataIndex: "email",
  //   },
  //   {
  //     title: "phone",
  //     dataIndex: "phone",
  //     sorter: true,
  //     sortOrder: sorter.field === "phone" && sorter.order,
  //   },
  //   {
  //     title: "gender",
  //     dataIndex: "gender",
  //     filters: [
  //       { text: "male", value: "male" },
  //       { text: "female", value: "female" },
  //     ],
  //     filteredValue: filters.gender,
  //   },
  // ];

  // return (
  //   <div>
  //     <Table columns={columns} rowKey="amountId" {...tableProps} />

  //     {/* <div style={{ background: "#f5f5f5", padding: 8 }}>
  //       <p>Current Table: {JSON.stringify(params[0])}</p>
  //       <p>Current Form: {JSON.stringify(params[1])}</p>
  //     </div> */}
  //   </div>
  // );

  return <>Amount</>;
};

export default AmountManager;
