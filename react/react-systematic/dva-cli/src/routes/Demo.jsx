import React from "react";
import { Button } from "antd";
import { connect } from "dva";

const Demo = function Demo({ num, dispatch }) {
  return (
    <div>
      <span>{num}</span>
      <Button type="primary">按钮</Button>
      <Button type="primary" danger>
        异步按钮
      </Button>
    </div>
  );
};

export default connect((state) => state.demo)(Demo);
