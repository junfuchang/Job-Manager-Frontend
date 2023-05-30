import "./index.scss";

export default function (props: any) {
  return (
    <div className="empty-tip">
      <div className="empty-tip-info">
        <p>{props.children}</p>
        <div className="empty-tip-tip">{props?.tip}</div>
      </div>
    </div>
  );
}
