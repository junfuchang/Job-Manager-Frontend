import { useRootStore } from "../../store/RootStore";
import { useRef } from "react";
import { Button, Col, Row } from "antd";
import UpdateCompany from "../company/update-company";
import { observer } from "mobx-react-lite";

const CompanyConfig = () => {
  const { loginStore } = useRootStore();
  const formRef = useRef<any>();

  return (
    <>
      <Row justify={"end"}>
        <Col>
          <Button
            type="primary"
            onClick={() => {
              if (formRef?.current) {
                const values = formRef.current?.submit();
                loginStore.setRoleInfo(values);
              }
            }}
          >
            保存
          </Button>
        </Col>
      </Row>
      <UpdateCompany
        record={{ ...loginStore.getUserInfo, ...loginStore.getRoleInfo }}
        ref={formRef}
      />
    </>
  );
};

export default observer(CompanyConfig);
