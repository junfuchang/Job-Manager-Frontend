import MarkdownIt from "markdown-it";
import { useEffect } from "react";
const mdParser = new MarkdownIt();

const ResumeDisplay = ({ record }: any) => {
  const { resume } = record;
  useEffect(() => {
    const dom = document.getElementById("content-display");
    if (dom) {
      dom.innerHTML = mdParser.render(resume);
    }
  }, [record]);

  return <div id="content-display"></div>;
};

export default ResumeDisplay;
