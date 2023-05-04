import React from "react";
import "./index.scss";

const Card = (props: any) => {
  const { cardText } = props;
  return (
    <div className="card-overview">
      {cardText ? (
        <div className="cardText" style={{ color: "white" }}>
          {cardText}
        </div>
      ) : null}
      <div className="cardContent">{props.children}</div>
    </div>
  );
};

export default Card;
