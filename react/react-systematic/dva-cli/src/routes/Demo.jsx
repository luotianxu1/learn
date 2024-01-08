import React from "react";
import { Button } from "antd";

const Demo = function Demo() {
  return (
    <div>
      <span>0</span>
      <Button type="primary">按钮</Button>
      <Button type="primary" danger>
        异步按钮
      </Button>
    </div>
  );
};

export default Demo;
