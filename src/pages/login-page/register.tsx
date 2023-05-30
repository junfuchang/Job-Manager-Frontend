/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef } from "react";
import { Tabs } from "antd";
import { FormDialog } from "@formily/antd-v5";
import InsertCompanyForm from "../../components/insert-company-form";
import InsertStudentForm from "../../components/insert-student-form";
import "./index.scss";

export const Register = () => {
  let dialog: any = useRef(null);

  const afterSuccess = () => {
    if (dialog.current.close) dialog.current.close();
  };

  return (
    <FormDialog.Portal>
      <a
        className="register"
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
                        key: "1",
                        label: `学生注册`,
                        children: (
                          <InsertStudentForm afterSuccess={afterSuccess} />
                        ),
                      },
                      {
                        key: "2",
                        label: "企业注册",
                        children: (
                          <InsertCompanyForm afterSuccess={afterSuccess} />
                        ),
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
        新用户注册
      </a>
    </FormDialog.Portal>
  );
};
