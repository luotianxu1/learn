import React from "react";
import { Button } from "antd";
import { connect } from "dva";

const Demo = function Demo({ num, dispatch }) {
  return (
    <div>
      <span>{num}</span>
      <Button
        type="primary"
        onClick={() => {
          dispatch({ type: "demo/increment", payload: 5 });
        }}
      >
        按钮
      </Button>
      <Button
        type="primary"
        danger
        onClick={() => {
          dispatch({ type: "demo/incrementAsync", payload: 10 });
        }}
      >
        异步按钮
      </Button>
    </div>
  );
};

export default connect((state) => state.demo)(Demo);
