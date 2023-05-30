import { useRootStore } from "../../store/RootStore";
import UpdateStudent from "../student/update-student";
import { useRef } from "react";
import { Button, Col, Row } from "antd";
import { observer } from "mobx-react-lite";

const StudentConfig = () => {
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
      <UpdateStudent
        record={{ ...loginStore.getUserInfo, ...loginStore.getRoleInfo }}
        ref={formRef}
      />
    </>
  );
};

export default observer(StudentConfig);
