import React from "react";
import { Button } from "antd";
import { connect } from "dva";

const Demo = function Demo({ num, loading, dispatch }) {
  loading = loading.effects["demo/incrementAsync"]; // 获取loading状态
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
        loading={loading}
        onClick={() => {
          dispatch({ type: "demo/incrementAsync", payload: 10 });
        }}
      >
        异步按钮
      </Button>
    </div>
  );
};

export default connect((state) => {
  return { ...state.demo, loading: state.loading };
})(Demo);
