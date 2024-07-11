import React, { useRef, useEffect } from "react";
import { Card } from "antd";
import { PropTypes } from "prop-types";

const TypingCard = (props) => {
  const { title, source } = props;

  const outputEl = useRef();

  useEffect(() => {
    if (outputEl.current) {
      outputEl.current.innerHTML = source;
    }
  }, [source]);

  return (
    <Card bordered={false} className="card-item" title={title}>
      <div ref={outputEl} />
    </Card>
  );
};

TypingCard.propTypes = {
  title: PropTypes.string,
  source: PropTypes.string,
};

TypingCard.defaultProps = {
  title: "",
  source: "",
};

export default TypingCard;