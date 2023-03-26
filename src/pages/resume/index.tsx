import { Button, Col, Row, Space, message } from "antd";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";

import { observer } from "mobx-react-lite";
import "react-markdown-editor-lite/lib/index.css";
import "./index.scss";
import { useRootStore } from "../../store/RootStore";
import { useRequest } from "ahooks";
import { updateStudent } from "../../api/Student";
import { useEffect, useState } from "react";
import save2PDF from "../../utils/save2PDF";

const mdParser = new MarkdownIt();

const Resume = () => {
  const { loginStore } = useRootStore();
  const [text, setText] = useState<string>();

  useEffect(() => {
    if (loginStore.getRoleInfo?.resume != null) {
      setText(loginStore.getRoleInfo?.resume);
    } else {
      setText(`#  姓名
      **基本信息介绍**

      ## 专业技能
      1. ...
      2. ...

      ## 项目经历
      * ...
      * ...

      ## 个人优势
      - ...
      - ...`);
    }
  }, []);

  const { run: fetchUpdateResume } = useRequest(updateStudent, {
    manual: true,
    onSuccess: () => {
      try {
        loginStore.setRoleInfo({ resume: text });
        message.success("保存成功!");
      } catch {
        message.success("远端保存成功!");
      }
    },
    onError: (result) => {
      message.error(result.message);
    },
  });

  const saveResume = () => {
    const resume = document.getElementById("editor_md")?.textContent;
    fetchUpdateResume({ amountId: loginStore.getUserInfo?.amountId, resume });
  };

  const saveResumePDF = () => {
    const element = document.getElementById("editor_html");
    const title = (loginStore.getUserInfo?.username ?? "我的") + "简历";
    if (element) {
      save2PDF(element, title);
    }
  };

  return (
    <div className="content">
      <Row className="editor-header" justify={"end"}>
        <Col>
          <Space>
            <Button onClick={saveResume}>保存</Button>
            <Button onClick={saveResumePDF}>生成PDF</Button>
          </Space>
        </Col>
      </Row>
      <MdEditor
        id="editor"
        className="editor"
        value={text}
        shortcuts
        renderHTML={(text) => mdParser.render(text)}
        onChange={({ text }) => {
          setText(text);
        }}
      />
    </div>
  );
};

export default observer(Resume);
