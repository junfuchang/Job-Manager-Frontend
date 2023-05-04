import { Card } from "antd";

export default function NumBox(props: any) {
  const { title } = props;
  return (
    <Card>
      {title ? <p>{title}</p> : null}
      {props.children}
    </Card>
  );
}
