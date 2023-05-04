import "./index.scss";

export default function NumBox(props: any) {
  const { title, num } = props;
  return (
    <div className="numbox">
      <p className="numboxTitle">{title}</p>
      <p className="numboxNum">{num}</p>
      {props.children}
    </div>
  );
}
