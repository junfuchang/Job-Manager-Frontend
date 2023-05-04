import React from "react";
import "./index.scss";

const Panel = (props: any) => {
  return <div className="overview-panel">{props.children}</div>;
};

export default Panel;
